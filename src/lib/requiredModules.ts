import { webpack } from "replugged";
import * as Types from "../types";

export const EmojiUtils = webpack.getByProps<Types.EmojiUtils>([
  "isEmojiFilteredOrLocked",
  "isEmojiFiltered",
]);
export const EmojiStore = webpack.getByProps<Types.EmojiStore>([
  "getBackfillTopEmojis",
  "getGuildEmoji",
]);

export const { exports: PickerSidebar } = webpack.getBySource<Types.GenericExport>(
  /rowCountBySection:\w+,renderSection:\w+/,
  { raw: true },
);

export const { exports: EmojiPicker } = webpack.getBySource<Types.GenericExport>("emojiListRef:", {
  raw: true,
});
