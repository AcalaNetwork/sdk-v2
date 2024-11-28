import { ApiPromise } from "@polkadot/api";
import { Balance } from "../types.js";
import { UnifyAddress, TokenId, Token } from "@acala-network/sdk-v2-types";
import { getAccount } from "./get-account.js";
import { getRegisteredTokens, getTokenById } from "./get-tokens.js";
import { getNativeTokenSymbol } from "./get-chain-info.js";
import { FrameSystemAccountInfo, OrmlTokensAccountData } from "@polkadot/types/lookup";
import { UnsubscribePromise } from "@polkadot/api-base/types";

/**
 * Get the balance of an account
 * @param api - ApiPromise
 * @param tokenSymbolOrId - token symbol or token id
 * @param address - account address
 */
export async function getBalance(
  api: ApiPromise,
  tokenSymbolOrId: string,
  address: UnifyAddress
): Promise<Balance> {
  const account = await getAccount(api, address);
  const isTokenAddress = tokenSymbolOrId.startsWith("0x");

  let token: Token | undefined;

  // if the token is a token address, get the token by id
  if (isTokenAddress) {
    token = await getTokenById(api, tokenSymbolOrId as TokenId);
  } else {
    // if the token is a token symbol, get the token by symbol
    const registeredTokens = await getRegisteredTokens(api);
    token = registeredTokens.find(token => token.symbol === tokenSymbolOrId);
  }

  if (!token) throw new Error(`Token ${tokenSymbolOrId} not found`);

  const nativeToken = getNativeTokenSymbol(api);

  const balance = token.symbol === nativeToken
    // for native token, use the balance of the account
    ? await api.query.system.account(account.address).then(res => res.data)
    // for other tokens, use the balance of the account
    : await api.query.tokens.accounts(account.address, token.id);

  const free = balance.free.toBigInt();
  const locked = balance.frozen.toBigInt();
  const reserved = balance.reserved.toBigInt();
  const available = free - reserved > 0n ? free - reserved : 0n;

  return { free, locked, reserved, available };
}

export async function watchBalance(
  api: ApiPromise,
  tokenSymbolOrId: string,
  address: UnifyAddress,
  callback: (balance: Balance) => void
): Promise<UnsubscribePromise> {
  const account = await getAccount(api, address);
  const isTokenAddress = tokenSymbolOrId.startsWith("0x");

  let token: Token | undefined;

  // if the token is a token address, get the token by id
  if (isTokenAddress) {
    token = await getTokenById(api, tokenSymbolOrId as TokenId);
  } else {
    // if the token is a token symbol, get the token by symbol
    const registeredTokens = await getRegisteredTokens(api);
    token = registeredTokens.find(token => token.symbol === tokenSymbolOrId);
  }

  if (!token) throw new Error(`Token ${tokenSymbolOrId} not found`);
  const nativeToken = getNativeTokenSymbol(api);

  const handleBalanceChange = (balance: FrameSystemAccountInfo['data'] | OrmlTokensAccountData) => {
    const free = balance.free.toBigInt();
    const locked = balance.frozen.toBigInt();
    const reserved = balance.reserved.toBigInt();
    const available = free - reserved > 0n ? free - reserved : 0n;

    callback({ free, locked, reserved, available });
  };

  const unsub = token.symbol === nativeToken
    // for native token, use the balance of the account
    ? api.query.system.account(account.address, (data) => handleBalanceChange(data.data))
    // for other tokens, use the balance of the account
    : api.query.tokens.accounts(account.address, token.id, handleBalanceChange);

  return unsub;
}
