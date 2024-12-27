import { ApiPromise } from "@polkadot/api";
import { getChain } from "./get-chain-info.js";
import { getTokenById } from "./get-tokens.js";
import { TokenId } from "@acala-network/sdk-v2-types";
import { CurrencyId } from "../types/index.js";
import { getTradingPairStatusesEntries } from "./get-lp-tokens.js";
import { cache } from "./cache.js";
import { StorageKey, Option, U32 } from "@polkadot/types";
import { NutsfinanceStableAssetStableAssetPoolInfo } from "@polkadot/types/lookup";

type StableAssetPoolEntries = [
  StorageKey<[U32]>,
  Option<NutsfinanceStableAssetStableAssetPoolInfo>,
][];

async function getStableAssetPoolEntries(
  api: ApiPromise,
): Promise<StableAssetPoolEntries> {
  if (cache.get("stableAssetPools")) {
    return cache.get("stableAssetPools") as StableAssetPoolEntries;
  }

  const value = api.query.stableAsset.pools.entries();

  cache.set("stableAssetPools", value);

  return value;
}

/**
 * Get suggest tokens for the wallet, including native token, ldot liquidity, incentive, dex related tokens
 * @param api - Substrate API
 * @returns Suggest tokens
 */
export async function getSuggestTokens(api: ApiPromise) {
  const suggestTokenIdSet: Set<TokenId> = new Set();

  // native token
  const nativeCurrency = api.consts.currencies.getNativeCurrencyId.toHex();

  suggestTokenIdSet.add(nativeCurrency);

  // ldot/lksm
  const liquidCurrencyId = api.consts.homa.liquidCurrencyId.toHex();
  const stakingCurrencyId = api.consts.homa.stakingCurrencyId.toHex();

  suggestTokenIdSet.add(liquidCurrencyId);
  suggestTokenIdSet.add(stakingCurrencyId);

  // dex related tokens
  const enabledTradingPairList = (await getTradingPairStatusesEntries(api))
    .filter(([, tradingPairStatus]) => tradingPairStatus.isEnabled)
    .map(([pair]) => pair.args[0]);

  for (const tokenPair of enabledTradingPairList) {
    const [token0, token1] = [tokenPair[0].toHex(), tokenPair[1].toHex()];

    suggestTokenIdSet.add(token0);
    suggestTokenIdSet.add(token1);
  }

  const chain = getChain(api);

  // when the chain is acala, we need to add the crowdloan tokens
  if (chain === "acala") {
    // crowdloan tokens
    const liquidCrowdloanCurrencyId = api
      .createType<CurrencyId>("AcalaPrimitivesCurrencyCurrencyId", {
        LiquidCrowdloan: 13,
      })
      .toHex();
    const liquidCrowdloanToken = await getTokenById(
      api,
      liquidCrowdloanCurrencyId,
    );

    suggestTokenIdSet.add(liquidCrowdloanToken.id);
  }

  // insert stable tokens
  const stableAssetsPool = await getStableAssetPoolEntries(api);

  for (const [key] of stableAssetsPool) {
    const poolId = key.args[0].toString();
    const tokenId = api.createType<CurrencyId>(
      "AcalaPrimitivesCurrencyCurrencyId",
      {
        StableAssetPoolToken: poolId,
      },
    );

    suggestTokenIdSet.add(tokenId.toHex());
  }

  return await Promise.all(
    Array.from(suggestTokenIdSet).map((id) => getTokenById(api, id)),
  );
}
