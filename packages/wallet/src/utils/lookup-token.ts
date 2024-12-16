import { ApiPromise } from "@polkadot/api";
import { TokenId, Token, EvmAddress } from "@acala-network/sdk-v2-types";
import {
  getRegisteredTokens,
  isTokenId,
  getERC20Token,
  getTokenById,
} from "./get-tokens.js";
import { PublicClient } from "viem";
import { isValidEvmAddress } from "./get-account.js";
import { getLPTokenList } from "./get-lp-tokens.js";

/**
 * Lookup a token by symbol or id
 * @param api - ApiPromise
 * @param publicClient
 * @param tokenSymbolOrId - token symbol or token id
 */
export async function lookupToken(
  api: ApiPromise,
  publicClient: PublicClient,
  tokenSymbolOrId: string,
): Promise<Token> {
  if (isValidEvmAddress(tokenSymbolOrId)) {
    return getERC20Token(api, publicClient, tokenSymbolOrId as EvmAddress);
  }

  if (isTokenId(api, tokenSymbolOrId)) {
    return getTokenById(api, tokenSymbolOrId as TokenId);
  }

  const [registeredTokens, lpTokens] = await Promise.all([
    getRegisteredTokens(api),
    getLPTokenList(api),
  ]);

  const token =
    registeredTokens.find((token) => token.symbol === tokenSymbolOrId) ||
    registeredTokens.find((token) => token.name === tokenSymbolOrId) ||
    lpTokens.find((token) => token.symbol === tokenSymbolOrId) ||
    lpTokens.find((token) => token.name === tokenSymbolOrId);

  if (!token) throw new Error(`Token ${tokenSymbolOrId} not found`);

  return token;
}
