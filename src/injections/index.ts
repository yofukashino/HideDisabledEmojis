import Modules from "../lib/requiredModules";
import injectEmojiCategoryUtils from "./EmojiCategoryUtils";
import injectEmojiPickerUtils from "./EmojiPickerUtils";
import injectEmojiUtils from "./EmojiUtils";
import injectSoundboardStore from "./SoundboardStore";
import injectStickerStore from "./StickersStore";

export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  injectEmojiCategoryUtils();
  injectEmojiPickerUtils();
  injectEmojiUtils();
  injectSoundboardStore();
  injectStickerStore();
};

export default { applyInjections };
