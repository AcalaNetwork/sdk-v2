import { encodeFunctionData, erc20Abi, PublicClient } from "viem";
import invariant from "tiny-invariant";
import {
  BaseCreateTxContext,
  TransactionPayload,
} from "@acala-network/sdk-v2-types";
import { TransferParams } from "../types/extrinsic.js";
import { AcalaPrimitivesCurrencyCurrencyId } from "@polkadot/types/lookup";
import { getNativeTokenSymbol } from "../utils/get-chain-info.js";
import { getAccount } from "../utils/get-account.js";
import { lookupToken } from "../utils/lookup-token.js";

function getSubstrateTxPayload(params: TransferParams & BaseCreateTxContext) {
  const { api, amount, token, to } = params;

  invariant(api, "Substrate API is not set");
  invariant(token, "Token is not set");
  invariant(to, "To address is not set");
  // doesn't need to if token or address is invalid, the extrinsic will throw error

  // get the native token id
  const nativeTokenId = api
    .createType<AcalaPrimitivesCurrencyCurrencyId>(
      "AcalaPrimitivesCurrencyCurrencyId",
      {
        Token: getNativeTokenSymbol(api),
      },
    )
    .toHex();

  // check if the token is native token, when it is ,should use `balances.transferAllowDeath`,
  // otherwise use `currencies.transfer`
  const isNative = token === nativeTokenId;

  if (isNative) {
    return api.tx.balances.transferAllowDeath(params.to, amount);
  }

  return api.tx.currencies.transfer(to, token, amount);
}

function getEvmTxPayload(params: TransferParams & BaseCreateTxContext) {
  const { amount, token, to, api } = params;

  invariant(token, "Token is not set");
  invariant(to, "To address is not set");
  // doesn't need to if token or address is invalid, the extrinsic will throw error

  const nativeTokenId = api
    .createType<AcalaPrimitivesCurrencyCurrencyId>(
      "AcalaPrimitivesCurrencyCurrencyId",
      {
        Token: getNativeTokenSymbol(api),
      },
    )
    .toHex();

  const isNative = token === nativeTokenId;

  if (isNative) {
    return {
      to: to as `0x${string}`,
      data: "0x" as `0x${string}`,
      value: amount,
    };
  }

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

export function getTransferTx(
  context: BaseCreateTxContext & { publicClient: PublicClient },
): (params: TransferParams) => Promise<TransactionPayload> {
  const { api, publicClient } = context;

  return async (params: TransferParams) => {
    const { to, token, amount } = params;
    const toAccount = await getAccount(api, to);
    const tokenData = await lookupToken(api, publicClient, token);

    invariant(toAccount, "To account is not found");
    invariant(tokenData, "Token is not found");

    const substrateTxPayload = getSubstrateTxPayload({
      api,
      to,
      token: tokenData.id,
      amount,
    });
    const evmTxPayload = tokenData.evm
      ? getEvmTxPayload({
          api,
          to: toAccount.evm,
          token: tokenData.evm,
          amount,
        })
      : undefined;

    return {
      substrate: substrateTxPayload,
      evm: evmTxPayload,
    };
  };
}
