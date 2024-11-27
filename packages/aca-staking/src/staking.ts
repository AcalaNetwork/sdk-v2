import { ApiPromise } from "@polkadot/api";
import { ProtocolInfo } from "./types.js";

interface ACAStakingOptions {
  api: ApiPromise;
}

export class ACAStaking {
  private api: ApiPromise;

  constructor(options: ACAStakingOptions) {
    this.api = options.api;
  }

  async getStakingInfo(): Promise<ProtocolInfo> {
    const stakingInfo = await this.api.query.staking.bonded.entries();
    return stakingInfo;
  }
}
