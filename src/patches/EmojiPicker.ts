import { EmojiStore, EmojiUtils } from "../lib/requiredModules";
import * as Types from "../types";

export const patchEmojiPicker = (pickerArgs: Types.pickerArgs): Types.pickerArgs => {
  const mappedEmojiCount = new Map<string, number>();
  const isCollapsedButUsable = (section): boolean => {
    const usableEmojisInGuild = EmojiStore.getGuildEmoji(section?.sectionId).filter(
      (emoji) => !EmojiUtils.isEmojiDisabled(emoji),
    );

    if (
      !mappedEmojiCount.get(section?.sectionId) &&
      pickerArgs?.collapsedSections?.has(section?.sectionId)
    )
      return (
        Boolean(usableEmojisInGuild.length) ||
        pickerArgs?.channelGuildId == section?.sectionId ||
        section?.sectionId == "RECENT"
      );
  };
  const shouldReturnOriginal = (section): boolean =>
    section?.type === "UNICODE" ||
    section?.type === "TOP_GUILD_EMOJI" ||
    isCollapsedButUsable(section);

  pickerArgs.emojiGrid = pickerArgs?.emojiGrid
    ?.map((row) => row.filter((item) => !item.isDisabled))
    .filter((row) => row.length);

  pickerArgs.rowCount = pickerArgs.emojiGrid.length;

  if (!pickerArgs?.sectionDescriptors) return pickerArgs;

  for (const emojiItem of pickerArgs.emojiGrid.flat(Infinity) as Types.emojiRecord[]) {
    mappedEmojiCount.set("PREMIUM_UPSELL", 0);

    if (
      emojiItem?.category === "UNICODE" ||
      emojiItem?.category === "TOP_GUILD_EMOJI" ||
      emojiItem?.category === "RECENT"
    ) {
      mappedEmojiCount.set(emojiItem.category, (mappedEmojiCount.get(emojiItem.category) || 0) + 1);
    } else {
      mappedEmojiCount.set(
        emojiItem?.emoji?.guildId,
        (mappedEmojiCount.get(emojiItem?.emoji?.guildId) || 0) + 1,
      );
    }
  }

  pickerArgs.sectionDescriptors = pickerArgs?.sectionDescriptors
    ?.map((section) => {
      if (shouldReturnOriginal(section)) return section;

      section.count =
        mappedEmojiCount.get(section?.type) ?? mappedEmojiCount.get(section?.sectionId);

      return section;
    })
    .filter((section) => section.count);

  pickerArgs.rowCountBySection = pickerArgs?.sectionDescriptors?.map((section) =>
    pickerArgs?.collapsedSections.has(section?.sectionId) ? 0 : Math.ceil(section.count / 9),
  );

  return pickerArgs;
};
