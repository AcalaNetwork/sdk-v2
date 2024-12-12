import { encodeFunctionData } from "viem";
import { earningAbi } from "../abis/earning.js";
import { EARNING_CONTRACT_ADDRESS } from "../constants/contract.js";
import invariant from "tiny-invariant";
import {
  BaseCreateTxContext,
  TransactionPayload,
} from "@acala-network/sdk-v2-types";

function getSubstrateTxPayload(params: BaseCreateTxContext) {
  const { api } = params;

  invariant(api, "Substrate API is not set");

  return api.tx.earning.withdrawUnbonded();
}

function getEvmTxPayload() {
  const contractAddress = EARNING_CONTRACT_ADDRESS;

  invariant(contractAddress, "Earning contract address is not set");

  return {
    to: contractAddress as `0x${string}`,
    data: encodeFunctionData({
      abi: earningAbi,
      functionName: "withdrawUnbonded",
      args: [],
    }),
    value: 0n,
  };
}

export function getAcaStakingWithdrawUnstakedTx(
  context: BaseCreateTxContext,
): () => TransactionPayload {
  const { api } = context;

  return () => {
    const substrateTxPayload = getSubstrateTxPayload({ api });
    const evmTxPayload = getEvmTxPayload();

    return {
      substrate: substrateTxPayload,
      evm: evmTxPayload,
    };
  };
}
