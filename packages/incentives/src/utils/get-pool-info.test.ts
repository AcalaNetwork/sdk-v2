import { ApiPromise, WsProvider } from "@polkadot/api";
import { getPoolList } from "./get-pool-list.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getPoolDeductionPeriodConfig, getPoolInfo, getPoolRewardConfig, watchPoolInfo } from "./get-pool-info.js";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

describe("get pool info", () => {
  let api: ApiPromise;

  beforeAll(async () => {
    api = await ApiPromise.create({ provider: new WsProvider(process.env.ACALA_WS_ENDPOINT) });

    await api.isReady;
  });

  afterAll(async () => {
    await api.disconnect();
  });

  it("should return the reward config of the pool", async () => {
    const pools = await getPoolList(api);
    const acaStakingPool = pools.find((pool) => pool.type === "EARNING");

    if (!acaStakingPool) {
      throw new Error("Aca staking pool not found");
    }

    const rewardConfig = await getPoolRewardConfig(api, acaStakingPool.id);

    expect(rewardConfig).toBeDefined();
    expect(rewardConfig.length).toBeGreaterThan(0);
    expect(rewardConfig[0].token).toBe("0x0000");
    expect(rewardConfig[0].amount).toBe(96_450_600_000_000n);
    expect(rewardConfig[0].period).toBe(5);
  });

  it("should return the deduction period config of the pool", async () => {
    const deductionPeriodConfig = await getPoolDeductionPeriodConfig(api);

    expect(deductionPeriodConfig).toBeDefined();
  });

  it("should return the pool info", async () => {
    const pools = await getPoolList(api);
    const acaStakingPool = pools.find((pool) => pool.type === "EARNING");

    if (!acaStakingPool) {
      throw new Error("Aca staking pool not found");
    }

    const poolInfo = await getPoolInfo(api, acaStakingPool.id);

    expect(poolInfo).toBeDefined();
    expect(poolInfo.status).toBe("ENABLED");
  });

  it("should watch the pool info", async () => {
    const pools = await getPoolList(api);
    const acaStakingPool = pools.find((pool) => pool.type === "EARNING");

    if (!acaStakingPool) {
      throw new Error("Aca staking pool not found");
    }

    const unsub = await watchPoolInfo(api, acaStakingPool.id, (poolInfo) => {
      console.log(poolInfo);

      expect(poolInfo).toBeDefined();
      expect(poolInfo.status).toBe("ENABLED");

      unsub();
    });
  });
});
