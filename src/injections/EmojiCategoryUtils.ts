import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";

export default (): void => {
  const { EmojiCategoryUtils } = Modules;
  PluginInjector.after(EmojiCategoryUtils, "useEmojiCategories", (_args, res) => {
    if (!SettingValues.get("emoji", defaultSettings.emoji)) return res;
    return res.reduce((acc, category) => {
      if (!category?.guild) {
        acc.push(category);
        return acc;
      }

      const UsableEmojisInGuild = category.emojis.filter(
        (emoji) => emoji.available && !category.emojisDisabled.has(emoji.id),
      );

      if (UsableEmojisInGuild.length) acc.push(category);
      return acc;
    }, []);
  });
};
