import { PoolId } from "./index.js";

export interface AcaStakingStakeParams {
  amount: bigint;
}

export interface AcaStakingUnstakeParams {
  amount: bigint;
}

export interface AcaStakingRestakeParams {
  amount: bigint;
}

// NOTE: no params needed for this extrinsic
// export interface AcaStakingWithdrawUnstakeParams {
//   __phantom: never;
// }

export type IncentiveClaimRewardsParams = {
  pool: PoolId;
};
