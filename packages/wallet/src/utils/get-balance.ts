import { ApiPromise } from "@polkadot/api";
import { Balance } from "../types/index.js";
import { UnifyAddress } from "@acala-network/sdk-v2-types";
import { getAccount } from "./get-account.js";
import { lookupToken } from "./lookup-token.js";
import { getNativeTokenSymbol } from "./get-chain-info.js";
import { FrameSystemAccountInfo, OrmlTokensAccountData } from "@polkadot/types/lookup";
import { UnsubscribePromise } from "@polkadot/api-base/types";

/**
 * Format balance from raw data
 * @param data - raw balance data
 */
function formatBalance(data: FrameSystemAccountInfo["data"] | OrmlTokensAccountData) {
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
export async function getBalance(api: ApiPromise, tokenSymbolOrId: string, address: UnifyAddress): Promise<Balance> {
  const account = await getAccount(api, address);
  const token = await lookupToken(api, tokenSymbolOrId);

  const nativeToken = getNativeTokenSymbol(api);
  const balance =
    token.symbol === nativeToken
      ? // for native token, use the balance of the account
        await api.query.system.account(account.address).then((res) => formatBalance(res.data))
      : // for other tokens, use the balance of the account
        await api.query.tokens.accounts(account.address, token.id).then((res) => formatBalance(res));

  return balance;
}

export async function watchBalance(
  api: ApiPromise,
  tokenSymbolOrId: string,
  address: UnifyAddress,
  callback: (balance: Balance) => void,
): UnsubscribePromise {
  const account = await getAccount(api, address);
  const token = await lookupToken(api, tokenSymbolOrId);
  const nativeToken = getNativeTokenSymbol(api);

  const handleBalanceChange = (balance: FrameSystemAccountInfo["data"] | OrmlTokensAccountData) => {
    callback(formatBalance(balance));
  };

  const unsub =
    token.symbol === nativeToken
      ? // for native token, use the balance of the account
        api.query.system.account(account.address, (data) => handleBalanceChange(data.data))
      : // for other tokens, use the balance of the account
        api.query.tokens.accounts(account.address, token.id, handleBalanceChange);

  return unsub;
}
