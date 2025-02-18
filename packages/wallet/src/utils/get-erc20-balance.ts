import { EvmAddress } from "@acala-network/sdk-v2-types";
import { VoidFn } from "@polkadot/api-base/types";
import { erc20Abi, PublicClient } from "viem";
import { Balance } from "../types/index.js";

function formatBalance(balance: bigint): Balance {
  return {
    free: balance,
    locked: 0n,
    reserved: 0n,
    available: balance,
  };
}

/**
 * Get the balance of an EVM token
 * @param client - PublicClient
 * @param token - EVM address of the token
 * @param address - EVM address of the account
 */
export function getErc20Balance(
  client: PublicClient,
  token: EvmAddress,
  address: EvmAddress,
): Promise<Balance> {
  return client
    .readContract({
      address: token,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [address],
    })
    .then(formatBalance);
}

/**
 * Watch the balance of an EVM token
 * @param client - PublicClient
 * @param token - EVM address of the token
 * @param address - EVM address of the account
 */
export function watchErc20Balance(
  client: PublicClient,
  token: EvmAddress,
  address: EvmAddress,
  callback: (balance: Balance) => void,
): VoidFn {
  const executor = () => getErc20Balance(client, token, address).then(callback);

  // query the balance first
  executor().catch((error) => {
    throw error;
  });

  // watch the balance
  const unwatch = client.watchContractEvent({
    address: token,
    abi: erc20Abi,
    eventName: "Transfer",
    onLogs: (logs) => {
      const shouldUpdate = logs.some(
        // check if the log is related to the account
        (log) =>
          log.args.from?.toLowerCase() === address.toLowerCase() ||
          log.args.to?.toLowerCase() === address.toLowerCase(),
      );

      if (shouldUpdate) {
        executor().catch((error) => {
          console.error(`Error updating ${token} balance`, error);
          throw error;
        });
      }
    },
  });

  return unwatch;
}
