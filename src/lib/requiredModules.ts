import { webpack } from "replugged";
import * as Types from "../types";

export const EmojiUtils = webpack.getByProps(
  "isEmojiFilteredOrLocked",
  "isEmojiFiltered",
) as unknown as Types.EmojiUtils;
export const PickerSidebar = webpack.getBySource(
  /substepHighlights:.*disableHighlight:.*shouldShowTutorial/,
) as unknown as Types.GenericModule;
