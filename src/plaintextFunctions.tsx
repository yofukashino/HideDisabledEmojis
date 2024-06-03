import { SettingValues } from ".";
import { defaultSettings } from "./lib/consts";
import Modules from "./lib/requiredModules";
import Types from "./types";
export const _filteredEmojis = (
  emojis: Types.Emoji[],
  section,
  channel,
  intention,
): Types.Emoji[] => {
  if (!SettingValues.get("emoji", defaultSettings.emoji)) return emojis;
  if (section.isNitroLocked) return [];
  return emojis.filter(
    (emoji) =>
      !emoji.guildId ||
      (emoji.available && !Modules?.EmojiUtils?.isEmojiDisabled?.({ emoji, channel, intention })),
  );
};
