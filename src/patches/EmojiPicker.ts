import * as Types from "../types";
export const patchEmojiPicker = (pickerArgs: Types.pickerArgs): Types.pickerArgs => {
  pickerArgs.emojiGrid = pickerArgs?.emojiGrid
    ?.map((m) => m.filter((m) => !m.isDisabled))
    .filter((m) => m.length);
  pickerArgs.rowCount = pickerArgs.emojiGrid.length;
  if (!pickerArgs.sectionDescriptors) return;
  const mappedEmojiCount = {} as Types.mappedEmojiCount;
  for (const emojiItem of pickerArgs.emojiGrid.flat(Infinity) as Types.emojiRecord[]) {
    if (
      emojiItem?.category?.toLowerCase() == "recent" ||
      emojiItem?.category?.toLowerCase() == "unicode" ||
      emojiItem?.category?.toLowerCase() == "top_guild_emoji"
    )
      mappedEmojiCount[emojiItem.category] = (mappedEmojiCount[emojiItem.category] || 0) + 1;
    else
      mappedEmojiCount[emojiItem?.emoji?.guildId] =
        (mappedEmojiCount[emojiItem?.emoji?.guildId] || 0) + 1;
  }

  pickerArgs.sectionDescriptors = pickerArgs?.sectionDescriptors
    ?.map((section) => {
      if (
        section?.type?.toLowerCase() == "unicode" ||
        section?.type?.toLowerCase() == "top_guild_emoji"
      )
        return section;
      section.count = mappedEmojiCount[section.type]
        ? mappedEmojiCount[section?.type]
        : mappedEmojiCount[section?.guild?.id];
      return section;
    })
    .filter((section) => section.count);
  pickerArgs.rowCountBySection = pickerArgs?.sectionDescriptors?.map((m) => Math.ceil(m.count / 9));
  return pickerArgs;
};
