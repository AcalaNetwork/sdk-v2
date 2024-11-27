import { ApiPromise, WsProvider } from "@polkadot/api";
import { beforeAll, describe, it, expect, afterAll } from "vitest";
import dotenv from "dotenv";
import { getBalance } from "./get-balance.js";

dotenv.config({ path: "../../.env" });

describe("getBalance", () => {
  let api: ApiPromise;

  beforeAll(async () => {
    api = await ApiPromise.create({ provider: new WsProvider(process.env.ACALA_WS_ENDPOINT) });
    await api.isReady;
  });

  afterAll(async () => {
    await api.disconnect();
  });

  it("should return the balance of an account", async () => {
    const balance = await getBalance(api, "ACA", "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY");

    expect(balance).toBeDefined();
    expect(balance.free).toBeGreaterThanOrEqual(0n);
    expect(balance.reserved).toBeGreaterThanOrEqual(0n);
    expect(balance.locked).toBeGreaterThanOrEqual(0n);
    expect(balance.available).toBeGreaterThanOrEqual(0n);
  });

  it("should return the balance of an account with tokenId", async () => {
    const balance = await getBalance(api, "0x0000", "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY");

    expect(balance).toBeDefined();
    expect(balance.free).toBeGreaterThanOrEqual(0n);
    expect(balance.reserved).toBeGreaterThanOrEqual(0n);
    expect(balance.locked).toBeGreaterThanOrEqual(0n);
    expect(balance.available).toBeGreaterThanOrEqual(0n);
  });

  it("should same result with tokenId and tokenSymbol", async () => {
    const balance1 = await getBalance(api, "0x0000", "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY");
    const balance2 = await getBalance(api, "ACA", "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY");

    expect(balance1.available).toBe(balance2.available);
    expect(balance1.free).toBe(balance2.free);
    expect(balance1.reserved).toBe(balance2.reserved);
    expect(balance1.locked).toBe(balance2.locked);
  });

  it("should throw error if the token is not found", async () => {
    await expect(getBalance(api, "NOT_FOUND", "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY")).rejects.toThrow("Token NOT_FOUND not found");
  });
});
