import * as Types from "./types";
export default [
  {
    find: "emojiListRef:",
    replacements: [
      {
        match:
          /((\w+)\s*=\s*\w+\s*\.\s*memo\s*\(\s*\(\s*function\s*\(\s*.\)\s*{\s*var\s*\w+\s*=\s*.\s*\.\s*diversitySurrogate\s*,\s*\w+\s*=\s*.\s*\.\s*emojiGrid[^]*?)(const)/,
        replace:
          `$1replugged.webpack.waitForModule(replugged.webpack.filters.bySource("emojiListRef:"),{raw:true, timeout: 10000}).then((mod)=>Object.defineProperty(mod.exports,"EmojiPicker",{` +
          `get:()=>$2,` +
          `set:(value)=>$2=value,` +
          `configurable:true,` +
          `writeable:true` +
          `}));$3`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
