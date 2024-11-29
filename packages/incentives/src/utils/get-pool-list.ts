import { ApiPromise } from "@polkadot/api";
import { ModuleSupportIncentivesPoolId } from "@polkadot/types/lookup";
import { BasePool, PoolId } from "../types.js";
import { TokenId } from "@acala-network/sdk-v2-types";

export function getPoolFromRawPoolId(poolId: ModuleSupportIncentivesPoolId): BasePool {
  const type = poolId.isDex ? "DEX" : poolId.isEarning ? "EARNING" : "LOANS";
  const token = poolId.isDex ? poolId.asDex : poolId.isEarning ? poolId.asEarning : poolId.asLoans;

  return {
    id: poolId.toHex() as PoolId,
    token: token.toHex() as TokenId,
    type,
    status: "ENABLED",
  }
}

/**
 * Get the list of enabled pools
 * @param api - The api instance
 */
export async function getPoolList(api: ApiPromise): Promise<BasePool[]> {
  // when the pool is enabled, the reward amount is not zero
  const pools = await api.query.incentives.incentiveRewardAmounts.entries();

  return pools.map(([key]) => getPoolFromRawPoolId(key.args[0]));
}
