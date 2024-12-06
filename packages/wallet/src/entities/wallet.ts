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
import { createPublicClient, http, PublicClient } from "viem";
import { acala } from "viem/chains";
import { lookupToken } from "../utils/lookup-token.js";

interface WalletOptions {
  api: ApiPromise;
  publicClient?: PublicClient;
}

export class Wallet implements WalletAdapter {
  private readonly api: ApiPromise;
  private readonly publicClient: PublicClient;

  constructor(options: WalletOptions) {
    invariant(options.api, "API is required");

    this.api = options.api;
    this.publicClient =
      options.publicClient ||
      createPublicClient({
        chain: acala,
        transport: http(),
      });
  }

  getAccount(address: UnifyAddress): Promise<Account> {
    return getAccount(this.api, address);
  }

  getToken(id: TokenId): Promise<Token> {
    return lookupToken(this.api, this.publicClient, id);
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
    return getBalance(this.api, this.publicClient, tokenOrSymbol, address);
  }

  watchBalance(
    tokenOrSymbol: TokenId | string,
    address: UnifyAddress,
    callback: (balance: Balance) => void,
  ): UnsubscribePromise {
    return watchBalance(
      this.api,
      this.publicClient,
      tokenOrSymbol,
      address,
      callback,
    );
  }

  getIssuance(token: TokenId): Promise<bigint> {
    return getIssuance(this.api, this.publicClient, token);
  }

  watchIssuance(
    token: TokenId,
    callback: (issuance: bigint) => void,
  ): UnsubscribePromise {
    return watchIssuance(this.api, this.publicClient, token, callback);
  }
}
