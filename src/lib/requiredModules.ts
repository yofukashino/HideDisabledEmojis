import { webpack } from "replugged";
import * as Types from "../types";

export const EmojiUtils = webpack.getByProps(
  "isEmojiFilteredOrLocked",
  "isEmojiFiltered",
) as unknown as Types.EmojiUtils;
