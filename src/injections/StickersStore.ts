import { channels as UltimateChannelStore, users as UltimateUserStore } from "replugged/common";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Utils from "../lib/utils";
import Types from "../types";

export default (): void => {
  const { StickersStore, StickerSendabilityUtils } = Modules;
  const stickerMapCache = new Utils.LimitedMap<string, Map<string, Types.Sticker[]>>(50);
  PluginInjector.after(StickersStore, "getAllGuildStickers", (_args, res) => {
    if (!SettingValues.get("sticker", defaultSettings.sticker)) return res;
    const currnetUser = UltimateUserStore.getCurrentUser();
    const currentChannel = UltimateChannelStore.getChannel(UltimateChannelStore.getChannelId());
    if (stickerMapCache.has(`${currnetUser.id}-${currentChannel.id}`))
      return stickerMapCache.get(`${currnetUser.id}-${currentChannel.id}`);

    const filteredStickers = Array.from(res).map<[string, Types.Sticker[]]>(([id, stickers]) => [
      id,
      stickers.filter((c) =>
        StickerSendabilityUtils.isSendableSticker(c, currnetUser, currentChannel),
      ),
    ]);

    const filteredMap = new Map(filteredStickers);
    stickerMapCache.set(`${currnetUser.id}-${currentChannel.id}`, filteredMap);
    return filteredMap;
  });

  PluginInjector.after(StickersStore, "getStickersByGuildId", (_args, res) => {
    if (!SettingValues.get("sticker", defaultSettings.sticker)) return res;
    const currnetUser = UltimateUserStore.getCurrentUser();
    const currentChannel = UltimateChannelStore.getChannel(UltimateChannelStore.getChannelId());

    return res.filter((c) =>
      StickerSendabilityUtils.isSendableSticker(c, currnetUser, currentChannel),
    );
  });
};
