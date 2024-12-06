import { ApiPromise, WsProvider } from "@polkadot/api";
import { beforeAll, describe, it, expect, afterAll } from "vitest";
import dotenv from "dotenv";
import { getBalance, watchBalance } from "./get-balance.js";
import { createPublicClient, http, PublicClient } from "viem";
import { acala } from "viem/chains";

dotenv.config({ path: "../../.env" });

describe("getBalance", () => {
  let api: ApiPromise;
  let publicClient: PublicClient;

  beforeAll(async () => {
    api = await ApiPromise.create({
      provider: new WsProvider(process.env.ACALA_WS_ENDPOINT),
    });
    await api.isReady;

    publicClient = createPublicClient({
      chain: acala,
      transport: http(),
    });
  });

  afterAll(async () => {
    await api.disconnect();
  });

  it("should return the balance of an account", async () => {
    const balance = await getBalance(
      api,
      publicClient,
      "ACA",
      "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    );

    expect(balance).toBeDefined();
    expect(balance.free).toBeGreaterThanOrEqual(0n);
    expect(balance.reserved).toBeGreaterThanOrEqual(0n);
    expect(balance.locked).toBeGreaterThanOrEqual(0n);
    expect(balance.available).toBeGreaterThanOrEqual(0n);
  });

  it("should return the balance of an account with tokenId", async () => {
    const balance = await getBalance(
      api,
      publicClient,
      "0x0000",
      "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    );

    expect(balance).toBeDefined();
    expect(balance.free).toBeGreaterThanOrEqual(0n);
    expect(balance.reserved).toBeGreaterThanOrEqual(0n);
    expect(balance.locked).toBeGreaterThanOrEqual(0n);
    expect(balance.available).toBeGreaterThanOrEqual(0n);
  });

  it("should same result with tokenId and tokenSymbol", async () => {
    const balance1 = await getBalance(
      api,
      publicClient,
      "0x0000",
      "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    );
    const balance2 = await getBalance(
      api,
      publicClient,
      "ACA",
      "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    );

    expect(balance1.available).toBe(balance2.available);
    expect(balance1.free).toBe(balance2.free);
    expect(balance1.reserved).toBe(balance2.reserved);
    expect(balance1.locked).toBe(balance2.locked);
  });

  it("should watch balance change", async () => {
    const balance1 = await getBalance(
      api,
      publicClient,
      "ACA",
      "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    );
    const unsubscribe = await watchBalance(
      api,
      publicClient,
      "ACA",
      "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
      (balance) => {
        expect(balance.available).toBe(balance1.available);
        expect(balance.free).toBe(balance1.free);
        expect(balance.reserved).toBe(balance1.reserved);
        expect(balance.locked).toBe(balance1.locked);

        unsubscribe();
      },
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it("should throw error if the token is not found", async () => {
    await expect(
      getBalance(
        api,
        publicClient,
        "NOT_FOUND",
        "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
      ),
    ).rejects.toThrow("Token NOT_FOUND not found");
  });
});
