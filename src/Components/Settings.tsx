import { util } from "replugged";
import { SwitchItem } from "replugged/components";
import { PluginLogger, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Types from "../types";
export const registerSettings = (): void => {
  for (const key in defaultSettings) {
    if (SettingValues.has(key as keyof Types.Settings)) return;
    PluginLogger.log(`Adding new setting ${key} with value ${defaultSettings[key]}.`);
    SettingValues.set(key as keyof Types.Settings, defaultSettings[key]);
  }
};

export const Settings = () => {
  return (
    <div>
      <SwitchItem
        note="Hide Emojis you can't send."
        {...util.useSetting(SettingValues, "emoji", defaultSettings.emoji)}>
        Emojis
      </SwitchItem>
      <SwitchItem
        note="Hide Stickers you can't send."
        {...util.useSetting(SettingValues, "sticker", defaultSettings.sticker)}>
        Stickers
      </SwitchItem>
      <SwitchItem
        note="Hide Sounds you can't send."
        {...util.useSetting(SettingValues, "sound", defaultSettings.sound)}>
        Sounds
      </SwitchItem>
    </div>
  );
};

export default { registerSettings, Settings };
