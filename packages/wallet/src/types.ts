import { Account, Token, UnifyAddress, TokenId } from "@acala-network/sdk-v2-types";
import { UnsubscribePromise } from "@polkadot/api-base/types";

export interface Balance {
  free: bigint;
  available: bigint;
  locked: bigint;
  reserved: bigint;
}

export interface ExtendedBalance extends Balance {
  dexShare?: boolean;
}

export interface Wallet {
  /**
   * Get account information by address
   * @param address - The address of the account
   */
  getAccount(address: UnifyAddress): Promise<Account>;
  /**
   * Get token information by token id
   * @param id - The id of the token
   */
  getToken(id: TokenId): Promise<Token>;
  /**
   * Get the list of tokens which are registered in the chain
   */
  getRegisteredTokenList(): Promise<Token[]>;
  /**
   * Get the native token
   */
  getNativeToken(): Promise<Token>;
  /**
   * Get the balance of the token
   * @param token - The id of the token
   * @param address - The address of the account
   */
  getBalance(token: TokenId, address: UnifyAddress): Promise<Balance>;

  /**
   * Watch the balance of the token
   * @param token - The id of the token
   * @param address - The address of the account
   * @param callback - The callback function
   */
  watchBalance(token: TokenId, address: UnifyAddress, callback: (balance: Balance) => void): Promise<UnsubscribePromise>;
}
