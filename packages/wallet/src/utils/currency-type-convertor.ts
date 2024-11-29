import { TokenId } from "@acala-network/sdk-v2-types";
import { ApiPromise, ApiRx } from "@polkadot/api";
import {
  AcalaPrimitivesCurrencyAssetIds,
  AcalaPrimitivesCurrencyCurrencyId,
} from "@polkadot/types/lookup";
import { HexString } from "@polkadot/util/types";

// Convert the AcalaPrimitiveCurrencyAssetIds to AcalaPrimitivesCurrencyCurrencyId
function assetToToken(
  api: ApiPromise | ApiRx,
  asset: AcalaPrimitivesCurrencyAssetIds,
): AcalaPrimitivesCurrencyCurrencyId {
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
function tokenToAsset(
  api: ApiPromise | ApiRx,
  token: AcalaPrimitivesCurrencyCurrencyId,
): AcalaPrimitivesCurrencyAssetIds {
  try {
    if (token.isErc20) {
      return api.createType("AcalaPrimitivesCurrencyAssetIds", {
        Erc20: token.asErc20,
      });
    }

    if (token.isForeignAsset) {
      return api.createType("AcalaPrimitivesCurrencyAssetIds", {
        ForeignAssetId: token.asForeignAsset,
      });
    }

    if (token.isStableAssetPoolToken) {
      return api.createType("AcalaPrimitivesCurrencyAssetIds", {
        StableAssetId: token.asStableAssetPoolToken,
      });
    }

    if (token.isToken || token.isLiquidCrowdloan) {
      return api.createType("AcalaPrimitivesCurrencyAssetIds", {
        NativeAssetId: token.toHex(),
      });
    }

    throw new Error(`Invalid token: ${token.toHex()}`);
  } catch (e: unknown) {
    throw new Error("Token to asset conversion failed", { cause: e });
  }
}

// Convert the tokenId to assetId
function tokenIdToAssetId(api: ApiPromise | ApiRx, tokenId: string): HexString {
  const token = api.createType<AcalaPrimitivesCurrencyCurrencyId>(
    "AcalaPrimitivesCurrencyCurrencyId",
    tokenId,
  );

  return tokenToAsset(api, token).toHex();
}

// Convert the assetId to tokenId
function assetIdToTokenId(api: ApiPromise | ApiRx, assetId: string): TokenId {
  const asset = api.createType<AcalaPrimitivesCurrencyAssetIds>(
    "AcalaPrimitivesCurrencyAssetIds",
    assetId,
  );

  return assetToToken(api, asset).toHex();
}

export { assetToToken, tokenToAsset, tokenIdToAssetId, assetIdToTokenId };
