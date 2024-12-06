import { EvmAddress } from "./account.js";

export type TokenId = `0x${string}`;

export interface Token {
  /**
   * Unique identifier of the token in hex format
   */
  id: TokenId;

  /**
   * Human-readable name of the token
   */
  name: string;

  /**
   * Trading symbol of the token (e.g., "ETH", "BTC")
   */
  symbol: string;

  /**
   * Number of decimal places for token amounts
   * For example: 12 for ACA, 10 for DOT
   */
  decimals: number;

  /**
   * Whether the token is a native token
   */
  isNative: boolean;

  /**
   * Whether the token is a form of EVM token
   * - For native tokens: false
   * - For ERC20 tokens: true
   * will be used to determine the way to get the balance of the token
   */
  isFormEvm: boolean;

  /**
   * EVM contract address for the token
   * - For native tokens: Address of the bridge contract
   * - For ERC20 tokens: Token contract address
   */
  evm?: EvmAddress;

  /**
   * Minimal balance for the token
   */
  minimalBalance?: bigint;
}
