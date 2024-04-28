import { guilds as UltimateGuildsStore } from "replugged/common";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Types from "../types";

export default (): void => {
  const { EmojiStore, EmojiUtils, PickerSidebar } = Modules;
  PluginInjector.before(PickerSidebar, "default", (args: [Types.SidebarProps]) => {
    if (!SettingValues.get("emoji", defaultSettings.emoji)) return args;
    const [sidebarProps] = args;

    sidebarProps.categories = sidebarProps.categories.reduce((acc, category) => {
      if (
        !category?.guild ||
        (UltimateGuildsStore.getGuildId() == category?.guild?.id && !sidebarProps.children())
      ) {
        acc.push(category);
        return acc;
      }
      const UsableEmojisInGuild = EmojiStore.getGuildEmoji(category?.guild?.id).filter(
        (emoji) => !EmojiUtils.isEmojiDisabled({ emoji }),
      );
      if (UsableEmojisInGuild.length) acc.push(category);
      return acc;
    }, []);

    sidebarProps.rowCount = sidebarProps.categories.length;
    sidebarProps.rowCountBySection = [
      sidebarProps.categories.filter(({ type }) => type !== "GUILD" && type !== "UNICODE").length,
      sidebarProps.categories.filter(({ type }) => type == "GUILD").length,
      sidebarProps.categories.filter(({ type }) => type == "UNICODE").length,
    ];
    const originalRenderCategoryListItem = sidebarProps.renderCategoryListItem;
    sidebarProps.renderCategoryListItem = (...args) => {
      const res = originalRenderCategoryListItem.call(sidebarProps, ...args) as React.ReactElement;
      res.props.categories = sidebarProps.categories;
      res.props.category = sidebarProps.categories[res.props.categoryIndex];
      return res;
    };
    if (!sidebarProps.categories.some((category) => category?.type == "GUILD"))
      if (typeof sidebarProps?.children == "function") sidebarProps.children = () => null;
    return args;
  });
};
