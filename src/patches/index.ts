import patchEmojiPicker from "./EmojiPicker";
import patchEmojiUtils from "./EmojiUtils";
import patchPickerSidebar from "./PickerSidebar";

export const applyInjections = (): void => {
  void patchEmojiPicker();
  patchEmojiUtils();
  patchPickerSidebar();
};
