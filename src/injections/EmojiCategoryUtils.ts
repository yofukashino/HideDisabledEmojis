import { guilds as UltimateGuildsStore } from "replugged/common";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";

export default (): void => {
  const { EmojiStore, EmojiUtils, EmojiCategoryUtils } = Modules;
  PluginInjector.after(EmojiCategoryUtils, "useEmojiCategories", ([intention, channel], res) => {
    if (!SettingValues.get("emoji", defaultSettings.emoji)) return res;
    return res.reduce((acc, category) => {
      if (!category?.guild || UltimateGuildsStore.getGuildId() == category?.guild?.id) {
        acc.push(category);
        return acc;
      }
      const UsableEmojisInGuild = EmojiStore.getGuildEmoji(category?.guild?.id).filter(
        (emoji) => !EmojiUtils.isEmojiDisabled({ emoji, channel, intention }),
      );
      if (UsableEmojisInGuild.length) acc.push(category);
      return acc;
    }, []);
  });
};
