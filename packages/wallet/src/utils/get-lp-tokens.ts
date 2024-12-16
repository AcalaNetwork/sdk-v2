import { Token } from "@acala-network/sdk-v2-types";
import { ApiPromise } from "@polkadot/api";
import { getDexShareToken } from "./get-tokens.js";
import { CurrencyId } from "../types/index.js";
import { tradingPairToDexShare } from "./currency-type-convertor.js";

export async function getLPTokenList(api: ApiPromise): Promise<Token[]> {
  const tradingPairStatuses = await api.query.dex.tradingPairStatuses.entries();

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
