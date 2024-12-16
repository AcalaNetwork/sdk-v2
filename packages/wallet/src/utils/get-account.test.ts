import { describe, it, expect, beforeAll, afterAll } from "vitest";
import {
  computeDefaultEvmAddress,
  computeDefaultSubstrateAddress,
  getEvmAddressFromDefaultSubstrateAddress,
  isDefaultSubstrateAddress,
} from "./get-account.js";
import { ApiPromise, WsProvider } from "@polkadot/api";
import dotenv from "dotenv";
import { formatSubstrateAddress, getAccount } from "./get-account.js";
import { EvmAddress } from "@acala-network/sdk-v2-types";
import { getAddress } from "viem";

dotenv.config({ path: "../../.env" });

describe("getAccount", () => {
  let api: ApiPromise;

  beforeAll(async () => {
    api = await ApiPromise.create({
      provider: new WsProvider(process.env.ACALA_WS_ENDPOINT),
    });
    await api.isReady;
  });

  afterAll(async () => {
    await api.disconnect();
  });

  it("should compute the default evm address", () => {
    const evmAddress = computeDefaultEvmAddress(
      "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    );
    expect(evmAddress).toBe("0x82A258cb20E2ADB4788153cd5eb5839615EcE9a0");
  });

  it("should compute the default substrate address", () => {
    const substrateAddress1 = computeDefaultSubstrateAddress(
      "0x818A6414d1E077b8d344316d5A9339431573c3dC",
    );
    // to ensure that formatted address will not affect the result
    const substrateAddress2 = computeDefaultSubstrateAddress(
      getAddress("0x818A6414d1E077b8d344316d5A9339431573c3dC") as EvmAddress,
    );
    expect(substrateAddress1).toBe(
      "5EMjsczn8bxBoc6qxQR3NMZPRa9Nu4z4LUi5dozEB74qXyrn",
    );
    expect(substrateAddress2).toBe(
      "5EMjsczn8bxBoc6qxQR3NMZPRa9Nu4z4LUi5dozEB74qXyrn",
    );
  });

  it("should check if the address is a default substrate address", () => {
    expect(
      isDefaultSubstrateAddress(
        "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
      ),
    ).toBe(false);
    expect(
      isDefaultSubstrateAddress(
        "5EMjsd1AzSgP46hVW4AYjayfoJydAknw2ATxGwcGazDCSkfZ",
      ),
    ).toBe(true);
  });

  it("should get the evm address from the default substrate address", () => {
    const evmAddress = getEvmAddressFromDefaultSubstrateAddress(
      "5EMjsczn8bxBoc6qxQR3NMZPRa9Nu4z4LUi5dozEB74qXyrn",
    );
    expect(evmAddress).toBe(
      getAddress("0x818A6414d1E077b8d344316d5A9339431573c3dC"),
    );
  });

  it("should get the account info from the substrate address", async () => {
    const address = getAddress("0x46dbcbde55be6cc4ce0c72c8d48bf61eb19d6be0");
    const substrateAddress = formatSubstrateAddress(
      api,
      "25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr",
    );
    const account = await getAccount(api, substrateAddress);

    expect(account.address).toBe(substrateAddress);
    expect(account.evm).toBe(address);
    expect(account.isBound).toBe(true);
    expect(account.isDefaultEvm).toBe(false);
    expect(account.isDefaultSubstrate).toBe(false);
  });

  it("should get the account info from the evm address", async () => {
    const address = getAddress("0x46dbcbde55be6cc4ce0c72c8d48bf61eb19d6be0");
    const substrateAddress = formatSubstrateAddress(
      api,
      "25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr",
    );
    const account = await getAccount(api, address);

    expect(account.address).toBe(substrateAddress);
    expect(account.evm).toBe(address);
    expect(account.isBound).toBe(true);
    expect(account.isDefaultEvm).toBe(false);
    expect(account.isDefaultSubstrate).toBe(false);
  });

  it("should get the account info from the substrate address with unbound evm address", async () => {
    const address = "5CdF5f5YtcA52d9K6dAbvkR3hk5tKuoBFAhiWf47GggaBMPH";
    const substrateAddress = formatSubstrateAddress(api, address);
    const evmAddress = getAddress(computeDefaultEvmAddress(address));
    const account = await getAccount(api, address);

    expect(account.address).toBe(substrateAddress);
    expect(account.evm).toBe(evmAddress);
    expect(account.isBound).toBe(false);
    expect(account.isDefaultEvm).toBe(true);
    expect(account.isDefaultSubstrate).toBe(false);
  });

  it("should get the account info from the evm address with unbound substrate address", async () => {
    const address = "0x818A6414d1E077b8d344316d5A9339431573c3dC";
    const substrateAddress = formatSubstrateAddress(
      api,
      computeDefaultSubstrateAddress(address),
    );
    const formattedEvmAddress = getAddress(address);
    const account = await getAccount(api, address);

    expect(account.address).toBe(substrateAddress);
    expect(account.evm).toBe(formattedEvmAddress);
    expect(account.isBound).toBe(false);
    expect(account.isDefaultEvm).toBe(false);
    expect(account.isDefaultSubstrate).toBe(true);
  });

  it("should error when the address is not a valid substrate address", async () => {
    await expect(
      getAccount(api, "not a valid substrate address"),
    ).rejects.toThrow();
  });
});
