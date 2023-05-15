import { EmojiStore, EmojiUtils } from "../lib/requiredModules";
import * as Types from "../types";
export const mappedEmojiCount = new Map<string, number>();
export const patchEmojiPicker = (pickerArgs: Types.pickerArgs): Types.pickerArgs => {
  mappedEmojiCount.clear();
  pickerArgs.emojiGrid = pickerArgs?.emojiGrid
    ?.map((m) => m.filter((m) => !m.isDisabled))
    .filter((m) => m.length);
  pickerArgs.rowCount = pickerArgs.emojiGrid.length;
  if (!pickerArgs?.sectionDescriptors) return pickerArgs;

  for (const emojiItem of pickerArgs.emojiGrid.flat(Infinity) as Types.emojiRecord[]) {
    mappedEmojiCount.set("PREMIUM_UPSELL", 0);
    if (
      emojiItem?.category?.toLowerCase() == "recent" ||
      emojiItem?.category?.toLowerCase() == "unicode" ||
      emojiItem?.category?.toLowerCase() == "top_guild_emoji"
    )
      mappedEmojiCount.set(emojiItem.category, (mappedEmojiCount.get(emojiItem.category) || 0) + 1);
    else
      mappedEmojiCount.set(
        emojiItem?.emoji?.guildId,
        (mappedEmojiCount.get(emojiItem?.emoji?.guildId) || 0) + 1,
      );
  }
  const shouldReturnOriginal = (section): boolean => {
    if (
      section?.type?.toLowerCase() == "unicode" ||
      section?.type?.toLowerCase() == "top_guild_emoji"
    )
      return true;
    const UsableEmojisInGuild = EmojiStore.getGuildEmoji(section?.sectionId).filter(
      (emoji) => !EmojiUtils.isEmojiDisabled(emoji),
    );
    if (
      !mappedEmojiCount.get(section?.sectionId) &&
      pickerArgs?.collapsedSections?.has(section?.sectionId)
    )
      return (
        Boolean(UsableEmojisInGuild.length) || pickerArgs?.channelGuildId == section?.sectionId
      );
  };
  pickerArgs.sectionDescriptors = pickerArgs?.sectionDescriptors
    ?.map((section) => {
      if (shouldReturnOriginal(section)) return section;
      section.count = mappedEmojiCount.has(section.type)
        ? mappedEmojiCount.get(section?.type)
        : mappedEmojiCount.get(section?.sectionId);
      return section;
    })
    .filter((section) => section.count);
  pickerArgs.rowCountBySection = pickerArgs?.sectionDescriptors?.map((s) =>
    pickerArgs?.collapsedSections.has(s?.sectionId) ? 0 : Math.ceil(s.count / 9),
  );
  return pickerArgs;
};
