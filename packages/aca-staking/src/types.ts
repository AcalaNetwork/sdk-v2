export interface ProtocolInfo {
  issuance: bigint;
  totalStaked: bigint;
}

export interface Reward {
  token: string;
  amount: bigint;
}

export interface UserInfo {
  staked: bigint;
  unstaking: bigint;
  rewards: Reward[];
}
