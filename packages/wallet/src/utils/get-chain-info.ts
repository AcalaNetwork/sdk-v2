import { ApiPromise } from "@polkadot/api";
import { Chain, EvmAddress, TokenId } from "@acala-network/sdk-v2-types";
import { tryToGetEvmAddress } from "./get-tokens.js";
import { AcalaPrimitivesCurrencyCurrencyId } from "@polkadot/types/lookup";

export const getChain = (api: ApiPromise): Chain => {
  const chain = api.runtimeChain.toString().toLowerCase();

  if (chain === "karura") return "karura";
  if (chain === "acala") return "acala";

  throw new Error(`Unsupported chain: ${chain}`);
};

export const getSS58Format = (api: ApiPromise): number => {
  return parseInt(api.registry.chainSS58?.toString() ?? "42");
};

export const getNativeTokenSymbol = (api: ApiPromise): string => {
  return api.registry.chainTokens[0];
};

export const getNativeTokenEvmAddress = (api: ApiPromise): EvmAddress => {
  const symbol = getNativeTokenSymbol(api);
  const address = tryToGetEvmAddress(api, symbol, symbol);

  if (!address) throw new Error(`Native token address not found for ${symbol}`);

  return address;
};

export const getNativeTokenId = (api: ApiPromise): TokenId => {
  return api
    .createType<AcalaPrimitivesCurrencyCurrencyId>(
      "AcalaPrimitivesCurrencyCurrencyId",
      {
        Token: getNativeTokenSymbol(api),
      },
    )
    .toHex();
};
