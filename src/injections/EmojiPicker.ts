import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Types from "../types";

export default (): void => {
  const { EmojiPicker, EmojiStore, EmojiUtils } = Modules;
  PluginInjector.before(EmojiPicker, "type", (args) => {
    if (!SettingValues.get("emoji", defaultSettings.emoji)) return args;
    const [PickerArgs] = args;
    const MappedEmojiCount = new Map<string, number>([["PREMIUM_UPSELL", 0]]);
    const NonGuildCategories = [
      "UNICODE",
      "TOP_GUILD_EMOJI",
      "RECENT",
      "SEARCH_RESULTS",
      "FAVORITES",
    ];
    const isCollapsedButUsable = (section): boolean => {
      const usableEmojisInGuild = EmojiStore.getGuildEmoji(section?.sectionId).filter(
        (emoji) => !EmojiUtils.isEmojiDisabled({ emoji }),
      );

      if (
        !MappedEmojiCount.get(section?.sectionId) &&
        PickerArgs?.collapsedSections?.has(section?.sectionId)
      )
        return (
          Boolean(usableEmojisInGuild.length) ||
          PickerArgs?.channelGuildId == section?.sectionId ||
          section?.sectionId == "RECENT"
        );
    };
    const shouldReturnOriginal = (section): boolean =>
      section?.type === "UNICODE" ||
      section?.type === "TOP_GUILD_EMOJI" ||
      isCollapsedButUsable(section);

    PickerArgs.emojiGrid = PickerArgs?.emojiGrid.reduce((acc: Types.EmojiRecords[], row, index) => {
      const filteredRow = row.filter((item) => !item.isDisabled);
      const previousRow = acc[index - 1];
      const previousId = NonGuildCategories.includes(previousRow?.[0]?.category)
        ? previousRow?.[0]?.category
        : previousRow?.[0]?.emoji?.guildId ?? previousRow?.[0]?.guildId;
      const currentId = NonGuildCategories.includes(filteredRow[0]?.category)
        ? filteredRow[0].category
        : filteredRow[0]?.emoji?.guildId ?? filteredRow[0]?.guildId;
      if (
        previousRow &&
        previousId === currentId &&
        previousRow?.length < 9 &&
        filteredRow.length
      ) {
        const addCount = 9 - previousRow.length;
        const emojis = filteredRow.splice(0, addCount);
        previousRow.push(...emojis);
      }
      if (filteredRow.length) acc.push(filteredRow);
      return acc;
    }, []);

    PickerArgs.rowCount = PickerArgs.emojiGrid.length;

    if (!PickerArgs?.sectionDescriptors) return args;

    for (const EmojiItem of PickerArgs.emojiGrid.flat(Infinity) as Types.EmojiRecords) {
      const key = NonGuildCategories.includes(EmojiItem?.category)
        ? EmojiItem.category
        : EmojiItem?.emoji?.guildId ?? EmojiItem?.guildId;
      MappedEmojiCount.set(key, (MappedEmojiCount.get(key) || 0) + 1);
    }

    PickerArgs.sectionDescriptors = PickerArgs.sectionDescriptors.reduce((acc, section) => {
      if (shouldReturnOriginal(section)) {
        acc.push(section);
        return acc;
      }
      section.count =
        MappedEmojiCount.get(section?.type) ?? MappedEmojiCount.get(section?.sectionId);
      if (section.count) acc.push(section);
      return acc;
    }, []);

    PickerArgs.rowCountBySection = PickerArgs?.sectionDescriptors?.map((section) =>
      PickerArgs?.collapsedSections.has(section?.sectionId) ? 0 : Math.ceil(section.count / 9),
    );
    return args;
  });
};
