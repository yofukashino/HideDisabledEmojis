import { EmojiPicker } from "./lib/requiredModules";
import Types from "./types";
let resolveEmojiPickerPromise: () => void;
export const assignedEmojiPicker = new Promise<void>((res) => {
  resolveEmojiPickerPromise = res;
  if (EmojiPicker.EmojiPicker) res();
});
export const _assignEmojiPicker = (
  fn: Types.DefaultTypes.AnyFunction,
): Types.DefaultTypes.AnyFunction => {
  Object.defineProperty(EmojiPicker, "EmojiPicker", {
    get: () => fn,
    set: (value) => (fn = value),
    configurable: true,
  });
  resolveEmojiPickerPromise();
  return fn;
};
