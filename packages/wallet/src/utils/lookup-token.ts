import { ApiPromise } from "@polkadot/api";
import { TokenId, Token } from "@acala-network/sdk-v2-types";
import { getRegisteredTokens, getTokenById, isTokenId } from "./get-tokens.js";

/**
 * Lookup a token by symbol or id
 * @param api - ApiPromise
 * @param tokenSymbolOrId - token symbol or token id
 */
export async function lookupToken(
  api: ApiPromise,
  tokenSymbolOrId: string,
): Promise<Token> {
  let token: Token | undefined;
  // when the input token starts with 0x, should check if it's a valid token id, otherwise, it's a symbol
  const isValidTokenId = tokenSymbolOrId.startsWith("0x")
    ? isTokenId(api, tokenSymbolOrId)
    : false;

  if (isValidTokenId) {
    token = await getTokenById(api, tokenSymbolOrId as TokenId);
  } else {
    const registeredTokens = await getRegisteredTokens(api);

    token = registeredTokens.find((token) => token.symbol === tokenSymbolOrId);
  }

  if (!token) throw new Error(`Token ${tokenSymbolOrId} not found`);

  return token;
}