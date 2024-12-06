import { ACAStakingPoolConfig } from "../types/index.js";
import { ApiPromise } from "@polkadot/api";

export const getACAStakingPoolConfig = async (
  api: ApiPromise,
): Promise<ACAStakingPoolConfig> => {
  return {
    minBond: api.consts.earning.minBond.toBigInt(),
    unbondingPeriod: api.consts.earning.unbondingPeriod.toNumber(),
    maxUnbondingChunks: api.consts.earning.maxUnbondingChunks.toNumber(),
  };
};
