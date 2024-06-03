import Modules from "../lib/requiredModules";
import injectEmojiCategoryUtils from "./EmojiCategoryUtils";
import injectSoundboardStore from "./SoundboardStore";
import injectStickerStore from "./StickersStore";

export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  injectEmojiCategoryUtils();
  injectSoundboardStore();
  injectStickerStore();
};

export default { applyInjections };
