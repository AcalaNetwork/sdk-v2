import { UnsubscribePromise } from "@polkadot/api-base/types";

import {
  TokenId,
  TransactionPayload,
  UnifyAddress,
} from "@acala-network/sdk-v2-types";
import {
  AcaStakingRestakeParams,
  AcaStakingStakeParams,
  AcaStakingUnstakeParams,
} from "./extrinsics.js";

export const PoolTypes = ["LOANS", "DEX", "EARNING"] as const;

// The type of the incentive
export type PoolType = (typeof PoolTypes)[number];

// The status of the pool
export type PoolStatus = "ENABLED" | "DISABLED";

// The id of the pool
export type PoolId = string;

// The share of the pool
export type Share = bigint;

// The reward config of the pool
export interface RewardConfig {
  // The token of the reward
  token: TokenId;
  // The amount of the reward
  amount: bigint;
  // The period of the reward
  period: number;
}

// The deduction period config of the pool
export interface DeductionPeriodConfig {
  // The pool id
  poolId: PoolId;
  // The end block of the deduction
  endBlock: bigint;
}

// The deduction config of the pool
export interface DeductionConfig {
  // The token of the deduction
  token: TokenId;
  // The deduction rate
  rate: bigint;
}

// The base pool info
export interface BasePool {
  // The hex string of the pool id
  id: PoolId;
  // The token of the pool
  token: TokenId;
  // The type of the pool
  type: PoolType;
  // The status of the pool
  status: PoolStatus;
}

// The pool reward info
// total accumulated and withdrawn amount for calculating the reward of the user
export interface PoolReward {
  // The token of the reward
  token: TokenId;
  // The total accumulated amount of the reward
  totalAccumulated: bigint;
  // The total withdrawn amount of the reward
  totalWithdrawn: bigint;
  // The available amount of the reward
  availableAmount: bigint;
}

// The pool info
export interface PoolInfo extends BasePool {
  // The total staked amount of the protocol
  totalStaked: bigint;
  // The rewards of the pool
  rewards: PoolReward[];
  // The reward configs of the pool
  rewardConfigs: RewardConfig[];
  // The deduction configs of the pool
  deductionConfigs: DeductionConfig[];
  // The deduction period config of the pool
  deductionPeriodConfig: DeductionPeriodConfig | null;
}

// The reward info of the user
export interface UserReward {
  // The token of the reward
  token: TokenId;

  // The available reward amount without deduction
  availableAmount: bigint;

  // The deduction amount if claim the reward before the deduction end block
  deductionAmount: bigint;

  // The claimable amount after deduction
  claimableAmount: bigint;
}

export interface UserPosition {
  poolId: PoolId;
  // the user address
  address: UnifyAddress;
  // the staked amount of the user
  share: bigint;
  // the rewards of the user
  rewards: UserReward[];
}

// the acala staking ledger
export interface ACAStakingLedger {
  totalLocked: bigint;
  activeAmount: bigint;
  unlockingAmount: bigint;
  unlockingList: { amount: bigint; at: bigint }[];
}

export interface ACAStakingPoolConfig {
  minBond: bigint;
  unbondingPeriod: number;
  maxUnbondingChunks: number;
}

export interface IncentiveAdapter {
  // get the list of enabled pools
  getPoolList(): Promise<BasePool[]>;
  // get the pool info by pool id
  getPoolInfo(poolId: PoolId): Promise<PoolInfo>;
  // watch the pool info by pool id
  watchPoolInfo(
    poolId: PoolId,
    callback: (poolInfo: PoolInfo) => void,
  ): UnsubscribePromise;
  // get the user pool info
  getUserPosition(poolId: PoolId, address: UnifyAddress): Promise<UserPosition>;
  // watch the user stake info
  watchUserPosition(
    poolId: PoolId,
    address: UnifyAddress,
    callback: (userPosition: UserPosition) => void,
  ): UnsubscribePromise;

  // extrinsic
  // claimRewards: (params: IncentiveClaimRewardsParams) => TransactionPayload;

  // specific for acala staking
  acaStaking: AcaStakingAdapter;
}

export interface AcaStakingAdapter {
  // get the acala staking pool config
  getPoolConfig(): ACAStakingPoolConfig;
  // get the acala staking ledger of the user
  getLedger(address: UnifyAddress): Promise<ACAStakingLedger>;
  // watch the acala staking ledger of the user
  watchLedger(
    address: UnifyAddress,
    callback: (ledger: ACAStakingLedger) => void,
  ): UnsubscribePromise;

  // extrinsic
  stake: (params: AcaStakingStakeParams) => TransactionPayload;
  unstake: (params: AcaStakingUnstakeParams) => TransactionPayload;
  restake: (params: AcaStakingRestakeParams) => TransactionPayload;
  withdrawUnstaked: () => TransactionPayload;
}
