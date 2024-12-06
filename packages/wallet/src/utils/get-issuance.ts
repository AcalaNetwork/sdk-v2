import { ApiPromise } from "@polkadot/api";
import { PublicClient } from "viem";
import { UnsubscribePromise } from "@polkadot/api-base/types";
import { lookupToken } from "./lookup-token.js";
import invariant from "tiny-invariant";
import { getErc20Issuance } from "./get-erc20-issuance.js";

/**
 * Get the issuance of a token
 * @param api - ApiPromise
 * @param publicClient - PublicClient
 * @param tokenSymbolOrId - Symbol or ID of the token
 * @returns Issuance of the token
 */
export async function getIssuance(
  api: ApiPromise,
  publicClient: PublicClient,
  tokenSymbolOrId: string,
): Promise<bigint> {
  const token = await lookupToken(api, publicClient, tokenSymbolOrId);

  // for EVM tokens
  if (token.isFormEvm) {
    invariant(token.evm, "EVM address is not set");

    return await getErc20Issuance(publicClient, token.evm!);
  }

  invariant(token.id, "Token ID is not set");

  // for native tokens in substrate
  if (token.isNative) {
    return await api.query.balances.totalIssuance().then((res) => res.toBigInt());
  }

  // for other tokens in substrate
  return await api.query.tokens.totalIssuance(token.id).then((res) => res.toBigInt());
}

/**
 * Watch the issuance of a token
 * @param api - ApiPromise
 * @param publicClient - PublicClient
 * @param tokenSymbolOrId - Symbol or ID of the token
 * @param callback - Callback function
 * @returns Unsubscribe function
 */
export async function watchIssuance(
  api: ApiPromise,
  publicClient: PublicClient,
  tokenSymbolOrId: string,
  callback: (issuance: bigint) => void,
): UnsubscribePromise {
  const token = await lookupToken(api, publicClient, tokenSymbolOrId);

  // for EVM tokens
  if (token.isFormEvm) {
    invariant(token.evm, "EVM address is not set");

    const issuance = await getErc20Issuance(publicClient, token.evm!);

    callback(issuance);

    return () => {};
  }

  invariant(token.id, "Token ID is not set");

  // for native tokens in substrate
  if (token.isNative) {
    return api.query.balances.totalIssuance((issuance) => callback(issuance.toBigInt()));
  }

  // for other tokens in substrate
  return api.query.tokens.totalIssuance(token.id, (issuance) => callback(issuance.toBigInt()));
}
