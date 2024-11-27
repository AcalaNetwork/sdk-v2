/**
 * The type of the chain
 */
export type ChainType = "substrate" | "acala-evm";

/**
 * The supported chains
 */
export const CHAINS = ["karura", "acala"] as const;

/**
 * The type of the chain
 */
export type Chain = (typeof CHAINS)[number];
