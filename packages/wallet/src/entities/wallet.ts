import invariant from "tiny-invariant";
import { ApiPromise } from "@polkadot/api";
import { Balance, WalletAdapter } from "../types/index.js";
import { Token, TokenId, UnifyAddress } from "@acala-network/sdk-v2-types";
import { getAccount } from "../utils/get-account.js";
import { Account } from "@acala-network/sdk-v2-types";
import { getRegisteredTokens, getTokenById } from "../utils/get-tokens.js";
import { getBalance, watchBalance } from "../utils/get-balance.js";
import { getIssuance, watchIssuance } from "../utils/get-issuance.js";
import { UnsubscribePromise } from "@polkadot/api-base/types";

interface WalletOptions {
  api: ApiPromise;
  evmRpcUrl?: string;
}

export class Wallet implements WalletAdapter {
  private readonly api: ApiPromise;
  private readonly evmRpcUrl?: string;

  constructor(options: WalletOptions) {
    invariant(options.api, "API is required");
    this.api = options.api;
    this.evmRpcUrl = options.evmRpcUrl;
  }

  getAccount(address: UnifyAddress): Promise<Account> {
    return getAccount(this.api, address);
  }

  getToken(id: TokenId): Promise<Token> {
    return getTokenById(this.api, id);
  }

  getRegisteredTokenList(): Promise<Token[]> {
    return getRegisteredTokens(this.api);
  }

  getNativeToken(): Promise<Token> {
    const nativeAssetId = this.api.consts.currencies.getNativeCurrencyId;

    return getTokenById(this.api, nativeAssetId.toHex());
  }

  getBalance(tokenOrSymbol: TokenId | string, address: UnifyAddress): Promise<Balance> {
    return getBalance(this.api, tokenOrSymbol, address);
  }

  watchBalance(
    tokenOrSymbol: TokenId | string,
    address: UnifyAddress,
    callback: (balance: Balance) => void,
  ): UnsubscribePromise {
    return watchBalance(this.api, tokenOrSymbol, address, callback);
  }

  getIssuance(token: TokenId): Promise<bigint> {
    return getIssuance(this.api, token);
  }

  watchIssuance(token: TokenId, callback: (issuance: bigint) => void): UnsubscribePromise {
    return watchIssuance(this.api, token, callback);
  }
}
