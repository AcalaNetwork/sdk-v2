import { encodeFunctionData } from "viem";
import { INCENTIVE_CONTRACT_ADDRESS } from "../constants/contract.js";
import invariant from "tiny-invariant";
import { IncentiveClaimRewardsParams } from "../types/extrinsics.js";
import {
  BaseCreateTxContext,
  TransactionPayload,
} from "@acala-network/sdk-v2-types";
import { incentiveAbi } from "../abis/incentive.js";
import { ModuleSupportIncentivesPoolId } from "@polkadot/types/lookup";

function getSubstrateTxPayload(
  params: IncentiveClaimRewardsParams & BaseCreateTxContext,
) {
  const { api, pool } = params;

  invariant(api, "Substrate API is not set");
  invariant(pool, "Pool is not set");

  return api.tx.incentives.claimRewards(pool);
}

function getEvmTxPayload(
  params: IncentiveClaimRewardsParams & BaseCreateTxContext,
) {
  const { api, pool } = params;
  const contractAddress = INCENTIVE_CONTRACT_ADDRESS;

  invariant(contractAddress, "Earning contract address is not set");
  invariant(pool, "Pool is not set");

  const rawPool = pool.toString();
  const rawPoolId = api.createType<ModuleSupportIncentivesPoolId>(
    "ModuleSupportIncentivesPoolId",
    rawPool,
  );

  const poolId = rawPoolId.asEarning.toNumber();
  const poolCurrencyId = rawPoolId.asEarning.asToken.toHex();

  return {
    to: contractAddress as `0x${string}`,
    data: encodeFunctionData({
      abi: incentiveAbi,
      functionName: "claimRewards",
      args: [poolId, poolCurrencyId],
    }),
    value: 0n,
  };
}

export function getAcaStakingUnstakeTx(
  context: BaseCreateTxContext,
): (params: IncentiveClaimRewardsParams) => TransactionPayload {
  const { api } = context;

  return (params: IncentiveClaimRewardsParams) => {
    const substrateTxPayload = getSubstrateTxPayload({ api, ...params });
    const evmTxPayload = getEvmTxPayload({ api, ...params });

    return {
      substrate: substrateTxPayload,
      evm: evmTxPayload,
    };
  };
}
