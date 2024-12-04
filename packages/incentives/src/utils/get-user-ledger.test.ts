import { ApiPromise, WsProvider } from "@polkadot/api";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import dotenv from "dotenv";
import { getUserACAStakingLedger, watchUserACAStakingLedger } from "./get-user-ledger.js";

dotenv.config({ path: "../../.env" });

describe("get user ledger", () => {
  let api: ApiPromise;

  beforeAll(async () => {
    api = await ApiPromise.create({ provider: new WsProvider(process.env.ACALA_WS_ENDPOINT) });

    await api.isReady;
  });

  afterAll(async () => {
    await api.disconnect();
  });

  it("should return the user ledger", async () => {
    const userLedger = await getUserACAStakingLedger(api, "25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr");

    expect(userLedger).toBeDefined();
    expect(userLedger.totalLocked).toBeGreaterThan(0n);
    expect(userLedger.activeAmount).toBeGreaterThan(0n);
  });

  it("should watch the user ledger", async () => {
    const unsub = await watchUserACAStakingLedger(
      api,
      "25E8NfHMza8XaA7AQvwn1SMFMbk4nZmqmcXF2LbSCurWV2Cr",
      (userLedger) => {
        expect(userLedger).toBeDefined();
        unsub();
      },
    );
  });
});
