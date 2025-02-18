import { EvmAddress } from "@acala-network/sdk-v2-types";

export const ACALA_EVM_ADDRESS_MAP: { symbol: string; address: EvmAddress }[] =
  [
    {
      symbol: "ACA",
      address: "0x0000000000000000000100000000000000000000",
    },
    {
      symbol: "aSEED",
      address: "0x0000000000000000000100000000000000000001",
    },
    {
      symbol: "TAP",
      address: "0x0000000000000000000100000000000000000004",
    },
    {
      symbol: "LcDOT",
      address: "0x000000000000000000040000000000000000000d",
    },
    {
      symbol: "LDOT",
      address: "0x0000000000000000000100000000000000000003",
    },
    {
      symbol: "DOT",
      address: "0x0000000000000000000100000000000000000002",
    },
    {
      symbol: "GLMR",
      address: "0x0000000000000000000500000000000000000000",
    },
    {
      symbol: "PARA",
      address: "0x0000000000000000000500000000000000000001",
    },
    {
      symbol: "ASTR",
      address: "0x0000000000000000000500000000000000000002",
    },
    {
      symbol: "IBTC",
      address: "0x0000000000000000000500000000000000000003",
    },
    {
      symbol: "INTR",
      address: "0x0000000000000000000500000000000000000004",
    },
    {
      symbol: "WBTC",
      address: "0x0000000000000000000500000000000000000005",
    },
    // NOTE: DONT SUPPORT BUT PLACE HERE FOR ORDER
    // {
    //   symbol: "WETHah",
    //   address: "0x_empty",
    // },
    {
      symbol: "EQ",
      address: "0x0000000000000000000500000000000000000007",
    },
    {
      symbol: "EQD",
      address: "0x0000000000000000000500000000000000000008",
    },
    {
      symbol: "PHA",
      address: "0x0000000000000000000500000000000000000009",
    },
    {
      symbol: "UNQ",
      address: "0x000000000000000000050000000000000000000a",
    },
    {
      symbol: "CRU",
      address: "0x000000000000000000050000000000000000000b",
    },
    {
      symbol: "USDT",
      address: "0x000000000000000000050000000000000000000c",
    },
    {
      symbol: "PINK",
      address: "0x000000000000000000050000000000000000000d",
    },
    {
      symbol: "USDC",
      address: "0x000000000000000000050000000000000000000e",
    },
    {
      symbol: "CFG",
      address: "0x000000000000000000050000000000000000000f",
    },
    {
      symbol: "PDEX",
      address: "0x0000000000000000000500000000000000000010",
    },
    {
      symbol: "HDX",
      address: "0x0000000000000000000500000000000000000011",
    },
    {
      symbol: "LOVA",
      address: "0x0000000000000000000500000000000000000012",
    },
    {
      symbol: "DAMN",
      address: "0x0000000000000000000500000000000000000013",
    },
    {
      symbol: "tDOT",
      address: "0x0000000000000000000300000000000000000000",
    },
    {
      symbol: "LP aSEED-INTR",
      address: "0x0000000000000000000200000000010300000004",
    },
    {
      symbol: "LP DOT-LcDOT",
      address: "0x000000000000000000020000000002020000000d",
    },
    {
      symbol: "LP LDOT-JitoSOL",
      address: "0x00000000000000000002000000000301A7fB0045",
    },
    {
      symbol: "LP ACA-aSEED",
      address: "0x0000000000000000000200000000000000000001",
    },
    {
      symbol: "LP aSEED-LcDOT",
      address: "0x000000000000000000020000000001020000000D",
    },
    {
      symbol: "LP aSEED-IBTC",
      address: "0x0000000000000000000200000000010300000003",
    },
    {
      symbol: "LP ACA-USDCet",
      address: "0x0000000000000000000200000000000107Df96d1",
    },
    {
      symbol: "LP DOT-UNQ",
      address: "0x000000000000000000020000000002030000000a",
    },
    {
      symbol: "LP aSEED-LDOT",
      address: "0x0000000000000000000200000000010000000003",
    },
    {
      symbol: "LP ACA-Nemo",
      address: "0x00000000000000000002000000000001fA904c86",
    },
    {
      symbol: "LP DOT-UNQ",
      address: "0x000000000000000000020000000002030000000a",
    },
  ];

export const KARURA_EVM_ADDRESSES_MAP: {
  symbol: string;
  address: EvmAddress;
}[] = [
  {
    symbol: "KAR",
    address: "0x0000000000000000000100000000000000000080",
  },
  {
    symbol: "KUSD",
    address: "0x0000000000000000000100000000000000000081",
  },
  {
    symbol: "KSM",
    address: "0x0000000000000000000100000000000000000082",
  },
  {
    symbol: "LKSM",
    address: "0x0000000000000000000100000000000000000083",
  },
  {
    symbol: "TAI",
    address: "0x0000000000000000000100000000000000000084",
  },
  {
    symbol: "BNC",
    address: "0x00000000000000000001000000000000000000a8",
  },
  {
    symbol: "VSKSM",
    address: "0x00000000000000000001000000000000000000a9",
  },
  {
    symbol: "PHA",
    address: "0x00000000000000000001000000000000000000aa",
  },
  {
    symbol: "KINT",
    address: "0x00000000000000000001000000000000000000ab",
  },
  {
    symbol: "KBTC",
    address: "0x00000000000000000001000000000000000000ac",
  },
  {
    symbol: "LIT",
    address: "0x0000000000000000000500000000000000000014",
  },
  {
    symbol: "LP_LKSM_KAR",
    address: "0x0000000000000000000200000000800000000083",
  },
  {
    symbol: "LP_QTZ_KAR",
    address: "0x0000000000000000000200000000800300000002",
  },
  {
    symbol: "LP_KAR_KSM",
    address: "0x0000000000000000000200000000800000000082",
  },
  {
    symbol: "LP_KAR_USDCet",
    address: "0x000000000000000000020000000080011f3a1058",
  },
  {
    symbol: "LP_LKSM_KSM",
    address: "0x0000000000000000000200000000820000000083",
  },
  {
    symbol: "LP_RMRK_KSM",
    address: "0x0000000000000000000200000000820300000000",
  },
  {
    symbol: "LP_ARIS_KSM",
    address: "0x0000000000000000000200000000820300000001",
  },
  {
    symbol: "LP_KAR_KUSD",
    address: "0x0000000000000000000200000000800000000081",
  },
  {
    symbol: "LP_KSM_KUSD",
    address: "0x0000000000000000000200000000810000000082",
  },
  {
    symbol: "LP_LKSM_KUSD",
    address: "0x0000000000000000000200000000810000000083",
  },
  {
    symbol: "LP_BNC_KUSD",
    address: "0x00000000000000000002000000008100000000a8",
  },
  {
    symbol: "LP_PHA_KUSD",
    address: "0x00000000000000000002000000008100000000aa",
  },
  {
    symbol: "LP_KINT_KUSD",
    address: "0x00000000000000000002000000008100000000ab",
  },
  {
    symbol: "LP_KBTC_KUSD",
    address: "0x00000000000000000002000000008100000000ac",
  },
  {
    symbol: "LP_RMRK_KUSD",
    address: "0x0000000000000000000200000000810300000000",
  },
  {
    symbol: "LP_QTZ_KUSD",
    address: "0x0000000000000000000200000000810300000002",
  },
  {
    symbol: "LP_CSM_KUSD",
    address: "0x0000000000000000000200000000810300000005",
  },
  {
    symbol: "LP_AIR_KUSD",
    address: "0x000000000000000000020000000081030000000c",
  },
  {
    symbol: "LP_RMRK_TAI",
    address: "0x0000000000000000000200000000840300000000",
  },
  {
    symbol: "SA_KSM",
    address: "0x0000000000000000000300000000000000000000",
  },
  {
    symbol: "SA_3USD",
    address: "0x0000000000000000000300000000000000000001",
  },
  {
    symbol: "FA_RMRK",
    address: "0x0000000000000000000500000000000000000000",
  },
  {
    symbol: "FA_ARIS",
    address: "0x0000000000000000000500000000000000000001",
  },
  {
    symbol: "FA_QTZ",
    address: "0x0000000000000000000500000000000000000002",
  },
  {
    symbol: "FA_MOVR",
    address: "0x0000000000000000000500000000000000000003",
  },
  {
    symbol: "FA_HKO",
    address: "0x0000000000000000000500000000000000000004",
  },
  {
    symbol: "FA_CSM",
    address: "0x0000000000000000000500000000000000000005",
  },
  {
    symbol: "FA_KICO",
    address: "0x0000000000000000000500000000000000000006",
  },
  {
    symbol: "FA_USDT",
    address: "0x0000000000000000000500000000000000000007",
  },
  {
    symbol: "FA_TEER",
    address: "0x0000000000000000000500000000000000000008",
  },
  {
    symbol: "FA_NEER",
    address: "0x0000000000000000000500000000000000000009",
  },
  {
    symbol: "FA_KMA",
    address: "0x000000000000000000050000000000000000000a",
  },
  {
    symbol: "FA_BSX",
    address: "0x000000000000000000050000000000000000000b",
  },
  {
    symbol: "FA_AIR",
    address: "0x000000000000000000050000000000000000000c",
  },
  {
    symbol: "FA_CRAB",
    address: "0x000000000000000000050000000000000000000d",
  },
  {
    symbol: "FA_GENS",
    address: "0x000000000000000000050000000000000000000e",
  },
  {
    symbol: "FA_EQD",
    address: "0x000000000000000000050000000000000000000f",
  },
  {
    symbol: "FA_TUR",
    address: "0x0000000000000000000500000000000000000010",
  },
  {
    symbol: "FA_PCHU",
    address: "0x0000000000000000000500000000000000000011",
  },
  {
    symbol: "FA_SDN",
    address: "0x0000000000000000000500000000000000000012",
  },
  {
    symbol: "FA_LT",
    address: "0x0000000000000000000500000000000000000013",
  },
];
