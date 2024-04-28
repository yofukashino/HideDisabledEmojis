import { channels as UltimateChannelStore, users as UltimateUserStore } from "replugged/common";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Types from "../types";

export default (): void => {
  const { StickersStore, StickerSendabilityUtils } = Modules;
  PluginInjector.after(StickersStore, "getAllGuildStickers", (_args, res) => {
    if (!SettingValues.get("sticker", defaultSettings.sticker)) return res;
    const currnetUser = UltimateUserStore.getCurrentUser();
    const currentChannel = UltimateChannelStore.getChannel(UltimateChannelStore.getChannelId());
    const filteredStickers = Array.from(res).map<[string, Types.Sticker[]]>(([id, stickers]) => [
      id,
      stickers.filter((c) =>
        StickerSendabilityUtils.isSendableSticker(c, currnetUser, currentChannel),
      ),
    ]);
    return new Map(filteredStickers);
  });
};
