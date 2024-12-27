import { afterAll, beforeAll, describe, expect, it } from "vitest";
import dotenv from "dotenv";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { getLPTokenList } from "./get-lp-tokens.js";
import { getTokenById } from "./get-tokens.js";
import { lookupToken } from "./lookup-token.js";
import { http, PublicClient } from "viem";
import { createPublicClient } from "viem";
import { acala } from "viem/chains";

dotenv.config({ path: "../../.env" });

describe("getLPTokenList", () => {
  let api!: ApiPromise;
  let client: PublicClient;

  beforeAll(async () => {
    api = await ApiPromise.create({
      provider: new WsProvider(process.env.ACALA_WS_ENDPOINT),
    });
    await api.isReady;

    client = createPublicClient({
      chain: acala,
      transport: http(),
    });
  });

  afterAll(async () => {
    await api.disconnect();
  });

  it("should return the LP tokens", async () => {
    const tokens = await getLPTokenList(api);

    expect(tokens).toBeDefined();
    expect(tokens.length).toBeGreaterThan(0);

    // filter out the tokens that do not have evm address
    const noEvmTokens = tokens.filter((token) => !token.evm);

    console.log(noEvmTokens);

    // expect all tokens name start with LP
    expect(tokens.every((token) => token.name.startsWith("LP"))).toBe(true);
    // expect all tokens is not form evm
    expect(tokens.every((token) => !token.isFormEvm)).toBe(true);
    // expect all tokens have evm address
    expect(tokens.every((token) => token.evm)).toBe(true);
  });

  it("should getTokenById work with lp token", async () => {
    const tokens = await getLPTokenList(api);
    const token0 = tokens[0];
    const target = await getTokenById(api, token0.id);

    expect(target).toBeDefined();
    expect(target.id).toBe(token0.id);
    expect(target.name).toBe(token0.name);
    expect(target.symbol).toBe(token0.symbol);
    expect(target.decimals).toBe(token0.decimals);
    expect(target.isFormEvm).toBe(token0.isFormEvm);
    expect(target.evm).toBe(token0.evm);
    expect(target.minimalBalance).toBe(token0.minimalBalance);
  });

  it("should lookupToken work with lp token", async () => { const tokens = await getLPTokenList(api);
    const token0 = tokens[0];
    const target = await lookupToken(api, client, token0.symbol);

    expect(target).toBeDefined();
    expect(target.id).toBe(token0.id);
  });
});
