import { webpack } from "replugged";
import { PluginInjector } from "../index";
import { mappedEmojiCount } from "./EmojiPicker";
import { PickerSidebar } from "../lib/requiredModules";
import * as Types from "../types";
export const patchEmojiSidebar = (): void => {
  const SidebarRender = webpack.getFunctionKeyBySource(
    PickerSidebar,
    /substepHighlights:.*disableHighlight:.*shouldShowTutorial/,
  ) as unknown as string;
  PluginInjector.after(PickerSidebar, SidebarRender, (_args, res: Types.ReactElement) => {
    if (Array.isArray(res.props.children))
      res.props.children = res.props.children.filter((m: Types.ReactElement) =>
        mappedEmojiCount.get(m?.props?.category?.guild?.id),
      );
    return res;
  });
};
