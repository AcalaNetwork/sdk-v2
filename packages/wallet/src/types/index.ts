import {
  Account,
  Token,
  UnifyAddress,
  TokenId,
  TransactionPayload,
} from "@acala-network/sdk-v2-types";
import { UnsubscribePromise } from "@polkadot/api-base/types";
import { TransferParams } from "./extrinsic.js";
import {
  AcalaPrimitivesCurrencyAssetMetadata,
  AcalaPrimitivesCurrencyCurrencyId,
  AcalaPrimitivesCurrencyDexShare,
  FrameSystemAccountInfo,
  OrmlTokensAccountData,
  AcalaPrimitivesCurrencyAssetIds,
} from "@polkadot/types/lookup";

// Type aliases for better readability
export type DexShare = AcalaPrimitivesCurrencyDexShare;
export type CurrencyId = AcalaPrimitivesCurrencyCurrencyId;
export type CurrencyAssetMetadata = AcalaPrimitivesCurrencyAssetMetadata;
export type SystemAccountInfo = FrameSystemAccountInfo;
export type OrmlAccountData = OrmlTokensAccountData;
export type AssetIds = AcalaPrimitivesCurrencyAssetIds;

export interface Balance {
  free: bigint;
  available: bigint;
  locked: bigint;
  reserved: bigint;
}

export interface ExtendedBalance extends Balance {
  dexShare?: boolean;
}

export interface WalletAdapter {
  /**
   * Get account information by address
   * @param address - The address of the account
   */
  getAccount(address: UnifyAddress): Promise<Account>;
  /**
   * Get token information by token id or EVM address
   * @param id - The id of the token or EVM address
   */
  getToken(id: string): Promise<Token>;
  /**
   * Get the list of tokens which are registered in the chain
   */
  getRegisteredTokenList(): Promise<Token[]>;
  /**
   * Get the list of LP tokens
   */
  getLPTokenList(): Promise<Token[]>;
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
  watchBalance(
    token: TokenId,
    address: UnifyAddress,
    callback: (balance: Balance) => void,
  ): UnsubscribePromise;

  /**
   * Get the issuance of the token
   * @param token - The id of the token
   */
  getIssuance(token: TokenId): Promise<bigint>;

  /**
   * Watch the issuance of the token
   * @param token - The id of the token
   * @param callback - The callback function
   */
  watchIssuance(
    token: TokenId,
    callback: (issuance: bigint) => void,
  ): UnsubscribePromise;

  // extrinsic
  transfer: (params: TransferParams) => TransactionPayload;
}
