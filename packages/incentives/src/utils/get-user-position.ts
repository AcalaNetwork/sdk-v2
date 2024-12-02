import { ApiPromise } from "@polkadot/api";
import { SubstrateAddress, TokenId, UnifyAddress } from "@acala-network/sdk-v2-types";
import { DeductionConfig, PoolId, UserPosition, UserReward } from "../types/index.js";
import { getAccount } from "@acala-network/wallet-v2";
import { getPoolDeductionConfigs, getPoolRewardsAndStakedInfo, watchPoolInfo } from "./get-pool-info.js";
import { throttle } from "lodash";
import { UnsubscribePromise, VoidFn } from "@polkadot/api-base/types";

/**
 * Calculate the reward of the user
 * @param poolTotalReward - the total reward of the pool
 * @param poolWithdrawnAmount - the total withdrawn reward of the pool
 * @param userShareAmount - the share of the user
 * @param poolTotalShares - the total share of the pool
 * @param userWithdrawnAmount - the withdrawn reward of the user
 * @returns the reward of the user
 */
function calculateReward(
  poolTotalReward: bigint,
  poolWithdrawnAmount: bigint,
  userShareAmount: bigint,
  poolTotalShares: bigint,
  userWithdrawnAmount: bigint,
) {
  const userRewardAmount = (poolTotalReward * userShareAmount) / poolTotalShares - userWithdrawnAmount;
  const remainingRewards = poolTotalReward - poolWithdrawnAmount;

  return userRewardAmount > remainingRewards ? remainingRewards : userRewardAmount;
}

async function getUserShareAndRewards(api: ApiPromise, poolId: PoolId, address: SubstrateAddress) {
  const poolState = await getPoolRewardsAndStakedInfo(api, poolId);
  const poolTotalShares = poolState.totalShares;
  const poolRewardList = poolState.rewards;

  const [userShareAmount, userWithdrawnRewards] = await api.query.rewards.sharesAndWithdrawnRewards(poolId, address);

  const userRewards: UserReward[] = poolRewardList.map((poolReward) => {
    const withdrawnAmount =
      Array.from(userWithdrawnRewards.entries())
        .find(([token]) => token.toHex() === poolReward.token)?.[1]
        .toBigInt() ?? 0n;

    const availableAmount = calculateReward(
      poolReward.totalAccumulated,
      poolReward.totalWithdrawn,
      userShareAmount.toBigInt(),
      poolTotalShares,
      withdrawnAmount,
    );

    return {
      token: poolReward.token,
      availableAmount,
      deductionAmount: 0n,
      claimableAmount: availableAmount,
    };
  });

  return {
    share: userShareAmount.toBigInt(),
    rewards: userRewards,
  };
}

/**
 * Get the rewards after deduction
 * @param deductionConfigs - the deduction configs of the pool
 * @param rewards - the rewards of the user
 * @returns the rewards after deduction
 */
function getRewardsAfterDeduction(deductionConfigs: DeductionConfig[], rewards: UserReward[]) {
  return rewards.map((reward) => {
    const deductionConfig = deductionConfigs.find((config) => config.token === reward.token);

    if (!deductionConfig) {
      return reward;
    }

    const deductionAmount = (reward.availableAmount * deductionConfig.rate) / 10n ** 18n;
    const claimableAmount = reward.availableAmount - deductionAmount;

    return {
      ...reward,
      deductionAmount,
      claimableAmount,
    };
  });
}

/**
 * Merge the rewards of the user
 * @param rewards - the rewards of the user
 * @param pendingRewards - the pending rewards of the user
 * @returns the merged rewards
 */
function mergeRewards(rewards: UserReward[], pendingRewards: UserReward[]): UserReward[] {
  const rewardTokens = new Set(rewards.map((reward) => reward.token));
  pendingRewards.forEach((item) => {
    rewardTokens.add(item.token);
  });

  return Array.from(rewardTokens).map((token) => {
    const reward = rewards.find((r) => r.token === token);
    const pendingReward = pendingRewards.find((r) => r.token === token);

    return {
      token,
      availableAmount: (reward?.availableAmount ?? 0n) + (pendingReward?.availableAmount ?? 0n),
      deductionAmount: (reward?.deductionAmount ?? 0n) + (pendingReward?.deductionAmount ?? 0n),
      claimableAmount: (reward?.claimableAmount ?? 0n) + (pendingReward?.claimableAmount ?? 0n),
    };
  });
}

/**
 * Get the pending rewards of the user
 * @param api - the api instance
 * @param poolId - the pool id
 * @param address - the user address
 */
async function getPendingRewards(api: ApiPromise, poolId: PoolId, address: SubstrateAddress): Promise<UserReward[]> {
  const data = await api.query.incentives.pendingMultiRewards(poolId, address);

  return Array.from(data.entries()).map(([token, amount]) => ({
    token: token.toHex() as TokenId,
    availableAmount: amount.toBigInt(),
    deductionAmount: 0n,
    claimableAmount: amount.toBigInt(),
  }));
}

export async function getUserPosition(api: ApiPromise, poolId: PoolId, address: UnifyAddress): Promise<UserPosition> {
  const account = await getAccount(api, address);
  const { share, rewards } = await getUserShareAndRewards(api, poolId, account.address);
  const pendingRewards = await getPendingRewards(api, poolId, account.address);
  const mergedRewards = mergeRewards(rewards, pendingRewards);
  const deductionConfigs = await getPoolDeductionConfigs(api, poolId);
  const rewardsAfterDeduction = getRewardsAfterDeduction(deductionConfigs, mergedRewards);

  return {
    poolId,
    address,
    share,
    rewards: rewardsAfterDeduction,
  };
}

export async function watchUserPosition(
  api: ApiPromise,
  poolId: PoolId,
  address: UnifyAddress,
  callback: (userPosition: UserPosition) => void,
): UnsubscribePromise {
  const trigger = throttle(() => {
    getUserPosition(api, poolId, address).then(callback);
  }, 200);
  const unsubList: VoidFn[] = [];

  // when the pool is updated, the user position is also updated
  unsubList.push(await watchPoolInfo(api, poolId, trigger));

  // when the user share is updated or the user withdraws rewards, the user position is also updated
  unsubList.push(
    await api.query.rewards.sharesAndWithdrawnRewards(poolId, address, () => {
      trigger();
    }),
  );

  return () => {
    unsubList.forEach((unsub) => unsub());
  };
}
