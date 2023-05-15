import { patchEmojiUtils } from "./EmojiUtils";
import { patchEmojiSidebar } from "./PickerSidebar";
export { patchEmojiPicker } from "./EmojiPicker";
export const applyInjections = (): void => {
  patchEmojiUtils();
  patchEmojiSidebar();
};
