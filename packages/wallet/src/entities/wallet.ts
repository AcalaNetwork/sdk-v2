import invariant from "tiny-invariant";
import { ApiPromise } from "@polkadot/api";
import { Balance, Wallet } from "../types.js";
import { Token, TokenId, UnifyAddress } from "@acala-network/sdk-v2-types";
import { getAccount } from "../utils/get-account.js";
import { Account } from "@acala-network/sdk-v2-types";
import { getRegisteredTokens, getTokenById } from "../utils/get-tokens.js";
import { getBalance } from "../utils/get-balance.js";

export class WalletEntity implements Wallet {
  private readonly api: ApiPromise;

  constructor(api: ApiPromise) {
    invariant(api, "API is required");

    this.api = api
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

  getBalance(token: TokenId, address: UnifyAddress): Promise<Balance> {
    return getBalance(this.api, token, address);
  }
}
