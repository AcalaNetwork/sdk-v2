import { ApiPromise } from "@polkadot/api";
import { Chain } from "@acala-network/sdk-v2-types";

export const getChain = (api: ApiPromise): Chain => {
  const chain = api.runtimeChain.toString().toLowerCase();

  if (chain === "karura") return "karura";
  if (chain === "acala") return "acala";

  throw new Error(`Unsupported chain: ${chain}`);
}

export const getSS58Format = (api: ApiPromise): number => {
  return parseInt(api.registry.chainSS58?.toString() ?? "42");
}

export const getNativeTokenSymbol = (api: ApiPromise): string => {
  return api.registry.chainTokens[0];
}
