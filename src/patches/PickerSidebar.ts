import { webpack } from "replugged";
import { PluginInjector } from "../index";
import { EmojiStore, EmojiUtils, PickerSidebar } from "../lib/requiredModules";
import * as Types from "../types";
export const patchEmojiSidebar = (): void => {
  const SidebarRender = webpack.getFunctionKeyBySource(
    PickerSidebar,
    /rowCountBySection:\w+,renderSection:\w+/,
  ) as unknown as string;
  PluginInjector.before(PickerSidebar, SidebarRender, (args) => {
    const [sidebarProps] = args;
    sidebarProps.categories = sidebarProps.categories
      .map((category) => {
        if (!category?.guild) return category;
        const UsableEmojisInGuild = EmojiStore.getGuildEmoji(category?.guild?.id).filter(
          (emoji) => !EmojiUtils.isEmojiDisabled(emoji),
        );
        if (UsableEmojisInGuild.length) return category;
        return null;
      })
      .filter(Boolean);
    sidebarProps.rowCount = sidebarProps.categories.length;
    sidebarProps.rowCountBySection = [
      sidebarProps.categories.filter(({ type }) => type !== "GUILD" && type !== "UNICODE").length,
      sidebarProps.categories.filter(({ type }) => type == "GUILD").length,
      sidebarProps.categories.filter(({ type }) => type == "UNICODE").length,
    ];
    PluginInjector.after(
      sidebarProps,
      "renderCategoryListItem",
      (_args, res: Types.ReactElement) => {
        res.props.categories = sidebarProps.categories;
        res.props.category = sidebarProps.categories[res.props.categoryIndex];
        return res;
      },
    );
    return args;
  });
};
