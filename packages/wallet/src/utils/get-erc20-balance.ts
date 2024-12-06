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
  // query the balance first
  getErc20Balance(client, token, address).then((balance) => {
    callback(balance);
  });

  const unwatch = client.watchContractEvent({
    address: token,
    abi: erc20Abi,
    eventName: "Transfer",
    onLogs: (logs) => {
      const shouldUpdate = logs.some(
        (log) => log.args.from === address || log.args.to === address,
      );

      if (shouldUpdate) {
        getErc20Balance(client, token, address).then((balance) => {
          callback(balance);
        });
      }
    },
  });

  return unwatch;
}
