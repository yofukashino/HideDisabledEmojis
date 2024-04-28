import { PluginInjector, SettingValues } from "../index";
import { NonGuildCategories, defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Types from "../types";

export default (): void => {
  const { EmojiPickerUtils, EmojiStore, EmojiUtils } = Modules;
  PluginInjector.after(
    EmojiPickerUtils,
    "useEmojiGrid",
    ([{ channel, collapsedSections, pickerIntention: intention }], res) => {
      if (!SettingValues.get("emoji", defaultSettings.emoji)) return res;

      const MappedEmojiCount = new Map<string, number>([["PREMIUM_UPSELL", 0]]);

      res.emojiGrid = res?.emojiGrid.reduce((acc: Types.EmojiRecords[], row, index) => {
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
          const emojis = filteredRow.splice(0, addCount).map((item, i) => ({
            ...item,
            rowIndex: index - 1,
            visibleRowIndex: index - 1,
            columnIndex: i,
          }));
          previousRow.push(...emojis);
        }

        MappedEmojiCount.set(
          currentId,
          (MappedEmojiCount.get(currentId) || 0) + filteredRow.length,
        );
        if (filteredRow.length)
          acc.push(
            filteredRow.map((item, i) => ({
              ...item,
              rowIndex: index,
              visibleRowIndex: index,
              columnIndex: i,
            })),
          );
        return acc;
      }, []);

      res.columnCounts = res.emojiGrid.map((row) => row.length);

      res.sectionDescriptors = res.sectionDescriptors.reduce((acc, section) => {
        if (section?.type === "UNICODE" || section?.type === "TOP_GUILD_EMOJI") {
          acc.push(section);
          return acc;
        }
        if (
          MappedEmojiCount.get(section?.sectionId) ||
          !collapsedSections?.has(section?.sectionId)
        ) {
          section.count =
            MappedEmojiCount.get(section?.type) ?? MappedEmojiCount.get(section?.sectionId);
          if (section.count) acc.push(section);

          return acc;
        }
        const usableEmojisInGuild = EmojiStore.getGuildEmoji(section?.sectionId).filter(
          (emoji) => !EmojiUtils.isEmojiDisabled({ emoji, intention, channel }),
        );
        if (
          Boolean(usableEmojisInGuild.length) ||
          channel.guild_id == section?.sectionId ||
          section?.sectionId == "RECENT"
        )
          acc.push(section);
        return acc;
      }, []);

      res.rowCountBySection = res?.sectionDescriptors?.map((section) =>
        collapsedSections.has(section?.sectionId) ? 0 : Math.ceil(section.count / 9),
      );

      return res;
    },
  );
};
