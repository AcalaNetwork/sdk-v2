import { ApiPromise } from "@polkadot/api";
import { Balance } from "../types/index.js";
import { UnifyAddress } from "@acala-network/sdk-v2-types";
import { getAccount } from "./get-account.js";
import { lookupToken } from "./lookup-token.js";
import { FrameSystemAccountInfo, OrmlTokensAccountData } from "@polkadot/types/lookup";
import { UnsubscribePromise } from "@polkadot/api-base/types";
import { PublicClient } from "viem";
import { getErc20Balance, watchErc20Balance } from "./get-erc20-balance.js";
import invariant from "tiny-invariant";

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
export async function getBalance(
  api: ApiPromise,
  publicClient: PublicClient,
  tokenSymbolOrId: string,
  address: UnifyAddress,
): Promise<Balance> {
  const account = await getAccount(api, address);
  const token = await lookupToken(api, publicClient, tokenSymbolOrId);

  // for EVM tokens
  if (token.isFormEvm) {
    invariant(account.evm, "EVM address is not set");

    return getErc20Balance(publicClient, token.evm!, account.evm);
  }

  // for native tokens
  if (token.isNative) {
    invariant(account.address, "Substrate address is not set");

    return api.query.system.account(account.address).then((res) => formatBalance(res.data));
  }

  // for other tokens, use the balance of the account
  return api.query.tokens.accounts(account.address, token.id).then((res) => formatBalance(res));
}

export async function watchBalance(
  api: ApiPromise,
  publicClient: PublicClient,
  tokenSymbolOrId: string,
  address: UnifyAddress,
  callback: (balance: Balance) => void,
): UnsubscribePromise {
  const account = await getAccount(api, address);
  const token = await lookupToken(api, publicClient, tokenSymbolOrId);

  const onChange = (balance: Balance) => {
    callback(balance);
  };

  // for EVM tokens
  if (token.isFormEvm) {
    invariant(account.evm, "EVM address is not set");

    return watchErc20Balance(publicClient, token.evm!, account.evm, onChange);
  }

  invariant(account.address, "Substrate address is not set");

  if (token.isNative) {
    return await api.query.system.account(account.address, (res) => onChange(formatBalance(res.data)));
  }

  return await api.query.tokens.accounts(account.address, token.id, (data) => onChange(formatBalance(data)));
}
