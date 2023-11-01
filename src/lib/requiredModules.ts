import { webpack } from "replugged";
import * as Types from "../types";

export const EmojiUtils = webpack.getByProps<Types.EmojiUtils>([
  "isEmojiFilteredOrLocked",
  "isEmojiFiltered",
]);
export const EmojiStore = webpack.getByStoreName<Types.EmojiStore>("EmojiStore");

export const { exports: PickerSidebar } = webpack.getBySource<Types.GenericExport>(
  ".useExpressionPickerStore.getState",
  { raw: true },
);

export const EmojiPicker = webpack.getBySource<Types.EmojiPicker>("emoji-picker-inline-upsell");
