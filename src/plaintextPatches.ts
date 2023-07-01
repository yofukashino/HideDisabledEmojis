import * as Types from "./types";
export default [
  {
    find: /\.isDisabled.*\.showPulse/,
    replacements: [
      {
        match: /var \w+=(.)\.diversitySurrogate,\w+=.\.emojiGrid/,
        replace: `$1=replugged.plugins.getExports('dev.tharki.HideDisabledEmojis').patchEmojiPicker($1) ?? $1;$&`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
