import { encodeFunctionData, erc20Abi } from "viem";
import invariant from "tiny-invariant";
import { BaseCreateTxContext, TransactionPayload } from "@acala-network/sdk-v2-types";
import { TransferParams } from "../types/extrinsic.js";
import { AcalaPrimitivesCurrencyCurrencyId } from "@polkadot/types/lookup";
import { getNativeTokenSymbol } from "../utils/get-chain-info.js";

function getSubstrateTxPayload(params: TransferParams & BaseCreateTxContext) {
  const { api, amount, token, to } = params;

  invariant(api, "Substrate API is not set");
  invariant(amount, "Amount is not set");
  invariant(token, "Token is not set");
  invariant(to, "To address is not set");
  // doesn't need to if token or address is invalid, the extrinsic will throw error

  // get the native token id
  const nativeTokenId = api
    .createType<AcalaPrimitivesCurrencyCurrencyId>("AcalaPrimitivesCurrencyCurrencyId", {
      Token: getNativeTokenSymbol(api),
    })
    .toHex();

  // check if the token is native token, when it is ,should use `balances.transferAllowDeath`,
  // otherwise use `currencies.transfer`
  const isNative = token === nativeTokenId;

  if (isNative) {
    return api.tx.balances.transferAllowDeath(params.to, amount);
  }

  return api.tx.currencies.transfer(to, token, amount);
}

function getEvmTxPayload(params: TransferParams) {
  const { amount, token, to } = params;

  invariant(token, "Token is not set");
  invariant(to, "To address is not set");
  // doesn't need to if token or address is invalid, the extrinsic will throw error

  return {
    to: token as `0x${string}`,
    data: encodeFunctionData({
      abi: erc20Abi,
      functionName: "transfer",
      args: [to as `0x${string}`, amount],
    }),
    value: 0n,
  };
}

export function getTransferTx(context: BaseCreateTxContext): (params: TransferParams) => TransactionPayload {
  const { api } = context;

  return (params: TransferParams) => {
    const substrateTxPayload = getSubstrateTxPayload({ api, ...params });
    const evmTxPayload = getEvmTxPayload({ ...params });

    return {
      substrate: substrateTxPayload,
      evm: evmTxPayload,
    };
  };
}
