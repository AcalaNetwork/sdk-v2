import { hexToU8a, u8aConcat, u8aEq, u8aFixLength, u8aToHex } from "@polkadot/util";
import { addressEq, blake2AsU8a, decodeAddress, encodeAddress } from "@polkadot/util-crypto";
import { Account, EvmAddress, SubstrateAddress, UnifyAddress } from "@acala-network/sdk-v2-types";
import { ApiPromise } from "@polkadot/api";
import { isHex } from "@polkadot/util";
import { isAddress, getAddress } from "ethers/lib/utils.js";

/**
 * Compute the default evm address from the substrate address
 * @param address - The substrate address
 * @returns The evm address
 */
export const computeDefaultEvmAddress = (address: SubstrateAddress): EvmAddress => {
  const publicKey = decodeAddress(address);
  const isStartWithEvm = u8aEq("evm:", publicKey.slice(0, 4));

  if (isStartWithEvm) {
    return getAddress(u8aToHex(publicKey.slice(4, 24))) as EvmAddress;
  }

  return getAddress(u8aToHex(blake2AsU8a(u8aConcat("evm:", publicKey), 256).slice(0, 20))) as EvmAddress;
};

// NOTE: Since the computeDefaultEvmAddress process is irreversible,
// we cannot determine if an address is a computed EVM address
// Therefore, we cannot implement the isDefaultEvmAddress function
// export function isDefaultEvmAddress(address: EvmAddress): boolean { }

/**
 * Compute the default substrate address from the evm address
 * @param address - The evm address
 * @returns The substrate address
 */
export function computeDefaultSubstrateAddress(address: EvmAddress): SubstrateAddress {
  return encodeAddress(u8aFixLength(u8aConcat("evm:", hexToU8a(address)), 256, true)).toString() as SubstrateAddress;
}

/**
 * Check if the address is a default substrate address
 * @param address - The address
 * @returns True if the address is a default substrate address, false otherwise
 */
export function isDefaultSubstrateAddress(address: SubstrateAddress): boolean {
  const publicKey = decodeAddress(address);
  return u8aEq("evm:", publicKey.slice(0, 4));
}

/**
 * Get the evm address from the default substrate address
 * @param address - The default substrate address
 * @returns The evm address
 */
export function getEvmAddressFromDefaultSubstrateAddress(address: SubstrateAddress): EvmAddress {
  const publicKey = decodeAddress(address);
  return getAddress(u8aToHex(publicKey.slice(4, 24))) as EvmAddress;
}

/**
 * Check if the address is a valid substrate address
 * @param address - The address
 * @returns True if the address is a valid substrate address, false otherwise
 */
export function isValidSubstrateAddress(address: UnifyAddress): boolean {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error: unknown) {
    return false;
  }
}

/**
 * Check if the address is a valid evm address
 * @param address - The address
 * @returns True if the address is a valid evm address, false otherwise
 */
export function isValidEvmAddress(address: UnifyAddress): boolean {
  return isAddress(address);
}

/**
 * Check if two evm addresses are equal
 * @param a - The first evm address
 * @param b - The second evm address
 * @returns True if the two addresses are equal, false otherwise
 */
function isEvmAddressEqual(a: EvmAddress, b: EvmAddress): boolean {
  return getAddress(a) === getAddress(b);
}

/**
 * Format the substrate address to the chain's ss58 format
 * @param api - The api
 * @param address - The substrate address
 * @returns The formatted substrate address
 */
export function formatSubstrateAddress(api: ApiPromise, address: SubstrateAddress): SubstrateAddress {
  const ss58 = api.registry.chainSS58;

  return encodeAddress(decodeAddress(address), ss58) as SubstrateAddress;
}

export async function getAccount(api: ApiPromise, address: UnifyAddress): Promise<Account> {
  const isSubstrateAddress = isValidSubstrateAddress(address);
  const isEvmAddress = isValidEvmAddress(address);

  // if the address is a substrate address, get the bounded evm address
  if (isSubstrateAddress) {
    const input = address as SubstrateAddress;

    // there are two cases:
    // 1. the address is a default substrate address
    // 2. the address is not a default substrate address

    // if the address is a default substrate address, we need to get the evm address
    if (isDefaultSubstrateAddress(input)) {
      return {
        address: input,
        evm: getEvmAddressFromDefaultSubstrateAddress(input),
        isBound: false,
        isDefaultEvm: false,
        isDefaultSubstrate: true,
      };
    }

    // if the address is not a default substrate address, we need to get the bounded evm address
    const boundedEvmAddress = await api.query.evmAccounts.evmAddresses(input);
    const isBound = !(boundedEvmAddress.isEmpty || boundedEvmAddress.isNone);
    const defaultEvmAddress = computeDefaultEvmAddress(input);
    const evmAddress = getAddress(isBound ? boundedEvmAddress.unwrap().toHex() : defaultEvmAddress) as EvmAddress;

    return {
      // NOTE: We need to format the substrate address to the chain's ss58 format
      address: formatSubstrateAddress(api, input),
      evm: evmAddress,
      isBound,
      isDefaultEvm: isEvmAddressEqual(evmAddress, defaultEvmAddress),
      isDefaultSubstrate: false,
    };
  }

  // if the address is a evm address, we need to get the bounded substrate address
  // NOTE: Although the EVM address might be a computed defaultEvmAddress, we cannot verify this.
  // Therefore, we simply ignore this edge case for simplicity.
  if (isEvmAddress) {
    const input = getAddress(address) as EvmAddress;
    const boundedSubstrateAddress = await api.query.evmAccounts.accounts(input);

    const isBound = !(boundedSubstrateAddress.isEmpty || boundedSubstrateAddress.isNone);
    const defaultSubstrateAddress = computeDefaultSubstrateAddress(input);
    const substrateAddress = isBound ? boundedSubstrateAddress.unwrap().toString() : defaultSubstrateAddress;

    return {
      // NOTE: We need to format the substrate address to the chain's ss58 format
      address: formatSubstrateAddress(api, substrateAddress),
      isBound,
      evm: input,
      isDefaultEvm: false,
      isDefaultSubstrate: addressEq(substrateAddress, defaultSubstrateAddress),
    };
  }

  throw new Error("Invalid address");
}
