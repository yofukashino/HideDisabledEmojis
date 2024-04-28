import { types } from "replugged";
import { Store } from "replugged/dist/renderer/modules/common/flux";
import GeneralDiscordTypes from "discord-types/general";

export namespace Types {
  export import DefaultTypes = types;
  export type Guild = GeneralDiscordTypes.Guild;
  export type GenericModule = Record<string, DefaultTypes.AnyFunction> & {
    default: DefaultTypes.AnyFunction;
  };
  export interface GenericExport {
    exports: GenericModule;
    id: number;
    loaded: boolean;
  }
  export interface Emoji {
    animated: boolean;
    available: boolean;
    name: string;
    originalName?: string; // when a name ends with ~num
    url: string;
    id: string;
    guildId: string;
    emojiObject?: {
      names: string[];
      surrogates: string;
      uniqueName: string;
    };
  }
  export interface EmojiUtils {
    buildEmojiReactionColors: DefaultTypes.AnyFunction;
    filterUnsupportedEmojis: DefaultTypes.AnyFunction;
    getEmojiUnavailableReason: DefaultTypes.AnyFunction;
    getURL: DefaultTypes.AnyFunction;
    isDataTooBig: DefaultTypes.AnyFunction;
    isEmojiDisabled: DefaultTypes.AnyFunction;
    isEmojiFiltered: DefaultTypes.AnyFunction;
    isEmojiFilteredOrLocked: DefaultTypes.AnyFunction;
    isEmojiPremiumLocked: DefaultTypes.AnyFunction;
    isFileTooBig: DefaultTypes.AnyFunction;
    isInternalEmojiForGuildId: DefaultTypes.AnyFunction;
    sanitizeEmojiName: DefaultTypes.AnyFunction;
  }
  export interface EmojiStore extends Store {
    getBackfillTopEmojis: DefaultTypes.AnyFunction;
    getCustomEmojiById: DefaultTypes.AnyFunction;
    getDisambiguatedEmojiContext: DefaultTypes.AnyFunction;
    getGuildEmoji: (id: string) => Emoji[];
    getGuilds: DefaultTypes.AnyFunction;
    getNewlyAddedEmoji: DefaultTypes.AnyFunction;
    getSearchResultsOrder: DefaultTypes.AnyFunction;
    getState: DefaultTypes.AnyFunction;
    getTopEmoji: DefaultTypes.AnyFunction;
    getTopEmojisMetadata: DefaultTypes.AnyFunction;
    getUsableCustomEmojiById: DefaultTypes.AnyFunction;
    hasPendingUsage: DefaultTypes.AnyFunction;
    hasUsableEmojiInAnyGuild: DefaultTypes.AnyFunction;
    initialize: DefaultTypes.AnyFunction;
    searchWithoutFetchingLatest: DefaultTypes.AnyFunction;
  }
  export type EmojiRecords = Array<{
    category: string;
    columnIndex: number;
    guildId?: string;
    emoji: Emoji;
    isDisabled: boolean;
    rowIndex: number;
    size: number;
    subCategory: string;
    type: number;
    visibleRowIndex: number;
  }>;
  export interface PickerArgs {
    channelGuildId: string | undefined;
    collapsedSections: Set<string>;
    disableEmojiTutorialFlow: boolean;
    diversitySurrogate: string;
    emojiGrid: EmojiRecords[];
    emojiListRef: {
      current: {
        getListDimensions: DefaultTypes.AnyFunction;
        getRowDescriptors: DefaultTypes.AnyFunction;
        getScrollerNode: DefaultTypes.AnyFunction;
        getSectionDescriptors: DefaultTypes.AnyFunction;
        scrollIntoViewNode: DefaultTypes.AnyFunction;
        scrollRowIntoView: DefaultTypes.AnyFunction;
        scrollTo: DefaultTypes.AnyFunction;
        scrollToSectionTop: DefaultTypes.AnyFunction;
      };
    };
    emojiSize: number;
    getEmojiItemProps: DefaultTypes.AnyFunction;
    getEmojiRowProps: DefaultTypes.AnyFunction;
    gridWidth: number;
    isUsingKeyboardNavigation: { current: boolean };
    onEmojiSelect: DefaultTypes.AnyFunction;
    rowCount: number;
    rowCountBySection: number[];
    sectionDescriptors: Array<{
      categoryId: string;
      count: number;
      guild: Guild;
      sectionId: string;
      type: string;
    }>;
    setCollapsedSections: DefaultTypes.AnyFunction;
  }
  export interface SidebarProps {
    categories: Array<{ type: string; id?: string; name?: string; guild?: Guild }>;
    categoryHeight: DefaultTypes.AnyFunction;
    categoryListRef: {
      current: {
        getListDimensions: DefaultTypes.AnyFunction;
        getRowDescriptors: DefaultTypes.AnyFunction;
        getScrollerNode: DefaultTypes.AnyFunction;
        getSectionDescriptors: DefaultTypes.AnyFunction;
        scrollIntoViewNode: DefaultTypes.AnyFunction;
        scrollRowIntoView: DefaultTypes.AnyFunction;
        scrollTo: DefaultTypes.AnyFunction;
        scrollToSectionTop: DefaultTypes.AnyFunction;
      };
    };
    children: DefaultTypes.AnyFunction;
    className: string;
    expressionsListRef: {
      current: {
        getListDimensions: DefaultTypes.AnyFunction;
        getRowDescriptors: DefaultTypes.AnyFunction;
        getScrollerNode: DefaultTypes.AnyFunction;
        getSectionDescriptors: DefaultTypes.AnyFunction;
        scrollIntoViewNode: DefaultTypes.AnyFunction;
        scrollRowIntoView: DefaultTypes.AnyFunction;
        scrollTo: DefaultTypes.AnyFunction;
        scrollToSectionTop: DefaultTypes.AnyFunction;
      };
    };
    getScrollOffsetForIndex: DefaultTypes.AnyFunction;
    listPadding: number[];
    onScroll: DefaultTypes.AnyFunction;
    renderCategoryListItem: DefaultTypes.AnyFunction;
    renderSection: DefaultTypes.AnyFunction;
    rowCount: number;
    rowCountBySection: number[];
    store: {
      getState: DefaultTypes.AnyFunction;
      resetStoreState: DefaultTypes.AnyFunction;
      setActiveCategoryIndex: DefaultTypes.AnyFunction;
      setInspectedExpressionPosition: DefaultTypes.AnyFunction;
      setSearchPlaceholder: DefaultTypes.AnyFunction;
      useStore: DefaultTypes.AnyFunction;
    };
  }
  export interface EmojiPicker {
    $$typeof: symbol;
    compare: null;
    type: (e: PickerArgs) => unknown;
  }
  export interface Sticker {
    asset: string;
    available: boolean;
    description: string;
    format_type: number;
    guild_id: string;
    id: string;
    name: string;
    tags: string;
    type: number;
  }
  export interface StickersStore extends Store {
    getAllGuildStickers: () => Map<string, Sticker[]>;
    getAllStickersIterator: DefaultTypes.AnyFunction;
    getPremiumPacks: DefaultTypes.AnyFunction;
    getRawStickersByGuild: DefaultTypes.AnyFunction;
    getStickerById: DefaultTypes.AnyFunction;
    getStickerPack: DefaultTypes.AnyFunction;
    getStickersByGuildId: DefaultTypes.AnyFunction;
    hasLoadedStickerPacks: boolean;
    isFetchingStickerPacks: boolean;
    isLoaded: boolean;
    isPremiumPack: DefaultTypes.AnyFunction;
    loadState: number;
    stickerMetadata: Map<string, unknown>;
  }
  export enum StickerSendability {
    NONSENDABLE = 2,
    SENDABLE = 0,
    SENDABLE_WITH_BOOSTED_GUILD = 3,
    SENDABLE_WITH_PREMIUM = 1,
  }
  export interface StickerSendabilityUtils {
    StickerSendability: typeof StickerSendability;
    getStickerSendability: DefaultTypes.AnyFunction;
    isSendableSticker: DefaultTypes.AnyFunction;
  }
  export interface Sound {
    available: boolean;
    emojiId: string;
    emojiName: string;
    guildId: string;
    name: string;
    soundId: string;
    userId: string;
    volume: number;
  }
  export interface SoundboardStore extends Store {
    getFavorites: DefaultTypes.AnyFunction;
    getOverlaySerializedState: DefaultTypes.AnyFunction;
    getSound: DefaultTypes.AnyFunction;
    getSoundById: DefaultTypes.AnyFunction;
    getSounds: () => Map<string, Sound[]>;
    getSoundsForGuild: DefaultTypes.AnyFunction;
    hasFetchedAllSounds: DefaultTypes.AnyFunction;
    hasFetchedDefaultSounds: DefaultTypes.AnyFunction;
    hasHadOtherUserPlaySoundInSession: DefaultTypes.AnyFunction;
    isFavoriteSound: DefaultTypes.AnyFunction;
    isFetching: DefaultTypes.AnyFunction;
    isFetchingDefaultSounds: DefaultTypes.AnyFunction;
    isFetchingSounds: DefaultTypes.AnyFunction;
    isLocalSoundboardMuted: DefaultTypes.AnyFunction;
    isPlayingSound: DefaultTypes.AnyFunction;
    isUserPlayingSounds: DefaultTypes.AnyFunction;
    shouldFetchDefaultSounds: DefaultTypes.AnyFunction;
  }
  export interface SoundboardUtils {
    canUseSoundboardSound: DefaultTypes.AnyFunction;
    getAmplitudinalSoundboardVolume: DefaultTypes.AnyFunction;
    maybePlayCustomJoinSound: DefaultTypes.AnyFunction;
    playSound: DefaultTypes.AnyFunction;
    removeCustomJoinSound: DefaultTypes.AnyFunction;
    trackCustomCallSoundExternallyDeleted: DefaultTypes.AnyFunction;
    updateCustomJoinSound: DefaultTypes.AnyFunction;
    useSoundBoardDismissContentTypes: DefaultTypes.AnyFunction;
  }
  export interface Modules {
    loadModules?: () => Promise<void>;
    EmojiUtils?: EmojiUtils;
    PickerSidebar?: GenericModule;
    EmojiPicker?: EmojiPicker;
    StickerSendabilityUtils?: StickerSendabilityUtils;
    SoundboardUtils?: SoundboardUtils;
    EmojiStore?: EmojiStore;
    StickersStore?: StickersStore;
    SoundboardStore?: SoundboardStore;
  }
  export interface Settings {
    emoji: boolean;
    sticker: boolean;
    sound: boolean;
  }
}
export default Types;
