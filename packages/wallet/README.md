# Wallet

## Install

```bash
pnpm install @polkadot/api @acala-network/wallet-v2
```

## Types

### Token

```typescript
const token: Token = {
  id: "0x0000",
  symbol: "ACA",
  decimals: 12,
  isNative: true,
  isEvm: false,
  evm: "0x0000000000000000000100000000000000000000",
};
```

- `id`: Token ID used in substrate, can be used to query storage in substrate
- `symbol`: Token symbol
- `decimals`: Token decimals
- `isNative`: Whether the token is native token
- `isEvm`: Whether the token is created by EVM
- `evm`: The EVM address of the token

### Account

```typescript
const account: Account = {
  address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  evm: "0x0000000000000000000100000000000000000000",
  isBound: true,
  isDefaultEvm: true,
  isDefaultSubstrate: false,
};
```

- `address`: Substrate address
- `evm`: EVM address
- `isBound`: Whether the account has bound EVM address to substrate address
- `isDefaultEvm`: Whether the account's EVM address is computed from substrate address
- `isDefaultSubstrate`: Whether the account's substrate address is computed from EVM address

### Balance

> Balance is based on substrate balance data structure.  
> For EVM token, set `locked` and `reserved` to 0, and `available` equals to `free`.

```typescript
const balance: Balance = {
  free: 1000000000000000000000000n,
  locked: 0n,
  reserved: 0n,
  available: 1000000000000000000000000n,
};
```

- `free`: Free balance
- `locked`: Locked balance
- `reserved`: Reserved balance
- `available`: Available balance

## Usage

1. Create a wallet instance

```typescript
import { Wallet } from "@acala-network/wallet-v2";
import { ApiPromise, WsProvider } from "@polkadot/api";

const api = await ApiPromise.create({
  provider: new WsProvider("wss://acala-rpc.polkadot.io"),
});

await api.isReady;

const wallet = new Wallet({
  api,
  // optional accept a public client, if not passed, the wallet will also create one
  publicClient: createPublicClient({
    chain: acala,
    transport: http(),
  }),
});
```

2. Get account

```typescript
const account = await wallet.getAccount(
  // accepts EVM address too
  "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
);

console.log(account.address);
console.log(account.evm);
```

3. Get registered tokens

```typescript
const tokens = await wallet.getRegisteredTokenList();

console.log(JSON.stringify(tokens, null, 2));
```

4. Get token by ID or symbol

```typescript
// accepts token ID, EVM address, or symbol
const token = await wallet.getToken("AUSD");

console.log(token.id);
console.log(token.symbol);
console.log(token.decimals);
```

5. Get balance

```typescript
const balance = await wallet.getBalance(
  // accepts token ID, EVM address, or symbol
  "ACA",
  // accepts substrate address or EVM address
  "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
);

console.log(balance);
```

6. Watch balance

```typescript
const unsubscribe = await wallet.watchBalance(
  // accepts token ID, EVM address, or symbol
  "ACA",
  // accepts substrate address or EVM address
  "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  (balance) => {
    console.log(balance);
    unsubscribe();
  },
);
```
