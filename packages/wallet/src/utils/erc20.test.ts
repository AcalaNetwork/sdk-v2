import { describe, it, expect, beforeAll } from "vitest";
import { createPublicClient, http, PublicClient } from "viem";
import { acala } from "viem/chains";
import { getErc20Balance, watchErc20Balance } from "./get-erc20-balance.js";
import { getErc20Issuance } from "./get-erc20-issuance.js";

describe("getErc20Balance", () => {
  let client: PublicClient;

  beforeAll(async () => {
    client = createPublicClient({
      chain: acala,
      transport: http(),
    });
  });

  it("should return the balance of the token", async () => {
    const balance = await getErc20Balance(
      client,
      "0x0000000000000000000100000000000000000000",
      "0x3804e9d3458a667b881f93557a2e267639f28bcf",
    );

    console.log(balance);

    expect(balance.available).toBeGreaterThan(0n);
  });

  it("should watch the balance of the token", async () => {
    const unwatch = watchErc20Balance(
      client,
      "0x0000000000000000000100000000000000000000",
      "0x3804e9d3458a667b881f93557a2e267639f28bcf",
      (balance) => {
        console.log(balance);
        expect(balance.available).toBeGreaterThan(0n);
      },
    );

    setTimeout(() => {
      unwatch();
    }, 1000);
  });

  it("should return the issuance of the token", async () => {
    const issuance = await getErc20Issuance(
      client,
      "0x0000000000000000000100000000000000000000",
    );

    console.log(issuance);

    expect(issuance).toBeGreaterThan(0n);
  });
});
