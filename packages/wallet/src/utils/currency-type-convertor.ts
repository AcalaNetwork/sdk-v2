import { TokenId } from "@acala-network/sdk-v2-types";
import { ApiPromise, ApiRx } from "@polkadot/api";
import { HexString } from "@polkadot/util/types";
import { DexShare, CurrencyId, AssetIds } from "../types/index.js";

// Convert the AcalaPrimitiveCurrencyAssetIds to AcalaPrimitivesCurrencyCurrencyId
function assetToCurrency(api: ApiPromise | ApiRx, asset: AssetIds): CurrencyId {
  try {
    if (asset.isErc20) {
      return api.createType("AcalaPrimitivesCurrencyCurrencyId", {
        Erc20: asset.asErc20.toHex(),
      });
    }

    if (asset.isForeignAssetId) {
      return api.createType("AcalaPrimitivesCurrencyCurrencyId", {
        ForeignAsset: asset.asForeignAssetId.toHex(),
      });
    }

    if (asset.isStableAssetId) {
      return api.createType("AcalaPrimitivesCurrencyCurrencyId", {
        StableAssetPoolToken: asset.asStableAssetId.toHex(),
      });
    }

    if (asset.isNativeAssetId) {
      return asset.asNativeAssetId;
    }

    throw new Error(`Invalid asset: ${asset.toHex()}`);
  } catch (e: unknown) {
    throw new Error("Asset to token conversion failed", { cause: e });
  }
}

// Convert the AcalaPrimitivesCurrencyCurrencyId to AcalaPrimitiveCurrencyAssetIds
function currencyToAsset(
  api: ApiPromise | ApiRx,
  currency: CurrencyId,
): AssetIds {
  try {
    if (currency.isErc20) {
      return api.createType("AcalaPrimitivesCurrencyAssetIds", {
        Erc20: currency.asErc20,
      });
    }

    if (currency.isForeignAsset) {
      return api.createType("AcalaPrimitivesCurrencyAssetIds", {
        ForeignAssetId: currency.asForeignAsset,
      });
    }

    if (currency.isStableAssetPoolToken) {
      return api.createType("AcalaPrimitivesCurrencyAssetIds", {
        StableAssetId: currency.asStableAssetPoolToken,
      });
    }

    if (currency.isToken || currency.isLiquidCrowdloan) {
      return api.createType("AcalaPrimitivesCurrencyAssetIds", {
        NativeAssetId: currency.toHex(),
      });
    }

    throw new Error(`Invalid currency: ${currency.toHex()}`);
  } catch (e: unknown) {
    throw new Error("Currency to asset conversion failed", { cause: e });
  }
}

// Convert the tokenId to assetId
function tokenIdToAssetId(api: ApiPromise | ApiRx, tokenId: string): HexString {
  const token = api.createType<CurrencyId>(
    "AcalaPrimitivesCurrencyCurrencyId",
    tokenId,
  );

  return currencyToAsset(api, token).toHex();
}

// Convert the assetId to tokenId
function assetIdToTokenId(api: ApiPromise | ApiRx, assetId: string): TokenId {
  const asset = api.createType<AssetIds>(
    "AcalaPrimitivesCurrencyAssetIds",
    assetId,
  );

  return assetToCurrency(api, asset).toHex();
}

// Convert the trading pair to dex share
function tradingPairToDexShare(
  api: ApiPromise,
  tradingPair: [CurrencyId, CurrencyId],
): DexShare[] {
  const transfrom = (token: CurrencyId): DexShare => {
    if (token.isToken) {
      return api.createType<DexShare>("AcalaPrimitivesCurrencyDexShare", {
        Token: token.asToken,
      });
    }

    if (token.isErc20) {
      return api.createType<DexShare>("AcalaPrimitivesCurrencyDexShare", {
        Erc20: token.asErc20,
      });
    }

    if (token.isLiquidCrowdloan) {
      return api.createType<DexShare>("AcalaPrimitivesCurrencyDexShare", {
        LiquidCrowdloan: token.asLiquidCrowdloan,
      });
    }

    if (token.isForeignAsset) {
      return api.createType<DexShare>("AcalaPrimitivesCurrencyDexShare", {
        ForeignAsset: token.asForeignAsset,
      });
    }

    if (token.isStableAssetPoolToken) {
      return api.createType<DexShare>("AcalaPrimitivesCurrencyDexShare", {
        StableAssetPoolToken: token.asStableAssetPoolToken,
      });
    }

    throw new Error("Invalid token");
  };

  return [transfrom(tradingPair[0]), transfrom(tradingPair[1])];
}

function dexShareToCurrency(api: ApiPromise, dexShare: DexShare): CurrencyId {
  if (dexShare.isToken) {
    return api.createType<CurrencyId>("AcalaPrimitivesCurrencyCurrencyId", {
      Token: dexShare.asToken,
    });
  }

  if (dexShare.isErc20) {
    return api.createType<CurrencyId>("AcalaPrimitivesCurrencyCurrencyId", {
      Erc20: dexShare.asErc20,
    });
  }

  if (dexShare.isLiquidCrowdloan) {
    return api.createType<CurrencyId>("AcalaPrimitivesCurrencyCurrencyId", {
      LiquidCrowdloan: dexShare.asLiquidCrowdloan,
    });
  }

  if (dexShare.isForeignAsset) {
    return api.createType<CurrencyId>("AcalaPrimitivesCurrencyCurrencyId", {
      ForeignAsset: dexShare.asForeignAsset,
    });
  }

  if (dexShare.isStableAssetPoolToken) {
    return api.createType<CurrencyId>("AcalaPrimitivesCurrencyCurrencyId", {
      StableAssetPoolToken: dexShare.asStableAssetPoolToken,
    });
  }

  throw new Error("Invalid dex share");
}

export {
  assetToCurrency,
  currencyToAsset,
  tokenIdToAssetId,
  assetIdToTokenId,
  tradingPairToDexShare,
  dexShareToCurrency,
};
