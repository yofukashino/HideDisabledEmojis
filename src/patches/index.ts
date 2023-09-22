import { patchEmojiPicker } from "./EmojiPicker";
import { patchEmojiUtils } from "./EmojiUtils";
import { patchEmojiSidebar } from "./PickerSidebar";

export const applyInjections = (): void => {
  patchEmojiPicker();
  patchEmojiUtils();
  patchEmojiSidebar();
};
