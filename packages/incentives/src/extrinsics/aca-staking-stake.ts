import { encodeFunctionData } from "viem";
import { earningAbi } from "../abis/earning.js";
import { EARNING_CONTRACT_ADDRESS } from "../constants/contract.js";
import invariant from "tiny-invariant";
import { AcaStakingStakeParams } from "../types/extrinsics.js";
import {
  BaseCreateTxContext,
  TransactionPayload,
} from "@acala-network/sdk-v2-types";

function getSubstrateTxPayload(
  params: AcaStakingStakeParams & BaseCreateTxContext,
) {
  const { api, amount } = params;

  invariant(api, "Substrate API is not set");
  invariant(amount, "Amount is not set");

  return api.tx.earning.bond(amount);
}

function getEvmTxPayload(params: AcaStakingStakeParams) {
  const { amount } = params;
  const contractAddress = EARNING_CONTRACT_ADDRESS;

  invariant(contractAddress, "Earning contract address is not set");

  return {
    to: contractAddress as `0x${string}`,
    data: encodeFunctionData({
      abi: earningAbi,
      functionName: "bond",
      args: [amount],
    }),
    value: 0n,
  };
}

export function getAcaStakingStakeTx(
  context: BaseCreateTxContext,
): (params: AcaStakingStakeParams) => TransactionPayload {
  const { api } = context;

  return (params: AcaStakingStakeParams) => {
    const substrateTxPayload = getSubstrateTxPayload({ api, ...params });
    const evmTxPayload = getEvmTxPayload({ ...params });

    return {
      substrate: substrateTxPayload,
      evm: evmTxPayload,
    };
  };
}
