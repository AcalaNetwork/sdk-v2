import { UnifyAddress } from "@acala-network/sdk-v2-types";
import { ApiPromise } from "@polkadot/api";
import { ACAStakingLedger } from "../types/index.js";
import { UnsubscribePromise } from "@polkadot/api/types";
import { AcalaPrimitivesBondingLedgerBondingLedger } from "@polkadot/types/lookup";
import { getAccount } from "@acala-network/wallet-v2/utils/get-account.js";

function transformData(
  ledger: AcalaPrimitivesBondingLedgerBondingLedger,
): ACAStakingLedger {
  const unlockingList = ledger.unlocking.map((item) => ({
    amount: item.value.toBigInt(),
    at: item.unlockAt.toBigInt(),
  }));
  const unlockingAmount = unlockingList.reduce(
    (acc, item) => acc + item.amount,
    0n,
  );

  return {
    totalLocked: ledger.total.toBigInt(),
    activeAmount: ledger.active.toBigInt(),
    unlockingList,
    unlockingAmount,
  };
}

export const getUserACAStakingLedger = async (
  api: ApiPromise,
  address: UnifyAddress,
): Promise<ACAStakingLedger> => {
  const account = await getAccount(api, address);
  const ledger = (
    await api.query.earning.ledger(account.address)
  ).unwrapOrDefault();

  return transformData(ledger);
};

export const watchUserACAStakingLedger = async (
  api: ApiPromise,
  address: UnifyAddress,
  callback: (ledger: ACAStakingLedger) => void,
): UnsubscribePromise => {
  const account = await getAccount(api, address);

  return api.query.earning.ledger(account.address, (ledger) => {
    callback(transformData(ledger.unwrapOrDefault()));
  });
};
