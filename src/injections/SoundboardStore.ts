import { channels as UltimateChannelStore, users as UltimateUserStore } from "replugged/common";
import { PluginInjector, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import Types from "../types";

export default (): void => {
  const { SoundboardStore, SoundboardUtils } = Modules;
  PluginInjector.after(SoundboardStore, "getSounds", (_args, res) => {
    if (!SettingValues.get("sound", defaultSettings.sound)) return res;
    const currnetUser = UltimateUserStore.getCurrentUser();
    const currentChannel = UltimateChannelStore.getChannel(UltimateChannelStore.getChannelId());
    const filteredStickers = Array.from(res).map<[string, Types.Sound[]]>(([id, sounds]) => [
      id,
      sounds.filter((c) => SoundboardUtils.canUseSoundboardSound(currnetUser, c, currentChannel)),
    ]);
    return new Map(filteredStickers);
  });
};
