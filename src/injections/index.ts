import Modules from "../lib/requiredModules";
import injectEmojiPicker from "./EmojiPicker";
import injectEmojiUtils from "./EmojiUtils";
import injectPickerSidebar from "./PickerSidebar";
import injectSoundboardStore from "./SoundboardStore";
import injectStickerStore from "./StickersStore";

export const applyInjections = async (): Promise<void> => {
  await Modules.loadModules();
  injectEmojiPicker();
  injectEmojiUtils();
  injectPickerSidebar();
  injectSoundboardStore();
  injectStickerStore();
};

export default { applyInjections };
