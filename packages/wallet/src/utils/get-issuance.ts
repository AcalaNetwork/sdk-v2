import { ApiPromise } from "@polkadot/api";
import { getNativeTokenSymbol } from "./get-chain-info.js";
import { UnsubscribePromise } from "@polkadot/api-base/types";
import { lookupToken } from "./lookup-token.js";

export async function getIssuance(api: ApiPromise, tokenSymbolOrId: string): Promise<bigint> {
  const token = await lookupToken(api, tokenSymbolOrId);

  const nativeToken = getNativeTokenSymbol(api);
  const issuance =
    token.symbol === nativeToken
      ? // for native token, use the issuance of the account
        await api.query.balances.totalIssuance()
      : // for other tokens, use the issuance of the account
        await api.query.tokens.totalIssuance(token.id);

  return issuance.toBigInt();
}

export async function watchIssuance(
  api: ApiPromise,
  tokenSymbolOrId: string,
  callback: (issuance: bigint) => void,
): UnsubscribePromise {
  const token = await lookupToken(api, tokenSymbolOrId);
  const nativeToken = getNativeTokenSymbol(api);

  const unsub =
    token.symbol === nativeToken
      ? // for native token, use the issuance of the account
        api.query.balances.totalIssuance((issuance) => callback(issuance.toBigInt()))
      : // for other tokens, use the issuance of the account
        api.query.tokens.totalIssuance(token.id, (issuance) => callback(issuance.toBigInt()));

  return unsub;
}
