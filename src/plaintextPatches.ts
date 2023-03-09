import * as Types from "./types";
export default [
  {
    find: /\.isDisabled.*\.showPulse/,
    replacements: [
      {
        match: /(\w+\.memo\(\(function\((\w+)\){)(.*\.diversitySurrogate.*.emojiGrid)/,
        replace: `$1$2=replugged.plugins.getExports('Tharki.HideDisabledEmojis').patchEmojiPicker($2);$3`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
