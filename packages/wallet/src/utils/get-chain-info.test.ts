import { ApiPromise, WsProvider } from "@polkadot/api";
import { getChain, getNativeTokenSymbol, getSS58Format } from "./get-chain-info.js";
import { describe, it, expect, afterAll, beforeAll } from "vitest";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

describe("getChain", () => {
  let api: ApiPromise;

  beforeAll(async () => {
    api = await ApiPromise.create({ provider: new WsProvider(process.env.ACALA_WS_ENDPOINT) });
    await api.isReady;
  });

  afterAll(async () => {
    await api.disconnect();
  });

  it("should return the correct chain", async () => {
    const chain = getChain(api);

    expect(chain).toBe("acala");
  })

  it("should get the ss58 format", async () => {
    const ss58Format = getSS58Format(api);

    expect(ss58Format).toBe(10);
  })

  it("should get the native token symbol", async () => {
    const nativeTokenSymbol = getNativeTokenSymbol(api);

    expect(nativeTokenSymbol).toBe("ACA");
  })
})
