import { EvmAddress } from "@acala-network/sdk-v2-types";
import { erc20Abi, PublicClient } from "viem";

/**
 * Get the issuance of an EVM token
 * @param client - PublicClient
 * @param token - EVM address of the token
 */
export function getErc20Issuance(
  client: PublicClient,
  token: EvmAddress,
): Promise<bigint> {
  return client.readContract({
    address: token,
    abi: erc20Abi,
    functionName: "totalSupply",
  });
}

/// This is no Burn or Mint event in ERC20 standard
/// So we don't need to watch it
/// If you want to watch it, please do it manually
/// export function watchErc20Issuance(client: PublicClient, token: EvmAddress, callback: (issuance: bigint) => void): VoidFn {}
