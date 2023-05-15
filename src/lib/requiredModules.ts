import { webpack } from "replugged";
import * as Types from "../types";

export const EmojiUtils = webpack.getByProps(
  "isEmojiFilteredOrLocked",
  "isEmojiFiltered",
) as unknown as Types.EmojiUtils;
export const EmojiStore = webpack.getByProps([
  "getBackfillTopEmojis",
  "getGuildEmoji",
]) as unknown as Types.EmojiStore;

export const { exports: PickerSidebar } = webpack.getBySource(
  /rowCountBySection:\w+,renderSection:\w+/,
  { raw: true },
) as unknown as Types.GenericExport;
