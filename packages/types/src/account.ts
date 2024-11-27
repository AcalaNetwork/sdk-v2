export type EvmAddress = `0x${string}`;
export type SubstrateAddress = string;
export type UnifyAddress = EvmAddress | SubstrateAddress;

export interface Account {
  address: SubstrateAddress;
  evm: EvmAddress;
  isBound: boolean;
  isDefaultEvm: boolean;
  isDefaultSubstrate: boolean;
}
