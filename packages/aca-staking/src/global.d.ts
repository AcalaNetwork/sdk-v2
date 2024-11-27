/* eslint-disable */

import '@polkadot/api-base/types/storage';
import type { ApiTypes, AugmentedQuery, QueryableStorageEntry } from '@polkadot/api-base/types';
import type { BTreeMap, BTreeSet, Bytes, Null, Option, Struct, U256, U8aFixed, Vec, bool, u128, u16, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H160, H256 } from '@polkadot/types/interfaces/runtime';
import type { AcalaPrimitivesBondingLedgerBondingLedger, AcalaPrimitivesCurrencyAssetIds, AcalaPrimitivesCurrencyAssetMetadata, AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesPosition, AcalaPrimitivesTradingPair, AcalaRuntimeRuntimeHoldReason, AcalaRuntimeRuntimeParametersKey, AcalaRuntimeRuntimeParametersValue, AcalaRuntimeScheduledTasks, AcalaRuntimeSessionKeys, CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot, CumulusPalletParachainSystemUnincludedSegmentAncestor, CumulusPalletParachainSystemUnincludedSegmentSegmentTracker, CumulusPalletXcmpQueueOutboundChannelDetails, CumulusPalletXcmpQueueQueueConfigData, CumulusPrimitivesCoreAggregateMessageOrigin, FrameSupportDispatchPerDispatchClassWeight, FrameSupportPreimagesBounded, FrameSupportTokensMiscIdAmount, FrameSystemAccountInfo, FrameSystemCodeUpgradeAuthorization, FrameSystemEventRecord, FrameSystemLastRuntimeUpgradeInfo, FrameSystemPhase, ModuleAuctionManagerCollateralAuctionItem, ModuleCdpEngineRiskManagementParams, ModuleDexTradingPairStatus, ModuleEvmModuleAccountInfo, ModuleEvmModuleCodeInfo, ModuleHomaModuleStakingLedger, ModuleHomaValidatorListGuarantee, ModuleHomaValidatorListValidatorBacking, ModuleSupportDexAggregatedSwapPath, ModuleSupportIncentivesPoolId, ModuleTransactionPaymentModuleChargeFeeMethod, ModuleXcmInterfaceModuleXcmInterfaceOperation, NutsfinanceStableAssetStableAssetPoolInfo, OrmlNftClassInfo, OrmlNftTokenInfo, OrmlOracleModuleTimestampedValue, OrmlRewardsPoolInfo, OrmlTokensAccountData, OrmlTokensBalanceLock, OrmlTokensReserveData, OrmlTraitsAuctionAuctionInfo, OrmlVestingVestingSchedule, PalletBalancesAccountData, PalletBalancesBalanceLock, PalletBalancesReserveData, PalletBountiesBounty, PalletCollectiveVotes, PalletDemocracyMetadataOwner, PalletDemocracyReferendumInfo, PalletDemocracyVoteThreshold, PalletDemocracyVoteVoting, PalletMessageQueueBookState, PalletMessageQueuePage, PalletMultisigMultisig, PalletPreimageOldRequestStatus, PalletPreimageRequestStatus, PalletProxyAnnouncement, PalletProxyProxyDefinition, PalletSchedulerRetryConfig, PalletSchedulerScheduled, PalletTipsOpenTip, PalletTreasuryProposal, PalletTreasurySpendStatus, PalletXcmQueryStatus, PalletXcmRemoteLockedFungibleRecord, PalletXcmVersionMigrationStage, PolkadotCorePrimitivesOutboundHrmpMessage, PolkadotPrimitivesV7AbridgedHostConfiguration, PolkadotPrimitivesV7PersistedValidationData, PolkadotPrimitivesV7UpgradeGoAhead, PolkadotPrimitivesV7UpgradeRestriction, SpConsensusAuraSr25519AppSr25519Public, SpCoreCryptoKeyTypeId, SpRuntimeDigest, SpTrieStorageProof, SpWeightsWeightV2Weight, StagingXcmV3MultiLocation, StagingXcmV4Instruction, StagingXcmV4Location, XcmVersionedAssetId, XcmVersionedLocation } from '@polkadot/types/lookup';
import type { Observable } from '@polkadot/types/types';
export type __AugmentedQuery<ApiType extends ApiTypes> = AugmentedQuery<ApiType, () => unknown>;
export type __QueryableStorageEntry<ApiType extends ApiTypes> = QueryableStorageEntry<ApiType>;
declare module '@polkadot/api-base/types/storage' {
  interface AugmentedQueries<ApiType extends ApiTypes> {
    acalaOracle: {
      hasDispatched: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      rawValues: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<Option<OrmlOracleModuleTimestampedValue>>, [AccountId32, AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId]>;
      values: AugmentedQuery<ApiType, (arg: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<Option<OrmlOracleModuleTimestampedValue>>, [AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyCurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    aggregatedDex: {
      aggregatedSwapPaths: AugmentedQuery<ApiType, (arg: ITuple<[AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]> | [AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array, AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array]) => Observable<Option<Vec<ModuleSupportDexAggregatedSwapPath>>>, [ITuple<[AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]>]> & QueryableStorageEntry<ApiType, [ITuple<[AcalaPrimitivesCurrencyCurrencyId, AcalaPrimitivesCurrencyCurrencyId]>]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    assetRegistry: {
      assetMetadatas: AugmentedQuery<ApiType, (arg: AcalaPrimitivesCurrencyAssetIds | {
        Erc20: any;
      } | {
        StableAssetId: any;
      } | {
        ForeignAssetId: any;
      } | {
        NativeAssetId: any;
      } | string | Uint8Array) => Observable<Option<AcalaPrimitivesCurrencyAssetMetadata>>, [AcalaPrimitivesCurrencyAssetIds]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyAssetIds]>;
      erc20IdToAddress: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<H160>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      foreignAssetLocations: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<Option<StagingXcmV3MultiLocation>>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      locationToCurrencyIds: AugmentedQuery<ApiType, (arg: StagingXcmV3MultiLocation | {
        parents?: any;
        interior?: any;
      } | string | Uint8Array) => Observable<Option<AcalaPrimitivesCurrencyCurrencyId>>, [StagingXcmV3MultiLocation]> & QueryableStorageEntry<ApiType, [StagingXcmV3MultiLocation]>;
      nextForeignAssetId: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      nextStableAssetId: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    auction: {
      auctionEndTime: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: u32 | AnyNumber | Uint8Array) => Observable<Option<Null>>, [u32, u32]> & QueryableStorageEntry<ApiType, [u32, u32]>;
      auctions: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<OrmlTraitsAuctionAuctionInfo>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      auctionsIndex: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    auctionManager: {
      collateralAuctions: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<ModuleAuctionManagerCollateralAuctionItem>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      totalCollateralInAuction: AugmentedQuery<ApiType, (arg: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<u128>, [AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyCurrencyId]>;
      totalTargetInAuction: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    aura: {
      authorities: AugmentedQuery<ApiType, () => Observable<Vec<SpConsensusAuraSr25519AppSr25519Public>>, []> & QueryableStorageEntry<ApiType, []>;
      currentSlot: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    auraExt: {
      authorities: AugmentedQuery<ApiType, () => Observable<Vec<SpConsensusAuraSr25519AppSr25519Public>>, []> & QueryableStorageEntry<ApiType, []>;
      slotInfo: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[u64, u32]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    authority: {
      nextTaskIndex: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      savedCalls: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<ITuple<[Call, Option<AccountId32>]>>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    authorship: {
      author: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    balances: {
      account: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<PalletBalancesAccountData>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      freezes: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<FrameSupportTokensMiscIdAmount>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      holds: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<{
        readonly id: AcalaRuntimeRuntimeHoldReason;
        readonly amount: u128;
      } & Struct>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      inactiveIssuance: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      locks: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesBalanceLock>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      reserves: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesReserveData>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      totalIssuance: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    bounties: {
      bounties: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletBountiesBounty>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      bountyApprovals: AugmentedQuery<ApiType, () => Observable<Vec<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      bountyCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      bountyDescriptions: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<Bytes>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    cdpEngine: {
      collateralParams: AugmentedQuery<ApiType, (arg: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<Option<ModuleCdpEngineRiskManagementParams>>, [AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyCurrencyId]>;
      debitExchangeRate: AugmentedQuery<ApiType, (arg: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<Option<u128>>, [AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyCurrencyId]>;
      lastAccumulationSecs: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      liquidationContracts: AugmentedQuery<ApiType, () => Observable<Vec<H160>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    cdpTreasury: {
      debitOffsetBuffer: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      debitPool: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      expectedCollateralAuctionSize: AugmentedQuery<ApiType, (arg: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<u128>, [AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyCurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    collatorSelection: {
      candidacyBond: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      candidates: AugmentedQuery<ApiType, () => Observable<BTreeSet<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      desiredCandidates: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      invulnerables: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      nonCandidates: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<u32>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      sessionPoints: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<u32>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    democracy: {
      blacklist: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<ITuple<[u32, Vec<AccountId32>]>>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      cancellations: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<bool>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      depositOf: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<ITuple<[Vec<AccountId32>, u128]>>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      lastTabledWasExternal: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      lowestUnbaked: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      metadataOf: AugmentedQuery<ApiType, (arg: PalletDemocracyMetadataOwner | {
        External: any;
      } | {
        Proposal: any;
      } | {
        Referendum: any;
      } | string | Uint8Array) => Observable<Option<H256>>, [PalletDemocracyMetadataOwner]> & QueryableStorageEntry<ApiType, [PalletDemocracyMetadataOwner]>;
      nextExternal: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[FrameSupportPreimagesBounded, PalletDemocracyVoteThreshold]>>>, []> & QueryableStorageEntry<ApiType, []>;
      publicPropCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      publicProps: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[u32, FrameSupportPreimagesBounded, AccountId32]>>>, []> & QueryableStorageEntry<ApiType, []>;
      referendumCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      referendumInfoOf: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletDemocracyReferendumInfo>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      votingOf: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<PalletDemocracyVoteVoting>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    dex: {
      initialShareExchangeRates: AugmentedQuery<ApiType, (arg: AcalaPrimitivesTradingPair) => Observable<ITuple<[u128, u128]>>, [AcalaPrimitivesTradingPair]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesTradingPair]>;
      liquidityPool: AugmentedQuery<ApiType, (arg: AcalaPrimitivesTradingPair) => Observable<ITuple<[u128, u128]>>, [AcalaPrimitivesTradingPair]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesTradingPair]>;
      provisioningPool: AugmentedQuery<ApiType, (arg1: AcalaPrimitivesTradingPair, arg2: AccountId32 | string | Uint8Array) => Observable<ITuple<[u128, u128]>>, [AcalaPrimitivesTradingPair, AccountId32]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesTradingPair, AccountId32]>;
      tradingPairStatuses: AugmentedQuery<ApiType, (arg: AcalaPrimitivesTradingPair) => Observable<ModuleDexTradingPairStatus>, [AcalaPrimitivesTradingPair]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesTradingPair]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    dexOracle: {
      averagePrices: AugmentedQuery<ApiType, (arg: AcalaPrimitivesTradingPair) => Observable<Option<ITuple<[u128, u128, U256, U256, u64, u64]>>>, [AcalaPrimitivesTradingPair]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesTradingPair]>;
      cumulatives: AugmentedQuery<ApiType, (arg: AcalaPrimitivesTradingPair) => Observable<ITuple<[U256, U256, u64]>>, [AcalaPrimitivesTradingPair]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesTradingPair]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    earning: {
      ledger: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<AcalaPrimitivesBondingLedgerBondingLedger>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    emergencyShutdown: {
      canRefund: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      isShutdown: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    evm: {
      accounts: AugmentedQuery<ApiType, (arg: H160 | string | Uint8Array) => Observable<Option<ModuleEvmModuleAccountInfo>>, [H160]> & QueryableStorageEntry<ApiType, [H160]>;
      accountStorages: AugmentedQuery<ApiType, (arg1: H160 | string | Uint8Array, arg2: H256 | string | Uint8Array) => Observable<H256>, [H160, H256]> & QueryableStorageEntry<ApiType, [H160, H256]>;
      chainId: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      codeInfos: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<ModuleEvmModuleCodeInfo>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      codes: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Bytes>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      contractStorageSizes: AugmentedQuery<ApiType, (arg: H160 | string | Uint8Array) => Observable<u32>, [H160]> & QueryableStorageEntry<ApiType, [H160]>;
      extrinsicOrigin: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      networkContractIndex: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      xcmOrigin: AugmentedQuery<ApiType, () => Observable<Option<Vec<AccountId32>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    evmAccounts: {
      accounts: AugmentedQuery<ApiType, (arg: H160 | string | Uint8Array) => Observable<Option<AccountId32>>, [H160]> & QueryableStorageEntry<ApiType, [H160]>;
      evmAddresses: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<H160>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    financialCouncil: {
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      proposalOf: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<Call>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<H256>>, []> & QueryableStorageEntry<ApiType, []>;
      voting: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<PalletCollectiveVotes>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    financialCouncilMembership: {
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    generalCouncil: {
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      proposalOf: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<Call>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<H256>>, []> & QueryableStorageEntry<ApiType, []>;
      voting: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<PalletCollectiveVotes>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    generalCouncilMembership: {
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    homa: {
      bumpEraFrequency: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      commissionRate: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      estimatedRewardRatePerEra: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      fastMatchFeeRate: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      lastEraBumpedBlock: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      nominateIntervalEra: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      redeemRequests: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<ITuple<[u128, bool]>>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      relayChainCurrentEra: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      softBondedCapPerSubAccount: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      stakingLedgers: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<Option<ModuleHomaModuleStakingLedger>>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      toBondPool: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      totalStakingBonded: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      totalVoidLiquid: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      unbondings: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: u32 | AnyNumber | Uint8Array) => Observable<u128>, [AccountId32, u32]> & QueryableStorageEntry<ApiType, [AccountId32, u32]>;
      unclaimedRedemption: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    homaCouncil: {
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      proposalOf: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<Call>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<H256>>, []> & QueryableStorageEntry<ApiType, []>;
      voting: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<PalletCollectiveVotes>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    homaCouncilMembership: {
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    homaValidatorList: {
      guarantees: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<Option<ModuleHomaValidatorListGuarantee>>, [AccountId32, AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32, AccountId32]>;
      totalLockedByGuarantor: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<u128>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      validatorBackings: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<ModuleHomaValidatorListValidatorBacking>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    honzon: {
      authorization: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: ITuple<[AcalaPrimitivesCurrencyCurrencyId, AccountId32]> | [AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array, AccountId32 | string | Uint8Array]) => Observable<Option<u128>>, [AccountId32, ITuple<[AcalaPrimitivesCurrencyCurrencyId, AccountId32]>]> & QueryableStorageEntry<ApiType, [AccountId32, ITuple<[AcalaPrimitivesCurrencyCurrencyId, AccountId32]>]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    idleScheduler: {
      nextTaskId: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      previousRelayBlockNumber: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      tasks: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<AcalaRuntimeScheduledTasks>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    incentives: {
      claimRewardDeductionCurrency: AugmentedQuery<ApiType, (arg: ModuleSupportIncentivesPoolId | {
        Loans: any;
      } | {
        Dex: any;
      } | {
        Earning: any;
      } | {
        NomineesElection: any;
      } | string | Uint8Array) => Observable<Option<AcalaPrimitivesCurrencyCurrencyId>>, [ModuleSupportIncentivesPoolId]> & QueryableStorageEntry<ApiType, [ModuleSupportIncentivesPoolId]>;
      claimRewardDeductionRates: AugmentedQuery<ApiType, (arg: ModuleSupportIncentivesPoolId | {
        Loans: any;
      } | {
        Dex: any;
      } | {
        Earning: any;
      } | {
        NomineesElection: any;
      } | string | Uint8Array) => Observable<u128>, [ModuleSupportIncentivesPoolId]> & QueryableStorageEntry<ApiType, [ModuleSupportIncentivesPoolId]>;
      incentiveRewardAmounts: AugmentedQuery<ApiType, (arg1: ModuleSupportIncentivesPoolId | {
        Loans: any;
      } | {
        Dex: any;
      } | {
        Earning: any;
      } | {
        NomineesElection: any;
      } | string | Uint8Array, arg2: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<u128>, [ModuleSupportIncentivesPoolId, AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [ModuleSupportIncentivesPoolId, AcalaPrimitivesCurrencyCurrencyId]>;
      pendingMultiRewards: AugmentedQuery<ApiType, (arg1: ModuleSupportIncentivesPoolId | {
        Loans: any;
      } | {
        Dex: any;
      } | {
        Earning: any;
      } | {
        NomineesElection: any;
      } | string | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<BTreeMap<AcalaPrimitivesCurrencyCurrencyId, u128>>, [ModuleSupportIncentivesPoolId, AccountId32]> & QueryableStorageEntry<ApiType, [ModuleSupportIncentivesPoolId, AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    liquidCrowdloan: {
      redeemCurrencyId: AugmentedQuery<ApiType, () => Observable<Option<AcalaPrimitivesCurrencyCurrencyId>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    loans: {
      positions: AugmentedQuery<ApiType, (arg1: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<AcalaPrimitivesPosition>, [AcalaPrimitivesCurrencyCurrencyId, AccountId32]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyCurrencyId, AccountId32]>;
      totalPositions: AugmentedQuery<ApiType, (arg: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<AcalaPrimitivesPosition>, [AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyCurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    messageQueue: {
      bookStateFor: AugmentedQuery<ApiType, (arg: CumulusPrimitivesCoreAggregateMessageOrigin | {
        Here: any;
      } | {
        Parent: any;
      } | {
        Sibling: any;
      } | string | Uint8Array) => Observable<PalletMessageQueueBookState>, [CumulusPrimitivesCoreAggregateMessageOrigin]> & QueryableStorageEntry<ApiType, [CumulusPrimitivesCoreAggregateMessageOrigin]>;
      pages: AugmentedQuery<ApiType, (arg1: CumulusPrimitivesCoreAggregateMessageOrigin | {
        Here: any;
      } | {
        Parent: any;
      } | {
        Sibling: any;
      } | string | Uint8Array, arg2: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletMessageQueuePage>>, [CumulusPrimitivesCoreAggregateMessageOrigin, u32]> & QueryableStorageEntry<ApiType, [CumulusPrimitivesCoreAggregateMessageOrigin, u32]>;
      serviceHead: AugmentedQuery<ApiType, () => Observable<Option<CumulusPrimitivesCoreAggregateMessageOrigin>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    multisig: {
      multisigs: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: U8aFixed | string | Uint8Array) => Observable<Option<PalletMultisigMultisig>>, [AccountId32, U8aFixed]> & QueryableStorageEntry<ApiType, [AccountId32, U8aFixed]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    nomineesElection: {
      ledger: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<AcalaPrimitivesBondingLedgerBondingLedger>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      nominations: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<AccountId32>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      reservedNominees: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<Vec<AccountId32>>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      votes: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<u128>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    operatorMembershipAcala: {
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    ormlNFT: {
      classes: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<OrmlNftClassInfo>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      nextClassId: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      nextTokenId: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<u64>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      tokens: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: u64 | AnyNumber | Uint8Array) => Observable<Option<OrmlNftTokenInfo>>, [u32, u64]> & QueryableStorageEntry<ApiType, [u32, u64]>;
      tokensByOwner: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: u32 | AnyNumber | Uint8Array, arg3: u64 | AnyNumber | Uint8Array) => Observable<Null>, [AccountId32, u32, u64]> & QueryableStorageEntry<ApiType, [AccountId32, u32, u64]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    parachainInfo: {
      parachainId: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    parachainSystem: {
      aggregatedUnincludedSegment: AugmentedQuery<ApiType, () => Observable<Option<CumulusPalletParachainSystemUnincludedSegmentSegmentTracker>>, []> & QueryableStorageEntry<ApiType, []>;
      announcedHrmpMessagesPerCandidate: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      customValidationHeadData: AugmentedQuery<ApiType, () => Observable<Option<Bytes>>, []> & QueryableStorageEntry<ApiType, []>;
      didSetValidationCode: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      hostConfiguration: AugmentedQuery<ApiType, () => Observable<Option<PolkadotPrimitivesV7AbridgedHostConfiguration>>, []> & QueryableStorageEntry<ApiType, []>;
      hrmpOutboundMessages: AugmentedQuery<ApiType, () => Observable<Vec<PolkadotCorePrimitivesOutboundHrmpMessage>>, []> & QueryableStorageEntry<ApiType, []>;
      hrmpWatermark: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      lastDmqMqcHead: AugmentedQuery<ApiType, () => Observable<H256>, []> & QueryableStorageEntry<ApiType, []>;
      lastHrmpMqcHeads: AugmentedQuery<ApiType, () => Observable<BTreeMap<u32, H256>>, []> & QueryableStorageEntry<ApiType, []>;
      lastRelayChainBlockNumber: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      newValidationCode: AugmentedQuery<ApiType, () => Observable<Option<Bytes>>, []> & QueryableStorageEntry<ApiType, []>;
      pendingUpwardMessages: AugmentedQuery<ApiType, () => Observable<Vec<Bytes>>, []> & QueryableStorageEntry<ApiType, []>;
      pendingValidationCode: AugmentedQuery<ApiType, () => Observable<Bytes>, []> & QueryableStorageEntry<ApiType, []>;
      processedDownwardMessages: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      relayStateProof: AugmentedQuery<ApiType, () => Observable<Option<SpTrieStorageProof>>, []> & QueryableStorageEntry<ApiType, []>;
      relevantMessagingState: AugmentedQuery<ApiType, () => Observable<Option<CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot>>, []> & QueryableStorageEntry<ApiType, []>;
      reservedDmpWeightOverride: AugmentedQuery<ApiType, () => Observable<Option<SpWeightsWeightV2Weight>>, []> & QueryableStorageEntry<ApiType, []>;
      reservedXcmpWeightOverride: AugmentedQuery<ApiType, () => Observable<Option<SpWeightsWeightV2Weight>>, []> & QueryableStorageEntry<ApiType, []>;
      unincludedSegment: AugmentedQuery<ApiType, () => Observable<Vec<CumulusPalletParachainSystemUnincludedSegmentAncestor>>, []> & QueryableStorageEntry<ApiType, []>;
      upgradeGoAhead: AugmentedQuery<ApiType, () => Observable<Option<PolkadotPrimitivesV7UpgradeGoAhead>>, []> & QueryableStorageEntry<ApiType, []>;
      upgradeRestrictionSignal: AugmentedQuery<ApiType, () => Observable<Option<PolkadotPrimitivesV7UpgradeRestriction>>, []> & QueryableStorageEntry<ApiType, []>;
      upwardDeliveryFeeFactor: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      upwardMessages: AugmentedQuery<ApiType, () => Observable<Vec<Bytes>>, []> & QueryableStorageEntry<ApiType, []>;
      validationData: AugmentedQuery<ApiType, () => Observable<Option<PolkadotPrimitivesV7PersistedValidationData>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    parameters: {
      parameters: AugmentedQuery<ApiType, (arg: AcalaRuntimeRuntimeParametersKey | {
        Earning: any;
      } | string | Uint8Array) => Observable<Option<AcalaRuntimeRuntimeParametersValue>>, [AcalaRuntimeRuntimeParametersKey]> & QueryableStorageEntry<ApiType, [AcalaRuntimeRuntimeParametersKey]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    polkadotXcm: {
      assetTraps: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<u32>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      currentMigration: AugmentedQuery<ApiType, () => Observable<Option<PalletXcmVersionMigrationStage>>, []> & QueryableStorageEntry<ApiType, []>;
      lockedFungibles: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<Vec<ITuple<[u128, XcmVersionedLocation]>>>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      queries: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Option<PalletXcmQueryStatus>>, [u64]> & QueryableStorageEntry<ApiType, [u64]>;
      queryCounter: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      recordedXcm: AugmentedQuery<ApiType, () => Observable<Option<Vec<StagingXcmV4Instruction>>>, []> & QueryableStorageEntry<ApiType, []>;
      remoteLockedFungibles: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: AccountId32 | string | Uint8Array, arg3: XcmVersionedAssetId | {
        V3: any;
      } | {
        V4: any;
      } | string | Uint8Array) => Observable<Option<PalletXcmRemoteLockedFungibleRecord>>, [u32, AccountId32, XcmVersionedAssetId]> & QueryableStorageEntry<ApiType, [u32, AccountId32, XcmVersionedAssetId]>;
      safeXcmVersion: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      shouldRecordXcm: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      supportedVersion: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: XcmVersionedLocation | {
        V2: any;
      } | {
        V3: any;
      } | {
        V4: any;
      } | string | Uint8Array) => Observable<Option<u32>>, [u32, XcmVersionedLocation]> & QueryableStorageEntry<ApiType, [u32, XcmVersionedLocation]>;
      versionDiscoveryQueue: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[XcmVersionedLocation, u32]>>>, []> & QueryableStorageEntry<ApiType, []>;
      versionNotifiers: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: XcmVersionedLocation | {
        V2: any;
      } | {
        V3: any;
      } | {
        V4: any;
      } | string | Uint8Array) => Observable<Option<u64>>, [u32, XcmVersionedLocation]> & QueryableStorageEntry<ApiType, [u32, XcmVersionedLocation]>;
      versionNotifyTargets: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: XcmVersionedLocation | {
        V2: any;
      } | {
        V3: any;
      } | {
        V4: any;
      } | string | Uint8Array) => Observable<Option<ITuple<[u64, SpWeightsWeightV2Weight, u32]>>>, [u32, XcmVersionedLocation]> & QueryableStorageEntry<ApiType, [u32, XcmVersionedLocation]>;
      xcmExecutionSuspended: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    preimage: {
      preimageFor: AugmentedQuery<ApiType, (arg: ITuple<[H256, u32]> | [H256 | string | Uint8Array, u32 | AnyNumber | Uint8Array]) => Observable<Option<Bytes>>, [ITuple<[H256, u32]>]> & QueryableStorageEntry<ApiType, [ITuple<[H256, u32]>]>;
      requestStatusFor: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<PalletPreimageRequestStatus>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      statusFor: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<PalletPreimageOldRequestStatus>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    prices: {
      lockedPrice: AugmentedQuery<ApiType, (arg: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<Option<u128>>, [AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyCurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    proxy: {
      announcements: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<ITuple<[Vec<PalletProxyAnnouncement>, u128]>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      proxies: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<ITuple<[Vec<PalletProxyProxyDefinition>, u128]>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    rewards: {
      poolInfos: AugmentedQuery<ApiType, (arg: ModuleSupportIncentivesPoolId | {
        Loans: any;
      } | {
        Dex: any;
      } | {
        Earning: any;
      } | {
        NomineesElection: any;
      } | string | Uint8Array) => Observable<OrmlRewardsPoolInfo>, [ModuleSupportIncentivesPoolId]> & QueryableStorageEntry<ApiType, [ModuleSupportIncentivesPoolId]>;
      sharesAndWithdrawnRewards: AugmentedQuery<ApiType, (arg1: ModuleSupportIncentivesPoolId | {
        Loans: any;
      } | {
        Dex: any;
      } | {
        Earning: any;
      } | {
        NomineesElection: any;
      } | string | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<ITuple<[u128, BTreeMap<AcalaPrimitivesCurrencyCurrencyId, u128>]>>, [ModuleSupportIncentivesPoolId, AccountId32]> & QueryableStorageEntry<ApiType, [ModuleSupportIncentivesPoolId, AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    scheduler: {
      agenda: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Vec<Option<PalletSchedulerScheduled>>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      incompleteSince: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      lookup: AugmentedQuery<ApiType, (arg: U8aFixed | string | Uint8Array) => Observable<Option<ITuple<[u32, u32]>>>, [U8aFixed]> & QueryableStorageEntry<ApiType, [U8aFixed]>;
      retries: AugmentedQuery<ApiType, (arg: ITuple<[u32, u32]> | [u32 | AnyNumber | Uint8Array, u32 | AnyNumber | Uint8Array]) => Observable<Option<PalletSchedulerRetryConfig>>, [ITuple<[u32, u32]>]> & QueryableStorageEntry<ApiType, [ITuple<[u32, u32]>]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    session: {
      currentIndex: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      disabledValidators: AugmentedQuery<ApiType, () => Observable<Vec<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      keyOwner: AugmentedQuery<ApiType, (arg: ITuple<[SpCoreCryptoKeyTypeId, Bytes]> | [SpCoreCryptoKeyTypeId | string | Uint8Array, Bytes | string | Uint8Array]) => Observable<Option<AccountId32>>, [ITuple<[SpCoreCryptoKeyTypeId, Bytes]>]> & QueryableStorageEntry<ApiType, [ITuple<[SpCoreCryptoKeyTypeId, Bytes]>]>;
      nextKeys: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<AcalaRuntimeSessionKeys>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      queuedChanged: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      queuedKeys: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[AccountId32, AcalaRuntimeSessionKeys]>>>, []> & QueryableStorageEntry<ApiType, []>;
      validators: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    sessionManager: {
      durationOffset: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      sessionDuration: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      sessionDurationChanges: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<ITuple<[u32, u32]>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    stableAsset: {
      poolCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      pools: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<NutsfinanceStableAssetStableAssetPoolInfo>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    sudo: {
      key: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    system: {
      account: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<FrameSystemAccountInfo>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      allExtrinsicsLen: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      authorizedUpgrade: AugmentedQuery<ApiType, () => Observable<Option<FrameSystemCodeUpgradeAuthorization>>, []> & QueryableStorageEntry<ApiType, []>;
      blockHash: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<H256>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      blockWeight: AugmentedQuery<ApiType, () => Observable<FrameSupportDispatchPerDispatchClassWeight>, []> & QueryableStorageEntry<ApiType, []>;
      digest: AugmentedQuery<ApiType, () => Observable<SpRuntimeDigest>, []> & QueryableStorageEntry<ApiType, []>;
      eventCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      events: AugmentedQuery<ApiType, () => Observable<Vec<FrameSystemEventRecord>>, []> & QueryableStorageEntry<ApiType, []>;
      eventTopics: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Vec<ITuple<[u32, u32]>>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      executionPhase: AugmentedQuery<ApiType, () => Observable<Option<FrameSystemPhase>>, []> & QueryableStorageEntry<ApiType, []>;
      extrinsicCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      extrinsicData: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Bytes>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      inherentsApplied: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      lastRuntimeUpgrade: AugmentedQuery<ApiType, () => Observable<Option<FrameSystemLastRuntimeUpgradeInfo>>, []> & QueryableStorageEntry<ApiType, []>;
      number: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      parentHash: AugmentedQuery<ApiType, () => Observable<H256>, []> & QueryableStorageEntry<ApiType, []>;
      upgradedToTripleRefCount: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      upgradedToU32RefCount: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    technicalCommittee: {
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      proposalOf: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<Call>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      proposals: AugmentedQuery<ApiType, () => Observable<Vec<H256>>, []> & QueryableStorageEntry<ApiType, []>;
      voting: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<PalletCollectiveVotes>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    technicalCommitteeMembership: {
      members: AugmentedQuery<ApiType, () => Observable<Vec<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      prime: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    timestamp: {
      didUpdate: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      now: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    tips: {
      reasons: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<Bytes>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      tips: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Option<PalletTipsOpenTip>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    tokens: {
      accounts: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<OrmlTokensAccountData>, [AccountId32, AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId]>;
      locks: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<Vec<OrmlTokensBalanceLock>>, [AccountId32, AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId]>;
      reserves: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<Vec<OrmlTokensReserveData>>, [AccountId32, AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AccountId32, AcalaPrimitivesCurrencyCurrencyId]>;
      totalIssuance: AugmentedQuery<ApiType, (arg: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<u128>, [AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyCurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    transactionPause: {
      pausedEvmPrecompiles: AugmentedQuery<ApiType, (arg: H160 | string | Uint8Array) => Observable<Option<Null>>, [H160]> & QueryableStorageEntry<ApiType, [H160]>;
      pausedTransactions: AugmentedQuery<ApiType, (arg: ITuple<[Bytes, Bytes]> | [Bytes | string | Uint8Array, Bytes | string | Uint8Array]) => Observable<Option<Null>>, [ITuple<[Bytes, Bytes]>]> & QueryableStorageEntry<ApiType, [ITuple<[Bytes, Bytes]>]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    transactionPayment: {
      alternativeFeeSwapPath: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Option<Vec<AcalaPrimitivesCurrencyCurrencyId>>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      globalFeeSwapPath: AugmentedQuery<ApiType, (arg: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<Option<Vec<AcalaPrimitivesCurrencyCurrencyId>>>, [AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyCurrencyId]>;
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      overrideChargeFeeMethod: AugmentedQuery<ApiType, () => Observable<Option<ModuleTransactionPaymentModuleChargeFeeMethod>>, []> & QueryableStorageEntry<ApiType, []>;
      poolSize: AugmentedQuery<ApiType, (arg: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<u128>, [AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyCurrencyId]>;
      swapBalanceThreshold: AugmentedQuery<ApiType, (arg: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<u128>, [AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyCurrencyId]>;
      tokenExchangeRate: AugmentedQuery<ApiType, (arg: AcalaPrimitivesCurrencyCurrencyId | {
        Token: any;
      } | {
        DexShare: any;
      } | {
        Erc20: any;
      } | {
        StableAssetPoolToken: any;
      } | {
        LiquidCrowdloan: any;
      } | {
        ForeignAsset: any;
      } | string | Uint8Array) => Observable<Option<u128>>, [AcalaPrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AcalaPrimitivesCurrencyCurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    treasury: {
      approvals: AugmentedQuery<ApiType, () => Observable<Vec<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      deactivated: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      proposalCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      proposals: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletTreasuryProposal>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      spendCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      spends: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Option<PalletTreasurySpendStatus>>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    unknownTokens: {
      abstractFungibleBalances: AugmentedQuery<ApiType, (arg1: StagingXcmV4Location | {
        parents?: any;
        interior?: any;
      } | string | Uint8Array, arg2: Bytes | string | Uint8Array) => Observable<u128>, [StagingXcmV4Location, Bytes]> & QueryableStorageEntry<ApiType, [StagingXcmV4Location, Bytes]>;
      concreteFungibleBalances: AugmentedQuery<ApiType, (arg1: StagingXcmV4Location | {
        parents?: any;
        interior?: any;
      } | string | Uint8Array, arg2: StagingXcmV4Location | {
        parents?: any;
        interior?: any;
      } | string | Uint8Array) => Observable<u128>, [StagingXcmV4Location, StagingXcmV4Location]> & QueryableStorageEntry<ApiType, [StagingXcmV4Location, StagingXcmV4Location]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    vesting: {
      vestingSchedules: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<OrmlVestingVestingSchedule>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    xcmInterface: {
      xcmDestWeightAndFee: AugmentedQuery<ApiType, (arg: ModuleXcmInterfaceModuleXcmInterfaceOperation | {
        XtokensTransfer: any;
      } | {
        HomaWithdrawUnbonded: any;
      } | {
        HomaBondExtra: any;
      } | {
        HomaUnbond: any;
      } | {
        ParachainFee: any;
      } | {
        ProxyReserveTransferAssets: any;
      } | {
        HomaNominate: any;
      } | string | Uint8Array) => Observable<ITuple<[SpWeightsWeightV2Weight, u128]>>, [ModuleXcmInterfaceModuleXcmInterfaceOperation]> & QueryableStorageEntry<ApiType, [ModuleXcmInterfaceModuleXcmInterfaceOperation]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    xcmpQueue: {
      deliveryFeeFactor: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<u128>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      inboundXcmpSuspended: AugmentedQuery<ApiType, () => Observable<BTreeSet<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      outboundXcmpMessages: AugmentedQuery<ApiType, (arg1: u32 | AnyNumber | Uint8Array, arg2: u16 | AnyNumber | Uint8Array) => Observable<Bytes>, [u32, u16]> & QueryableStorageEntry<ApiType, [u32, u16]>;
      outboundXcmpStatus: AugmentedQuery<ApiType, () => Observable<Vec<CumulusPalletXcmpQueueOutboundChannelDetails>>, []> & QueryableStorageEntry<ApiType, []>;
      queueConfig: AugmentedQuery<ApiType, () => Observable<CumulusPalletXcmpQueueQueueConfigData>, []> & QueryableStorageEntry<ApiType, []>;
      queueSuspended: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      signalMessages: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Bytes>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
  }
}
