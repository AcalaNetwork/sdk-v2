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
