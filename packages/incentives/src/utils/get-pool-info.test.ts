import { ApiPromise, WsProvider } from "@polkadot/api";
import { getPoolList } from "./get-pool-list.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getPoolDeductionConfigs, getPoolDeductionPeriodConfig, getPoolInfo, getPoolRewardConfigs, watchPoolInfo } from "./get-pool-info.js";
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

    const rewardConfigs = await getPoolRewardConfigs(api, acaStakingPool.id);

    expect(rewardConfigs).toBeDefined();
    expect(rewardConfigs.length).toBeGreaterThan(0);
    expect(rewardConfigs[0].token).toBe("0x0000");
    expect(rewardConfigs[0].amount).toBe(96_450_600_000_000n);
    expect(rewardConfigs[0].period).toBe(5);
  });

  it("should return the deduction period config of the pool", async () => {
    const deductionPeriodConfig = await getPoolDeductionPeriodConfig(api);

    expect(deductionPeriodConfig).toBeDefined();
  });

  it("should return the deduction config of the pool", async () => {
    const pools = await getPoolList(api);
    const acaStakingPool = pools.find((pool) => pool.type === "EARNING");

    if (!acaStakingPool) {
      throw new Error("Aca staking pool not found");
    }

    const deductionConfigs = await getPoolDeductionConfigs(api, acaStakingPool.id);

    expect(deductionConfigs).toBeDefined();
    expect(deductionConfigs[0].rate).toBe(BigInt(2 * 10 ** 17));
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
    expect(poolInfo.token).toBe("0x0000");
    expect(poolInfo.rewards[0].token).toBe("0x0000");
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
