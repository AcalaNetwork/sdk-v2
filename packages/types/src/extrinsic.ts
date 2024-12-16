import { SubmittableExtrinsic } from "@polkadot/api/types";
import { EvmAddress } from "./account.js";
import { ApiPromise } from "@polkadot/api";

export type TransactionType = "evm" | "substrate";

export type SubstrateTxPayload = SubmittableExtrinsic<"promise">;

export type BaseCreateTxContext = {
  api: ApiPromise;
};

// Return the necessary params to create a evm transaction
// User can use the params to create a transaction with their own signer
export type EvmTxPayload = {
  to: EvmAddress;
  data: `0x${string}`;
  value: bigint;
};

// The payload of the transaction for both substrate and evm
export type TransactionPayload = {
  substrate: SubstrateTxPayload;
  evm: EvmTxPayload;
};
