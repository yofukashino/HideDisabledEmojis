export { types as DefaultTypes } from "replugged";
import { types as DefaultTypes } from "replugged";
import { Guild } from "discord-types/general";
import { Store } from "replugged/dist/renderer/modules/common/flux";
export interface GenericModule extends Record<string, DefaultTypes.AnyFunction> {}
export interface GenericExport {
  exports: GenericModule;
  id: number;
  loaded: boolean;
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
  getGuildEmoji: (id: string) => emoji[];
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
export interface emoji {
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
export interface emojiRecord {
  category: string;
  columnIndex: number;
  emoji: emoji;
  isDisabled: boolean;
  rowIndex: number;
  size: number;
  subCategory: string;
  type: number;
  visibleRowIndex: number;
}
export interface section {
  categoryId: string;
  count: number;
  guild: Guild;
  sectionId: string;
  type: string;
}

export interface pickerArgs {
  channelGuildId: string | undefined;
  collapsedSections: Set<string>;
  disableEmojiTutorialFlow: boolean;
  diversitySurrogate: string;
  emojiGrid: emojiRecord[][];
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
  sectionDescriptors: section[];
  setCollapsedSections: DefaultTypes.AnyFunction;
}
export interface sidebarProps {
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
  type: (e: pickerArgs) => unknown;
}
export * as default from "./types";
