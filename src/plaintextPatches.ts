import * as Types from "./types";
export default [
  {
    find: "emojiListRef:",
    replacements: [
      {
        match:
          /(\w+\s*\?\s*\(\s*0\s*,\s*\w+\s*\.\s*jsx\s*\)\s*\(\s*)(\w+\s*)(,\s*{\s*collapsedSections)/,
        replace: (_orig: string, prefix: string, fn: string, suffix: string): string =>
          `${prefix}${fn}=replugged.plugins.getExports("dev.tharki.HideDisabledEmojis")?._assignEmojiPicker(${fn})??${fn}${suffix}`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
