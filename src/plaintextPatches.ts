import * as Types from "./types";
export default [
  {
    find: /\.isDisabled.*\.showPulse/,
    replacements: [
      {
        match: /([^]*)(\w+\.memo\(\(function\((\w+)\){)([^]*?\.diversitySurrogate[^]*?\.emojiGrid)/,
        replace: `$1$2$3=replugged.plugins.getExports('dev.tharki.HideDisabledEmojis').patchEmojiPicker($3) ?? $3;$4`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
