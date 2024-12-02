import { describe, expect, beforeAll, it, afterAll } from "vitest";
import { ApiPromise, WsProvider } from "@polkadot/api";
import dotenv from "dotenv";
import {
  assetIdToTokenId,
  assetToToken,
  tokenIdToAssetId,
  tokenToAsset,
} from "./currency-type-convertor.js";
import { AcalaPrimitivesCurrencyAssetIds, AcalaPrimitivesCurrencyCurrencyId } from "@polkadot/types/lookup";

dotenv.config({ path: "../../.env" });

describe("assetToToken", () => {
  let api: ApiPromise;

  beforeAll(async () => {
    api = await ApiPromise.create({
      provider: new WsProvider(process.env.ACALA_WS_ENDPOINT),
    });

    await api.isReady;
  });

  afterAll(async () => {
    await api.disconnect();
  });

  it("should init api", () => {
    expect(api).toBeDefined();
  });

  // native asset
  it("should convert asset to token with native asset", () => {
    const asset = api.createType<AcalaPrimitivesCurrencyAssetIds>(
      "AcalaPrimitivesCurrencyAssetIds",
      { NativeAssetId: 0 },
    );
    const token = assetToToken(api, asset);

    expect(token.isToken).toBeDefined();
    expect(token.asToken.isAca).toBe(true);
  });

  it("should convert asset to token with erc20", () => {
    const asset = api.createType<AcalaPrimitivesCurrencyAssetIds>(
      "AcalaPrimitivesCurrencyAssetIds",
      { Erc20: "0x0000000000000000000000000000000000000000" },
    );
    const token = assetToToken(api, asset);

    expect(token.isErc20).toBeDefined();
    expect(token.asErc20.toHex()).toBe(
      "0x0000000000000000000000000000000000000000",
    );
  });

  it("should convert asset to token with foreign asset", () => {
    const asset = api.createType<AcalaPrimitivesCurrencyAssetIds>(
      "AcalaPrimitivesCurrencyAssetIds",
      { ForeignAssetId: 0 },
    );
    const token = assetToToken(api, asset);

    expect(token.isForeignAsset).toBeDefined();
    expect(token.asForeignAsset.toString()).toBe("0");
  });

  it("should convert asset to token with stable asset", () => {
    const asset = api.createType<AcalaPrimitivesCurrencyAssetIds>(
      "AcalaPrimitivesCurrencyAssetIds",
      { StableAssetId: 0 },
    );
    const token = assetToToken(api, asset);

    expect(token.isStableAssetPoolToken).toBeDefined();
    expect(token.asStableAssetPoolToken.toString()).toBe("0");
  });

  it("should error with invalid asset", () => {
    expect(() =>
      assetToToken(api, {} as unknown as AcalaPrimitivesCurrencyAssetIds),
    ).toThrow("Asset to token conversion failed");
  });

  it("should convert token to asset with native asset", () => {
    // native asset
    const token = api.createType<AcalaPrimitivesCurrencyCurrencyId>(
      "AcalaPrimitivesCurrencyCurrencyId",
      { Token: "ACA" },
    );
    const asset = tokenToAsset(api, token);
    const ldotToken = api.createType<AcalaPrimitivesCurrencyCurrencyId>(
      "AcalaPrimitivesCurrencyCurrencyId",
      { LiquidCrowdloan: 13 },
    );
    const ldotAsset = tokenToAsset(api, ldotToken);

    expect(asset.isNativeAssetId).toBeDefined();
    expect(asset.asNativeAssetId.asToken.isAca).toBe(true);
    expect(ldotAsset.isNativeAssetId).toBeDefined();
    expect(ldotAsset.asNativeAssetId.asLiquidCrowdloan.toNumber()).toBe(13);
  });

  it("should convert token to asset with erc20", () => {
    const token = api.createType<AcalaPrimitivesCurrencyCurrencyId>(
      "AcalaPrimitivesCurrencyCurrencyId",
      { Erc20: "0x0000000000000000000000000000000000000000" },
    );
    const asset = tokenToAsset(api, token);

    expect(asset.isErc20).toBeDefined();
    expect(asset.asErc20.toHex()).toBe(
      "0x0000000000000000000000000000000000000000",
    );
  });

  it("should convert token to asset with foreign asset", () => {
    const token = api.createType<AcalaPrimitivesCurrencyCurrencyId>(
      "AcalaPrimitivesCurrencyCurrencyId",
      { ForeignAsset: "0" },
    );
    const asset = tokenToAsset(api, token);

    expect(asset.isForeignAssetId).toBeDefined();
    expect(asset.asForeignAssetId.toString()).toBe("0");
  });

  it("should convert token to asset with stable asset", () => {
    const token = api.createType<AcalaPrimitivesCurrencyCurrencyId>(
      "AcalaPrimitivesCurrencyCurrencyId",
      { StableAssetPoolToken: "0" },
    );
    const asset = tokenToAsset(api, token);

    expect(asset.isStableAssetId).toBeDefined();
    expect(asset.asStableAssetId.toString()).toBe("0");
  });

  it("should error with invalid token", () => {
    expect(() => tokenToAsset(api, {} as unknown as AcalaPrimitivesCurrencyCurrencyId)).toThrow(
      "Token to asset conversion failed",
    );
  });

  it("should convert tokenId to assetId", () => {
    const token = api.createType<AcalaPrimitivesCurrencyCurrencyId>(
      "AcalaPrimitivesCurrencyCurrencyId",
      { Token: "ACA" },
    );
    const asset = api.createType<AcalaPrimitivesCurrencyAssetIds>(
      "AcalaPrimitivesCurrencyAssetIds",
      { NativeAssetId: { Token: "ACA" } },
    );
    const convertedAssetId = tokenIdToAssetId(api, token.toHex());
    const convertedTokenId = assetIdToTokenId(api, asset.toHex());

    expect(convertedAssetId).toBe(asset.toHex());
    expect(convertedTokenId).toBe(token.toHex());
  });
});
