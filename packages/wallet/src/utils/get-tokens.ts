import { EvmAddress, Token, TokenId } from "@acala-network/sdk-v2-types";
import { ApiPromise } from "@polkadot/api";
import { assetIdToTokenId, tokenIdToAssetId } from "./currency-type-convertor.js";
import { hexToString } from "@polkadot/util";
import { ACALA_EVM_ADDRESS_MAP, KARURA_EVM_ADDRESSES_MAP } from "../configs/evm-address-map.js";
import { getChain } from "./get-chain-info.js";
import { AcalaPrimitivesCurrencyAssetMetadata, AcalaPrimitivesCurrencyCurrencyId } from "@polkadot/types/lookup";

function tryToGetEvmAddress(api: ApiPromise, name: string, symbol: string): EvmAddress | undefined {
  const chain = getChain(api);
  const configs = chain === "acala" ? ACALA_EVM_ADDRESS_MAP : KARURA_EVM_ADDRESSES_MAP;
  const matched = configs.find((item) => item.symbol === symbol);

  if (symbol === "WBTC") {
    if (name === "Wrapped BTC") {
      return "0xc80084af223c8b598536178d9361dc55bfda6818";
    } else if (name === "Wrapped Bitcoin") {
      return "0x0000000000000000000500000000000000000005";
    }
  }

  return matched?.address;
}

function getTokenFromAssetRegistry(api: ApiPromise, id: TokenId, value: AcalaPrimitivesCurrencyAssetMetadata): Token {
  // const token = api.createType<AcalaPrimitivesCurrencyCurrencyId>("AcalaPrimitivesCurrencyCurrencyId", id);
  // const isErc20 = token.isErc20;
  const symbol = hexToString(value.symbol.toString());
  const name = hexToString(value.name.toHex());

  return {
    id,
    name,
    symbol,
    decimals: value.decimals.toNumber(),
    evm: tryToGetEvmAddress(api, name, symbol),
    minimalBalance: value.minimalBalance.toBigInt(),
  };
}

async function getDexShareToken(api: ApiPromise, token: AcalaPrimitivesCurrencyCurrencyId): Promise<Token> {
  if (!token.isDexShare) throw new Error(`The token is not a dex share token: ${token.toHuman()}`);

  const tokens = token.asDexShare;
  const token0 = await getTokenById(api, tokens[0].toHex());
  const token1 = await getTokenById(api, tokens[1].toHex());

  return {
    id: token.toHex(),
    name: `LP ${token0.name}-${token1.name}`,
    symbol: `LP ${token0.symbol}-${token1.symbol}`,
    decimals: token0.decimals,
    evm: tryToGetEvmAddress(api, `LP ${token0.name}-${token1.name}`, `LP_${token0.symbol}_${token1.symbol}`),
    minimalBalance: 0n,
  };
}

/**
 * Get raw token (from asset registry)
 * @param api - ApiPromise
 * @param tokenId - token id
 */
export function getRawToken(api: ApiPromise, tokenId: TokenId): AcalaPrimitivesCurrencyCurrencyId {
  try {
    return api.createType<AcalaPrimitivesCurrencyCurrencyId>("AcalaPrimitivesCurrencyCurrencyId", tokenId);
  } catch (error) {
    throw new Error(`Invalid token ID: ${tokenId}`, { cause: error });
  }
}

export function isTokenId(api: ApiPromise, tokenId: string): boolean {
  try {
    getRawToken(api, tokenId as TokenId);

    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error: unknown) {
    // if the token id is not a valid token id, ignore the error and return false
    return false;
  }
}

/**
 * Get all registered tokens (from asset registry)
 * @param api - ApiPromise
 */
export async function getRegisteredTokens(api: ApiPromise): Promise<Token[]> {
  const list = await api.query.assetRegistry.assetMetadatas.entries();

  return list.map(([key, value]) => {
    return getTokenFromAssetRegistry(api, assetIdToTokenId(api, key.args[0].toHex()), value.unwrap());
  });
}

/**
 * Get token infomation by id (from asset registry)
 * @param api - ApiPromise
 * @param tokenId - token id
 */
export async function getTokenById(api: ApiPromise, tokenId: TokenId): Promise<Token> {
  const rawToken = getRawToken(api, tokenId);

  if (rawToken.isDexShare) {
    return getDexShareToken(api, rawToken);
  }

  const data = await api.query.assetRegistry.assetMetadatas(tokenIdToAssetId(api, tokenId));

  return getTokenFromAssetRegistry(api, rawToken.toHex(), data.unwrap());
}
