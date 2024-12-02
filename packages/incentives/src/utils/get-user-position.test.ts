import { ApiPromise, WsProvider } from "@polkadot/api";
import { getPoolList } from "./get-pool-list.js";
import { getUserPosition, watchUserPosition } from "./get-user-position.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import dotenv from "dotenv";
import { PoolId } from "../types/index.js";

dotenv.config({ path: "../../.env" });

describe("get user position", () => {
  let api: ApiPromise;
  let acaPoolId: PoolId;

  beforeAll(async () => {
    api = await ApiPromise.create({ provider: new WsProvider(process.env.ACALA_WS_ENDPOINT) });

    await api.isReady;

    // get aca staking pool id
    const pools = await getPoolList(api);
    const earningPool = pools.find((pool) => pool.type === "EARNING");
    if (!earningPool) {
      throw new Error("Acala staking pool not found");
    }
    acaPoolId = earningPool.id;
  });

  afterAll(async () => {
    await api.disconnect();
  });

  it("should return the user position", async () => {
    const userPosition = await getUserPosition(api, acaPoolId, "25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr");

    expect(userPosition).toBeDefined();
    expect(userPosition.share).toBe(189_000_000_000_000n);
    expect(userPosition.rewards[0].token).toBe("0x0000");
  });

  it("should watch the user position", async () => {
    const unsub = await watchUserPosition(
      api,
      acaPoolId,
      "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
      (userPosition) => {
        expect(userPosition).toBeDefined();
        unsub();
      },
    );
  });
});
