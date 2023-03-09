export { types as DefaultTypes } from "replugged";
import { types as DefaultTypes } from "replugged";
export { ReactElement } from "react";
export interface GenericModule {
  [key: string]: DefaultTypes.AnyFunction;
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
export interface Guild {
  afkChannelId: null | string;
  afkTimeout: number;
  applicationCommandCounts: {
    [key: number]: number;
  };
  application_id: null | string;
  banner: string;
  defaultMessageNotifications: number;
  description: string;
  discoverySplash: null | boolean;
  explicitContentFilter: number;
  features: Set<string>;
  homeHeader: null | string;
  hubType: null | number;
  icon: string;
  id: string;
  joinedAt: Date;
  latestOnboardingQuestionId: null | string;
  maxMembers: number;
  maxStageVideoChannelUsers: number;
  maxVideoChannelUsers: number;
  mfaLevel: number;
  name: string;
  nsfwLevel: number;
  ownerId: string;
  preferredLocale: string;
  premiumProgressBarEnabled: boolean;
  premiumSubscriberCount: number;
  premiumTier: number;
  publicUpdatesChannelId: string;
  roles: {
    [key: string]: object;
  };
  rulesChannelId: string;
  safetyAlertsChannelId: null | string;
  splash: null | string;
  systemChannelFlags: number;
  systemChannelId: string;
  vanityURLCode: string;
  verificationLevel: number;
  acronym: string;
  getApplicationId: DefaultTypes.AnyFunction;
  getIconSource: DefaultTypes.AnyFunction;
  getIconURL: DefaultTypes.AnyFunction;
  getMaxEmojiSlots: DefaultTypes.AnyFunction;
  getMaxRoleSubscriptionEmojiSlots: DefaultTypes.AnyFunction;
  getRole: DefaultTypes.AnyFunction;
  hasCommunityInfoSubheader: DefaultTypes.AnyFunction;
  hasFeature: DefaultTypes.AnyFunction;
  hasVerificationGate: DefaultTypes.AnyFunction;
  isLurker: DefaultTypes.AnyFunction;
  isNew: DefaultTypes.AnyFunction;
  isOwner: DefaultTypes.AnyFunction;
  isOwnerWithRequiredMfaLevel: DefaultTypes.AnyFunction;
  toString: DefaultTypes.AnyFunction;
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
