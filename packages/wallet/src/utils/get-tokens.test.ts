import { afterAll, beforeAll, describe, expect, it } from "vitest";
import dotenv from "dotenv";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { getRegisteredTokens, getTokenById, isTokenId } from "./get-tokens.js";
import { ACALA_EVM_ADDRESS_MAP } from "../configs/evm-address-map.js";
import { getSuggestTokens } from "./get-suggest-tokens.js";

dotenv.config({ path: "../../.env" });

describe("getRegisteredTokens", () => {
  let api!: ApiPromise;

  beforeAll(async () => {
    api = await ApiPromise.create({
      provider: new WsProvider(process.env.ACALA_WS_ENDPOINT),
    });
    await api.isReady;
  });

  afterAll(async () => {
    await api.disconnect();
  });

  it("should return the registered tokens", async () => {
    const tokens = await getRegisteredTokens(api);

    expect(tokens).toBeDefined();
    expect(tokens.length).toBeGreaterThan(0);
    // check the aca token
    const aca = tokens.find((token) => token.id === "0x0000");
    expect(aca).toBeDefined();
    expect(aca?.name).toBe("Acala");
    expect(aca?.symbol).toBe("ACA");
    expect(aca?.decimals).toBe(12);
    expect(aca?.evm).toBe(
      ACALA_EVM_ADDRESS_MAP.find((item) => item.symbol === "ACA")?.address,
    );
    expect(aca?.minimalBalance).toBe(100000000000n);
  });

  it("should get token by id", async () => {
    const token = await getTokenById(api, "0x0000");

    expect(token).toBeDefined();
    expect(token.id).toBe("0x0000");
    expect(token.name).toBe("Acala");
    expect(token.symbol).toBe("ACA");
    expect(token.decimals).toBe(12);
    expect(token.evm).toBe(
      ACALA_EVM_ADDRESS_MAP.find((item) => item.symbol === "ACA")?.address,
    );
    expect(token.minimalBalance).toBe(100000000000n);
  });

  it("should get dex share token", async () => {
    const aca = api.createType("AcalaPrimitivesCurrencyCurrencyId", "0x0000");
    const ausd = api.createType("AcalaPrimitivesCurrencyCurrencyId", "0x0001");
    const lpAcaAusd = api.createType("AcalaPrimitivesCurrencyCurrencyId", {
      DexShare: [aca, ausd],
    });

    const token = await getTokenById(api, lpAcaAusd.toHex());

    expect(token).toBeDefined();
    expect(token.id).toBe(lpAcaAusd.toHex());
    expect(token.name).toBe("LP ACA-aSEED");
    expect(token.symbol).toBe("LP ACA-aSEED");
    expect(token.decimals).toBe(12);
    expect(token.evm).toBeDefined();
    expect(token.minimalBalance).toBe(100000000000n);
  });

  it("should return true if the token id is valid", () => {
    const isValid = isTokenId(api, "0x0000");

    expect(isValid).toBe(true);
  });

  it("should return false if the token id is invalid", () => {
    const isValid = isTokenId(api, "invalid");

    // should not throw error
    expect(() => isTokenId(api, "invalid")).not.toThrow();
    expect(isValid).toBe(false);
  });

  it("should get suggest tokens", async () => {
    const tokens = await getSuggestTokens(api);

    console.log(tokens);
    expect(tokens).toBeDefined();
    expect(tokens.length).toBeGreaterThan(0);
  });
});
