import patchEmojiPicker from "./EmojiPicker";
import patchEmojiUtils from "./EmojiUtils";
import patchPickerSidebar from "./PickerSidebar";

export const applyInjections = (): void => {
  patchEmojiPicker();
  patchEmojiUtils();
  patchPickerSidebar();
};

export default { applyInjections };
