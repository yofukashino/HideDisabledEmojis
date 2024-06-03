import Types from "./types";

export default [
  {
    find: "useEmojiGrid:",
    replacements: [
      {
        match:
          /(\((\w+),(\w+)\)=>{)(let \w+=new Map.{50,80}isEmojiDisabled\({emoji:\w+,channel:(\w+),intention:(\w+))/,
        replace: (
          _: string,
          prefix: string,
          emojis: string,
          section: string,
          suffix: string,
          channel: string,
          intention: string,
        ) =>
          `${prefix}` +
          `${emojis}=replugged?.plugins?.getExports('dev.tharki.HideDisabledEmojis')?._filteredEmojis(${emojis},${section},${channel},${intention});` +
          `if (!${emojis}.length) return;` +
          `${suffix}`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
