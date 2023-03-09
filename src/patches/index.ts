import { patchEmojiUtils } from "./EmojiUtils";
import { patchEmojiSidebar } from "./Sidebar";
export { patchEmojiPicker } from "./EmojiPicker";
export const applyInjections = (): void => {
  patchEmojiUtils();
  patchEmojiSidebar();
};
