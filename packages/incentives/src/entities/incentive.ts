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
import { UnifyAddress } from "@acala-network/sdk-v2-types";
import {
  getUserPosition,
  watchUserPosition,
} from "../utils/get-user-position.js";
import {
  getUserACAStakingLedger,
  watchUserACAStakingLedger,
} from "../utils/get-user-ledger.js";
import { getACAStakingPoolConfig } from "../utils/get-aca-staking-configs.js";

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

  acaStaking: AcaStakingAdapter = {
    getPoolConfig: () => getACAStakingPoolConfig(this.api),
    getLedger: (address) => getUserACAStakingLedger(this.api, address),
    watchLedger: (address, callback) =>
      watchUserACAStakingLedger(this.api, address, callback),
  };
}
