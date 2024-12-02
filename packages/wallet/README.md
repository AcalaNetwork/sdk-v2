# Wallet

## Install

```bash
pnpm install @polkadot/api @acala-network/wallet-v2
```

## Usage

1. Create a wallet instance

```typescript
import { Wallet } from "@acala-network/wallet-v2";
import { ApiPromise, WsProvider } from "@polkadot/api";

const api = await ApiPromise.create({
  provider: new WsProvider("wss://acala-rpc.polkadot.io"),
});

await api.isReady;

const wallet = new Wallet(api);
```

2. Get account

```typescript
const account = await wallet.getAccount("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY");

console.log(account.address);
console.log(account.evm);
```

3. Get Registered Tokens

```typescript
const tokens = await wallet.getRegisteredTokens();

console.log(JSON.stringify(tokens, null, 2));
```

4. Get Token by Id or Symbol

```typescript
const token = await wallet.getToken("AUSD");

console.log(token.id);
console.log(token.symbol);
console.log(token.decimals);
```

5. Get Balance

```typescript
const balance = await wallet.getBalance("ACA", "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY");

console.log(balance);
```

6. Watch Balance

```typescript
const ubsub = await wallet.watchBalance("ACA", "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY", (balance) => {
  console.log(balance);
  unsub();
});
```
