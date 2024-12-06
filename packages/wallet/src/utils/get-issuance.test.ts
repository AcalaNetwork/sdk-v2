import { ApiPromise, WsProvider } from "@polkadot/api";
import { beforeAll, describe, it, expect, afterAll } from "vitest";
import dotenv from "dotenv";
import { getIssuance, watchIssuance } from "./get-issuance.js";
import { createPublicClient, http, PublicClient } from "viem";
import { acala } from "viem/chains";

dotenv.config({ path: "../../.env" });

describe("getIssuance", () => {
  let api: ApiPromise;
  let publicClient: PublicClient;

  beforeAll(async () => {
    api = await ApiPromise.create({
      provider: new WsProvider(process.env.ACALA_WS_ENDPOINT),
    });
    await api.isReady;

    publicClient = createPublicClient({
      chain: acala,
      transport: http(),
    });
  });

  afterAll(async () => {
    await api.disconnect();
  });

  it("should return the issuance of an account", async () => {
    const issuance = await getIssuance(api, publicClient, "ACA");

    expect(issuance).toBeDefined();
    expect(issuance).toBeGreaterThanOrEqual(0n);
  });

  it("should return the issuance of an account with tokenId", async () => {
    const issuance = await getIssuance(api, publicClient, "0x0000");

    expect(issuance).toBeDefined();
    expect(issuance).toBeGreaterThanOrEqual(0n);
  });

  it("should same result with tokenId and tokenSymbol", async () => {
    const issuance1 = await getIssuance(api, publicClient, "0x0000");
    const issuance2 = await getIssuance(api, publicClient, "ACA");

    expect(issuance1).toBe(issuance2);
  });

  it("should watch issuance change", async () => {
    const issuance1 = await getIssuance(api, publicClient, "ACA");
    const unsubscribe = await watchIssuance(
      api,
      publicClient,
      "ACA",
      (issuance) => {
        expect(issuance).toBe(issuance1);

        unsubscribe();
      },
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  it("should throw error if the token is not found", async () => {
    await expect(
      getIssuance(api, publicClient, "NOT_FOUND"),
    ).rejects.toThrow("Token NOT_FOUND not found");
  });
});
