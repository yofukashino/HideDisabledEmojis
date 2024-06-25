import { webpack } from "replugged";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Types from "../types";

export default (): void => {
  const { EmojiCategoryUtils } = Modules;
  const loader = webpack.getFunctionKeyBySource(EmojiCategoryUtils, "categories.reduce");
  PluginInjector.after(
    EmojiCategoryUtils,
    loader,
    (
      _arg: [number, Types.Channel],
      res: Array<{
        type: string;
        id?: string;
        name?: string;
        guild?: Types.Guild;
        emojis: Types.Emoji[];
        emojisDisabled: Set<string>;
      }>,
    ) => {
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
    },
  );
};
