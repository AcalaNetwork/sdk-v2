import { ApiPromise, ApiRx } from "@polkadot/api";
import { AcalaPrimitivesCurrencyCurrencyId } from "@polkadot/types/lookup";
import { Balance, TokenId } from "../types.js";
import { UnifyAddress } from "@acala-network/sdk-v2-types";
import { getAccount } from "./get-account.js";
import { getTokenById } from "./get-tokens.js";


export async function getBalance(api: ApiPromise, tokenId: TokenId, address: UnifyAddress): Promise<Balance> {
  const account = await getAccount(api, address);
  const token = getTokenById(api, tokenId);
}
