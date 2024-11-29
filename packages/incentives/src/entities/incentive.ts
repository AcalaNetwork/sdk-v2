import { ApiPromise } from "@polkadot/api";
import { BasePool, IncentiveAdapter, PoolId, PoolInfo } from "../types.js";
import { getPoolList } from "../utils/get-pool-list.js";
import { getPoolInfo, watchPoolInfo } from "../utils/get-pool-info.js";
import { UnsubscribePromise } from "@polkadot/api-base/cjs/types/index";

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
}
