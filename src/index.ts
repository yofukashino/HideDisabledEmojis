import { Injector, Logger, settings } from "replugged";
import { defaultSettings } from "./lib/consts";
export const PluginLogger = Logger.plugin("HideDisabledEmojis");
export const SettingValues = await settings.init("dev.tharki.HideDisabledEmojis", defaultSettings);
export const PluginInjector = new Injector();
import Settings from "./Components/Settings";
import Injections from "./injections/index";

export const start = (): void => {
  Settings.registerSettings();
  void Injections.applyInjections().catch((err) => PluginLogger.error(err));;
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};

export { Settings } from "./Components/Settings";

export { _filteredEmojis } from "./plaintextFunctions";
