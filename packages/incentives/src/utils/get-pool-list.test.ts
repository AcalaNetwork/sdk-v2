import { ApiPromise, WsProvider } from "@polkadot/api";
import { getEnabledPoolList } from "./get-pool-list.js";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

describe("get pool list", () => {
  let api: ApiPromise;

  beforeAll(async () => {
    api = await ApiPromise.create({ provider: new WsProvider(process.env.ACALA_WS_ENDPOINT) });

    await api.isReady;
  });

  afterAll(async () => {
    await api.disconnect();
  });

  it("should return the list of enabled pools", async () => {
    const pools = await getEnabledPoolList(api);

    expect(pools).toBeDefined();
  });
});
