import invariant from "tiny-invariant";
import { ApiPromise } from "@polkadot/api";
import { hexToString } from '@polkadot/util';
import { AcalaPrimitivesCurrencyAssetMetadata, AcalaPrimitivesCurrencyCurrencyId } from "@polkadot/types/lookup";
import { ACALA_TOKENS } from "../configs/ACALA_TOKENS.js";
import { KARURA_TOKENS } from "../configs/KARURA_TOKENS.js";
import { AccountAddress, Balance, Chain, EvmTokenAddres, Token, TokenId, Wallet } from "../types.js";
import { firstValueFrom } from "rxjs";
import { assetToToken, tokenToAsset } from "../utils/convert-currency-type.js";
import { subscribeNativeTokenBalance, subscribeNonNativeTokenBalance } from "../utils/subscribe-balance.js";

export class WalletEntity implements Wallet {
  private readonly api: ApiPromise;

  constructor(api: ApiPromise) {
    invariant(api, "API is required");

    this.api = api
  }

  get chain(): Chain {
    const runtimeChain = this.api.runtimeChain.toString();

    return runtimeChain.toLowerCase();
  }

  /**
   * When the token is erc20, return the evm token address for then token
   * when the token is not erc20, try to find the token address from the config
   * otherwise, return undefined
   */
  private getEvmTokenAddress(
    symbol: string,
    token: AcalaPrimitivesCurrencyCurrencyId
  ): EvmTokenAddres | undefined {
    if (token.isErc20) return token.asErc20.toHex();

    const config = this.chain === 'acala' ? ACALA_TOKENS : this.chain === 'karura' ? KARURA_TOKENS : [];

    const matched = config.find((item) => item.symbol === symbol);

    if (matched) return matched.address;

    return undefined;
  }

  // Transform the asset metadata to token
  private assetMetadataToToken(token: AcalaPrimitivesCurrencyCurrencyId, info: AcalaPrimitivesCurrencyAssetMetadata) {
    const symbol = hexToString(info.symbol.toHex());
    const evmTokenAddress = this.getEvmTokenAddress(symbol, token);

    return {
      id: token.toHex(),
      name: hexToString(info.name.toHex()),
      symbol: hexToString(info.symbol.toHex()),
      decimals: info.decimals.toNumber(),
      evm: evmTokenAddress,
    }
  }

  /**
   * Return the token information
   * @param id TokenId
   * @returns Promise<Token>
   */
  public async getToken(id: TokenId): Promise<Token> {
    // create the primitive token and convert it to the assetId
    const token = this.api.createType("AcalaPrimitivesCurrencyCurrencyId", id) as unknown as AcalaPrimitivesCurrencyCurrencyId;
    const asset = tokenToAsset(this.api, token);
    // get the metadata of the token
    const metadata = await this.api.query.assetRegistry.assetMetadatas(asset);

    return this.assetMetadataToToken(token, metadata.unwrapOrDefault());
  };

  /**
   * Return the registered token list in the chain
   * @returns Promise<Token[]>
   */
  public async getRegisteredTokenList(): Promise<Token[]> {
    const list = await this.api.query.assetRegistry.assetMetadatas.entries();

    return list.map(([key, value]) => {
      const asset = key.args[0];
      const token = assetToToken(this.api, asset);

      return this.assetMetadataToToken(token, value.unwrapOrDefault());
    });
  }

  /**
   * Return the native token
   * @returns Promise<Token>
   */
  public async getNativeToken(): Promise<Token> {
    return this.getToken(this.getNativeTokenId());
  }

  private getNativeTokenId() {
    return this.api.consts.currencies.getNativeCurrencyId.toHex();
  }

  /**
   * Subscribe the balance of the token
   * @param token TokenId
   * @param address AccountAddress
   * @returns Observable<Balance>
   */
  public balance$(token: TokenId, address: AccountAddress) {
    const nativeTokenId = this.getNativeTokenId();

    if (token === nativeTokenId) {
      return subscribeNativeTokenBalance(this.api, address);
    }

    return subscribeNonNativeTokenBalance(this.api, token, address);
  }

  /**
   * Return the balance of the token
   * @param token TokenId
   * @param address AccountAddress
   * @returns Promise<Balance>
   */
  public async getBalance(token: TokenId, address: AccountAddress): Promise<Balance> {
    return firstValueFrom(this.balance$(token, address));
  }
}
