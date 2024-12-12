import { TokenId, UnifyAddress } from "@acala-network/sdk-v2-types";

export interface TransferParams {
  to: UnifyAddress;
  token: TokenId;
  amount: bigint;
}
