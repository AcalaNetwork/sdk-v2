import { TokenId } from "@acala-network/sdk-v2-types";
import {
  RewardConfig,
  PoolId,
  DeductionPeriodConfig,
  DeductionConfig,
  PoolInfo,
  PoolReward,
  BasePool,
} from "../types/index.js";
import { ApiPromise } from "@polkadot/api";
import { U128, U32, Vec } from "@polkadot/types-codec";
import { ModuleSupportIncentivesPoolId } from "@polkadot/types/lookup";
import { ITuple } from "@polkadot/types-codec/types";
import { GenericCall } from "@polkadot/types";
import { Option } from "@polkadot/types-codec/cjs/bundle";
import { getPoolFromRawPoolId } from "./get-pool-list.js";
import { UnsubscribePromise, VoidFn } from "@polkadot/api-base/types";
import { throttle } from "lodash";

/**
 * Get the reward configs of the pool
 * @param api - The api instance
 * @param poolId - The pool id
 * @returns The reward configs
 */
export async function getPoolRewardConfigs(
  api: ApiPromise,
  poolId: PoolId,
): Promise<RewardConfig[]> {
  const rewards =
    await api.query.incentives.incentiveRewardAmounts.entries<U128>(poolId);

  return rewards.map(([key, value]) => {
    const rewardToken = key.args[1];
    const rewardAmount = value;

    return {
      token: rewardToken.toHex() as TokenId,
      amount: rewardAmount.toBigInt(),
      period: (api.consts.incentives.accumulatePeriod as U32).toNumber(),
    };
  });
}

/**
 * Get the deduction end block config of the pool
 * @param api - The api instance
 * @returns The deduction end block config
 */
export async function getPoolDeductionPeriodConfig(
  api: ApiPromise,
): Promise<DeductionPeriodConfig[]> {
  const result: Record<PoolId, bigint> = {};

  /**
   * Get the agenda entries, and find updateClaimRewardDeductionRates calls
   * If the deduction rate is updated to 0, record the block as the end block of the deduction
   */
  const agendas = await api.query.scheduler.agenda.entries();

  for (const [key, proposals] of agendas) {
    const block = key.args[0].toBigInt();

    // walk through all the proposals
    for (const proposal of proposals) {
      if (proposal.isEmpty || proposal.isNone) continue;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let call: GenericCall<any> | null = null;
      const data = proposal.unwrap();

      if (data.call.isInline) {
        call = api.createType("Call", data.call.asInline);
      }

      if (data.call.isLookup) {
        const params = [data.call.asLookup.hash_, data.call.asLookup.len];

        const preimage = (await api.query.preimage.preimageFor(
          params,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        )) as unknown as Option<any>;

        call = api.createType("Call", preimage.unwrap().toHex());
      }

      if (!call) continue;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const processCallsAndAnalyze = (call: GenericCall<any>) => {
        // handle the batch call
        if (call.method === "batch" && call.section === "utility") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (call.args as [GenericCall<any>[]])[0].forEach((item) => {
            processCallsAndAnalyze(item);
          });
        }

        // handle the updateClaimRewardDeductionRates call
        if (
          call.method === "updateClaimRewardDeductionRates" &&
          call.section === "incentives"
        ) {
          const args = call.args as Vec<
            Vec<ITuple<[ModuleSupportIncentivesPoolId, U128]>>
          >;

          args.forEach((item) => {
            item.forEach(([poolId, rate]) => {
              if (rate.isZero()) {
                result[poolId.toHex() as PoolId] = block;
              }
            });
          });
        }
      };

      processCallsAndAnalyze(call);
    }
  }

  return Object.entries(result).map(([poolId, endBlock]) => ({
    poolId: poolId as PoolId,
    endBlock,
  }));
}

/**
 * Get the deduction configs of the pool
 * @param api - The api instance
 * @param poolId - The pool id
 * @returns The deduction configs
 */
export async function getPoolDeductionConfigs(
  api: ApiPromise,
  poolId: PoolId,
): Promise<DeductionConfig[]> {
  const [rate, specifiedDeductionToken, rewardTokens] = await Promise.all([
    api.query.incentives.claimRewardDeductionRates(poolId),
    api.query.incentives.claimRewardDeductionCurrency(poolId),
    api.query.incentives.incentiveRewardAmounts.entries(poolId),
  ]);

  // when there is no reward token, return empty array
  if (rewardTokens.length === 0) {
    return [];
  }

  // when the rate is zero, return empty array
  if (rate.isZero()) {
    return [];
  }

  // when the specified deduction token is null, and the rate is not zero,
  // means the deduction is for all the reward tokens
  const globalDeduction = specifiedDeductionToken.isNone && !rate.isZero();

  if (globalDeduction) {
    return rewardTokens.map(([key]) => ({
      token: key.args[1].toHex() as TokenId,
      rate: rate.toBigInt(),
    }));
  }

  // when the specified deduction token is not null, and the rate is not zero,
  // means the deduction is for the specified token
  return [
    {
      token: specifiedDeductionToken.unwrap().toHex() as TokenId,
      rate: rate.toBigInt(),
    },
  ];
}

/**
 * Get the total staked of the pool
 * @param api - The api instance
 * @param poolId - The pool id
 * @returns The total staked
 */
export function getPoolRewardsAndStakedInfo(
  api: ApiPromise,
  poolId: PoolId,
): Promise<{
  totalShares: bigint;
  rewards: PoolReward[];
}> {
  return api.query.rewards.poolInfos(poolId).then((poolInfo) => ({
    totalShares: poolInfo.totalShares.toBigInt(),
    rewards: Array.from(poolInfo.rewards.entries()).map(([token, reward]) => ({
      token: token.toHex() as TokenId,
      totalAccumulated: reward[0].toBigInt(),
      totalWithdrawn: reward[1].toBigInt(),
      availableAmount: reward[0].toBigInt() - reward[1].toBigInt(),
    })),
  }));
}

export function getBasePoolInfo(api: ApiPromise, poolId: PoolId): BasePool {
  const rawPoolId = api.createType<ModuleSupportIncentivesPoolId>(
    "ModuleSupportIncentivesPoolId",
    poolId,
  );

  return getPoolFromRawPoolId(rawPoolId);
}

/**
 * Get the pool info
 * @param api - The api instance
 * @param poolId - The pool id
 * @returns The pool info
 */
export async function getPoolInfo(
  api: ApiPromise,
  poolId: PoolId,
): Promise<PoolInfo> {
  const [
    rewardConfigs,
    deductionConfigs,
    { totalShares, rewards },
    globalDeductionPeriodConfig,
  ] = await Promise.all([
    getPoolRewardConfigs(api, poolId),
    getPoolDeductionConfigs(api, poolId),
    getPoolRewardsAndStakedInfo(api, poolId),
    getPoolDeductionPeriodConfig(api),
  ]);

  const deductionPeriodConfig = globalDeductionPeriodConfig.find(
    (item) => item.poolId === poolId,
  );

  return {
    ...getBasePoolInfo(api, poolId),
    status: rewardConfigs.length > 0 ? "ENABLED" : "DISABLED",
    totalStaked: totalShares,
    rewards,
    rewardConfigs,
    deductionConfigs,
    deductionPeriodConfig: deductionPeriodConfig || null,
  };
}

export async function watchPoolInfo(
  api: ApiPromise,
  poolId: PoolId,
  callback: (poolInfo: PoolInfo) => void,
): UnsubscribePromise {
  // watch the pool info, that will trigger every `api.consts.incentives.accumulatePeriod`(about 5 block)
  const unsubList: VoidFn[] = [];

  // the trigger function, throttle the update of the pool info
  const trigger = throttle(() => {
    getPoolInfo(api, poolId).then(callback);
  }, 200);

  // fetch the reward configs for watching the reward amount
  const rewardConfigs = await getPoolRewardConfigs(api, poolId);

  // when the reward amount has been updated, update the pool info
  const subRewardsChange = rewardConfigs.map(async (reward) => {
    return await api.query.incentives.incentiveRewardAmounts(
      poolId,
      reward.token,
      () => trigger(),
    );
  });

  unsubList.push(
    ...(await Promise.all([
      // when the deduction rate is updated, update the pool info
      await api.query.incentives.claimRewardDeductionRates(poolId, () => {
        trigger();
      }),
      // when the pool info storage has been updated, update the pool info
      await api.query.rewards.poolInfos(poolId, () => {
        trigger();
      }),
      ...subRewardsChange,
    ])),
  );

  return () => {
    unsubList.forEach((unsub) => unsub());
  };
}
