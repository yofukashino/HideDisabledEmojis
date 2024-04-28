import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
export default (): void => {
  const { EmojiUtils } = Modules;
  PluginInjector.after(EmojiUtils, "isEmojiFiltered", (args, res) =>
    SettingValues.get("emoji", defaultSettings.emoji)
      ? res || EmojiUtils.isEmojiDisabled(...args)
      : res,
  );
};
