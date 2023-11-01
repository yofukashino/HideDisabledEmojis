import { PluginInjector } from "../index";
import { EmojiPicker, EmojiStore, EmojiUtils } from "../lib/requiredModules";
import * as Types from "../types";

export default (): void => {
  PluginInjector.before(EmojiPicker, "type", (args: [Types.pickerArgs]) => {
    const mappedEmojiCount = new Map<string, number>([["PREMIUM_UPSELL", 0]]);
    const isCollapsedButUsable = (section): boolean => {
      const usableEmojisInGuild = EmojiStore.getGuildEmoji(section?.sectionId).filter(
        (emoji) => !EmojiUtils.isEmojiDisabled({ emoji }),
      );

      if (
        !mappedEmojiCount.get(section?.sectionId) &&
        args[0]?.collapsedSections?.has(section?.sectionId)
      )
        return (
          Boolean(usableEmojisInGuild.length) ||
          args[0]?.channelGuildId == section?.sectionId ||
          section?.sectionId == "RECENT"
        );
    };
    const shouldReturnOriginal = (section): boolean =>
      section?.type === "UNICODE" ||
      section?.type === "TOP_GUILD_EMOJI" ||
      isCollapsedButUsable(section);

    args[0].emojiGrid = args[0]?.emojiGrid
      ?.map((row) => row.filter((item) => !item.isDisabled))
      .filter((row) => row.length);

    args[0].rowCount = args[0].emojiGrid.length;

    if (!args[0]?.sectionDescriptors) return args;

    for (const emojiItem of args[0].emojiGrid.flat(Infinity) as Types.emojiRecord[]) {
      if (
        ["UNICODE", "TOP_GUILD_EMOJI", "RECENT", "SEARCH_RESULTS", "FAVORITES"].includes(
          emojiItem?.category,
        )
      ) {
        mappedEmojiCount.set(
          emojiItem.category,
          (mappedEmojiCount.get(emojiItem.category) || 0) + 1,
        );
      } else {
        mappedEmojiCount.set(
          emojiItem?.emoji?.guildId,
          (mappedEmojiCount.get(emojiItem?.emoji?.guildId) || 0) + 1,
        );
      }
    }

    args[0].sectionDescriptors = args[0]?.sectionDescriptors
      ?.map((section) => {
        if (shouldReturnOriginal(section)) return section;

        section.count =
          mappedEmojiCount.get(section?.type) ?? mappedEmojiCount.get(section?.sectionId);

        return section;
      })
      .filter((section) => section.count);

    args[0].rowCountBySection = args[0]?.sectionDescriptors?.map((section) =>
      args[0]?.collapsedSections.has(section?.sectionId) ? 0 : Math.ceil(section.count / 9),
    );
    return args;
  });
};
