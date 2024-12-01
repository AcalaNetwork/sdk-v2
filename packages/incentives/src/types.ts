import { TokenId } from "@acala-network/sdk-v2-types";

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
  rate: number;
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

// The base reward info
export interface BaseReward {
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
  rewards: BaseReward[];
  // The reward config of the pool
  rewardConfig: RewardConfig[];
  // The deduction config of the pool
  deductionConfig: DeductionConfig[];
  // The deduction period config of the pool
  deductionPeriodConfig: DeductionPeriodConfig | null;
}

// The acala staking pool info
export interface AcaStakingPoolInfo extends PoolInfo {
  // The min bond of the pool
  minBond: bigint;
  // The unbonding period of the pool
  unbondingPeriod: number;
}

export interface Reward {
  // The token of the reward
  token: TokenId;

  // The accumulated reward amount
  totalAccumulated: bigint;

  // The withdrawn reward amount
  totalWithdrawn: bigint;

  // The available reward amount
  availableAmount: bigint;

  // The deduction amount if claim the reward before the deduction end block
  deductionAmount: bigint;

  // The claimable amount after deduction
  claimableAmount: bigint;
}

export interface UserInfo {
  staked: bigint;
  unstaking: bigint;
  rewards: Reward[];
}

// the helper function to query the deduction block
export type QueryDeductionBlockFN = (id: string) => Promise<bigint | null>;

// // the incentive pools interface
// export interface PoolPools {
//   // the pools
//   poolIds(): Promise<string[]>
//   // get the pool ids by type
//   poolIdsByType(type: PoolType): Promise<string[]>;
//   // get the pool entity by id
//   pool(id: string): PoolPool;
// }

// // the incentive pool interface
// export interface PoolPool {
//   // the hex string of the pool id
//   id: string;
//   // the type of the pool
//   type: PoolType;
//   // the token of the pool
//   token: string;
//   // the enable status of the pool
//   enable(): Promise<boolean>;
//   // the total share of the pool
//   totalShare(): Promise<Share>;
//   // subscribe the share of the pool
//   get totalShare$(): Observable<Share>;
//   // the total reward of the pool
//   totalRewards(): Promise<Reward[]>;
//   // subscribe the total reward of the pool
//   get totalReward$(): Observable<Reward[]>;
//   // the reward config of the pool
//   rewardConfig(): Promise<RewardConfig[]>;
//   // the deduction info of the pool
//   deductionConfig(): Promise<DeductionConfig[] | null>;
//   // user pool
//   user(account: string): UserPoolPool;
// }

// // the user incentive pool interface
// export interface UserPoolPool {
//   // the hex string of the pool id
//   pool: PoolPool;
//   // the user account
//   account: string;
//   // the share of the user
//   share(): Promise<Share>;
//   // subscribe the share of the user
//   get share$(): Observable<Share>;
//   // the reward of the user
//   rewards(): Promise<RewardWithDeduction[]>;
//   // subscribe the reward of the user
//   get rewards$(): Observable<RewardWithDeduction[]>;
// }

// // the acala staking ledger
// export interface ACAStakingLedger {
//   total: bigint;
//   active: bigint;
//   unlocking: { amount: bigint, at: bigint }[];
// }

// // the acala staking pool, including the config and the ledger of the user
// export interface ACAStakingUserPool extends UserPoolPool {
//   ledger(): Promise<ACAStakingLedger | null>;
//   get ledger$(): Observable<ACAStakingLedger | null>;
//   get minBond(): bigint;
//   get unbondingPeriod(): number;
// }

export interface IncentiveAdapter {
  // get the incentive pools
  getPoolList(): Promise<BasePool[]>;
  getPoolInfo(poolId: PoolId): Promise<PoolInfo>;
}
