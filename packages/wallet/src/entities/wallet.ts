import invariant from "tiny-invariant";
import { ApiPromise } from "@polkadot/api";
import { Balance, Wallet } from "../types.js";
import { Token, TokenId, UnifyAddress } from "@acala-network/sdk-v2-types";
import { getAccount } from "../utils/get-account.js";
import { Account } from "@acala-network/sdk-v2-types";
import { getRegisteredTokens, getTokenById } from "../utils/get-tokens.js";
import { getBalance, watchBalance } from "../utils/get-balance.js";
import { UnsubscribePromise } from "@polkadot/api-base/types";

export class WalletEntity implements Wallet {
  private readonly api: ApiPromise;

  constructor(api: ApiPromise) {
    invariant(api, "API is required");

    this.api = api;
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

  getBalance(
    tokenOrSymbol: TokenId | string,
    address: UnifyAddress,
  ): Promise<Balance> {
    return getBalance(this.api, tokenOrSymbol, address);
  }

  watchBalance(
    tokenOrSymbol: TokenId | string,
    address: UnifyAddress,
    callback: (balance: Balance) => void,
  ): Promise<UnsubscribePromise> {
    return watchBalance(this.api, tokenOrSymbol, address, callback);
  }
}
