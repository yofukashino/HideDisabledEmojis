import { PluginInjector } from "../index";
import { EmojiUtils } from "../lib/requiredModules";
export const patchEmojiUtils = (): void => {
  PluginInjector.after(EmojiUtils, "isEmojiFiltered", (args, res) => {
    return res || EmojiUtils.isEmojiDisabled(...args);
  });
};
