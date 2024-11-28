import { ApiPromise } from "@polkadot/api";
import { Balance } from "../types.js";
import { UnifyAddress, TokenId, Token } from "@acala-network/sdk-v2-types";
import { getAccount } from "./get-account.js";
import { getRegisteredTokens, getTokenById, isTokenId } from "./get-tokens.js";
import { getNativeTokenSymbol } from "./get-chain-info.js";
import {
  FrameSystemAccountInfo,
  OrmlTokensAccountData,
} from "@polkadot/types/lookup";
import { UnsubscribePromise } from "@polkadot/api-base/types";

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

/**
 * Format balance from raw data
 * @param data - raw balance data
 */
function formatBalance(
  data: FrameSystemAccountInfo["data"] | OrmlTokensAccountData,
) {
  const free = data.free.toBigInt();
  const locked = data.frozen.toBigInt();
  const reserved = data.reserved.toBigInt();
  const available = free - reserved > 0n ? free - reserved : 0n;

  return { free, locked, reserved, available };
}

/**
 * Get the balance of an account
 * @param api - ApiPromise
 * @param tokenSymbolOrId - token symbol or token id
 * @param address - account address
 */
export async function getBalance(
  api: ApiPromise,
  tokenSymbolOrId: string,
  address: UnifyAddress,
): Promise<Balance> {
  const account = await getAccount(api, address);
  const token = await lookupToken(api, tokenSymbolOrId);

  const nativeToken = getNativeTokenSymbol(api);
  const balance =
    token.symbol === nativeToken
      ? // for native token, use the balance of the account
        await api.query.system
          .account(account.address)
          .then((res) => formatBalance(res.data))
      : // for other tokens, use the balance of the account
        await api.query.tokens
          .accounts(account.address, token.id)
          .then((res) => formatBalance(res));

  return balance;
}

export async function watchBalance(
  api: ApiPromise,
  tokenSymbolOrId: string,
  address: UnifyAddress,
  callback: (balance: Balance) => void,
): Promise<UnsubscribePromise> {
  const account = await getAccount(api, address);
  const token = await lookupToken(api, tokenSymbolOrId);
  const nativeToken = getNativeTokenSymbol(api);

  const handleBalanceChange = (
    balance: FrameSystemAccountInfo["data"] | OrmlTokensAccountData,
  ) => {
    callback(formatBalance(balance));
  };

  const unsub =
    token.symbol === nativeToken
      ? // for native token, use the balance of the account
        api.query.system.account(account.address, (data) =>
          handleBalanceChange(data.data),
        )
      : // for other tokens, use the balance of the account
        api.query.tokens.accounts(
          account.address,
          token.id,
          handleBalanceChange,
        );

  return unsub;
}
