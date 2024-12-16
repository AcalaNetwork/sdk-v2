import { ApiPromise } from "@polkadot/api";
import {
  AcaStakingAdapter,
  BasePool,
  IncentiveAdapter,
  PoolId,
  PoolInfo,
  UserPosition,
} from "../types/index.js";
import { getPoolList } from "../utils/get-pool-list.js";
import { getPoolInfo, watchPoolInfo } from "../utils/get-pool-info.js";
import { UnsubscribePromise } from "@polkadot/api-base/cjs/types/index";
import { TransactionPayload, UnifyAddress } from "@acala-network/sdk-v2-types";
import {
  getUserPosition,
  watchUserPosition,
} from "../utils/get-user-position.js";
import {
  getUserACAStakingLedger,
  watchUserACAStakingLedger,
} from "../utils/get-user-ledger.js";
import { getACAStakingPoolConfig } from "../utils/get-aca-staking-configs.js";
import { getAcaStakingStakeTx } from "../extrinsics/aca-staking-stake.js";
import { getAcaStakingWithdrawUnstakedTx } from "../extrinsics/aca-staking-withdraw-unstaked.js";
import { getAcaStakingUnstakeTx } from "../extrinsics/aca-staking-unstake.js";
import { getAcaStakingRestakeTx } from "../extrinsics/aca-staking-restake.js";
import { IncentiveClaimRewardsParams } from "../types/extrinsics.js";
import { getIncentiveClaimRewardsTx } from "../extrinsics/incentive-claim-rewards.js";

export class Incentive implements IncentiveAdapter {
  private api: ApiPromise;

  constructor(api: ApiPromise) {
    this.api = api;
  }

  getPoolList(): Promise<BasePool[]> {
    return getPoolList(this.api);
  }

  getPoolInfo(poolId: PoolId): Promise<PoolInfo> {
    return getPoolInfo(this.api, poolId);
  }

  watchPoolInfo(
    poolId: PoolId,
    callback: (poolInfo: PoolInfo) => void,
  ): UnsubscribePromise {
    return watchPoolInfo(this.api, poolId, callback);
  }

  getUserPosition(
    poolId: PoolId,
    address: UnifyAddress,
  ): Promise<UserPosition> {
    return getUserPosition(this.api, poolId, address);
  }

  watchUserPosition(
    poolId: PoolId,
    address: UnifyAddress,
    callback: (userPosition: UserPosition) => void,
  ): UnsubscribePromise {
    return watchUserPosition(this.api, poolId, address, callback);
  }

  claimRewards(
    params: IncentiveClaimRewardsParams,
  ): Promise<TransactionPayload> {
    return getIncentiveClaimRewardsTx({ api: this.api })(params);
  }

  acaStaking: AcaStakingAdapter = {
    getPoolConfig: () => getACAStakingPoolConfig(this.api),
    getLedger: (address) => getUserACAStakingLedger(this.api, address),
    watchLedger: (address, callback) =>
      watchUserACAStakingLedger(this.api, address, callback),

    // extrinsics
    stake: (params) => getAcaStakingStakeTx({ api: this.api })(params),
    unstake: (params) => getAcaStakingUnstakeTx({ api: this.api })(params),
    restake: (params) => getAcaStakingRestakeTx({ api: this.api })(params),
    withdrawUnstaked: () =>
      getAcaStakingWithdrawUnstakedTx({ api: this.api })(),
  };
}
