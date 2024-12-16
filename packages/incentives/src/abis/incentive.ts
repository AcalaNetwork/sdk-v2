export const incentiveAbi = [
  {
    type: "function",
    name: "claimRewards",
    inputs: [
      {
        name: "pool",
        type: "uint8",
        internalType: "enum InterfaceIncentives.PoolId",
      },
      {
        name: "poolCurrencyId",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "depositDexShare",
    inputs: [
      {
        name: "currencyId",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getClaimRewardDeductionRate",
    inputs: [
      {
        name: "pool",
        type: "uint8",
        internalType: "enum InterfaceIncentives.PoolId",
      },
      {
        name: "poolCurrencyId",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getIncentiveRewardAmount",
    inputs: [
      {
        name: "pool",
        type: "uint8",
        internalType: "enum InterfaceIncentives.PoolId",
      },
      {
        name: "poolCurrencyId",
        type: "address",
        internalType: "address",
      },
      {
        name: "rewardCurrencyId",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPendingRewards",
    inputs: [
      {
        name: "currencyIds",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "pool",
        type: "uint8",
        internalType: "enum InterfaceIncentives.PoolId",
      },
      {
        name: "poolCurrencyId",
        type: "address",
        internalType: "address",
      },
      {
        name: "who",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdrawDexShare",
    inputs: [
      {
        name: "currencyId",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "ClaimedRewards",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "pool",
        type: "uint8",
        indexed: true,
        internalType: "enum InterfaceIncentives.PoolId",
      },
      {
        name: "poolCurrencyId",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DepositedShare",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "currencyId",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "WithdrewShare",
    inputs: [
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "currencyId",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;
