import { Token } from "@acala-network/sdk-v2-types";
import { ApiPromise } from "@polkadot/api";
import { getDexShareToken } from "./get-tokens.js";
import { CurrencyId } from "../types/index.js";
import { tradingPairToDexShare } from "./currency-type-convertor.js";
import { cache } from "./cache.js";
import { StorageKey } from "@polkadot/types";
import {
  AcalaPrimitivesTradingPair,
  ModuleDexTradingPairStatus,
} from "@polkadot/types/lookup";

type TradingPairStatusEntries = [
  StorageKey<[AcalaPrimitivesTradingPair]>,
  ModuleDexTradingPairStatus,
][];

export async function getTradingPairStatusesEntries(
  api: ApiPromise,
): Promise<TradingPairStatusEntries> {
  if (cache.get("tradingPairStatuses")) {
    return cache.get("tradingPairStatuses") as TradingPairStatusEntries;
  }

  const value = await api.query.dex.tradingPairStatuses.entries();

  cache.set("tradingPairStatuses", value);

  return value;
}

/**
 * Get LP tokens for the wallet
 * @param api - Substrate API
 * @returns LP tokens
 */
export async function getLPTokenList(api: ApiPromise): Promise<Token[]> {
  const tradingPairStatuses = await getTradingPairStatusesEntries(api);

  const enableTradingPairList = tradingPairStatuses
    .filter(([, tradingPairStatus]) => tradingPairStatus.isEnabled)
    .map(([pair]) => pair.args[0]);

  return Promise.all(
    enableTradingPairList.map((tokenPair) => {
      const lpToken = api.createType<CurrencyId>(
        "AcalaPrimitivesCurrencyCurrencyId",
        {
          DexShare: tradingPairToDexShare(api, tokenPair),
        },
      );

      return getDexShareToken(api, lpToken);
    }),
  );
}
