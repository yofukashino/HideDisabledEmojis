import { patchEmojiUtils } from "./EmojiUtils";
export { patchEmojiPicker } from "./EmojiPicker";
export const applyInjections = (): void => {
  patchEmojiUtils();
};
