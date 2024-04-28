import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.EmojiUtils ??= await webpack.waitForProps<Types.EmojiUtils>(
    "isEmojiFilteredOrLocked",
    "isEmojiFiltered",
  );
  Modules.PickerSidebar ??= await webpack
    .waitForModule<Types.GenericExport>(
      webpack.filters.bySource(".useExpressionPickerStore.getState"),
      { raw: true },
    )
    .then(({ exports }) => exports);
  Modules.EmojiPicker ??= await webpack.waitForModule<Types.EmojiPicker>(
    webpack.filters.bySource("emoji-picker-inline-upsell"),
  );
  Modules.StickerSendabilityUtils ??= await webpack.waitForProps<Types.StickerSendabilityUtils>(
    "getStickerSendability",
  );
  Modules.SoundboardUtils ??= await webpack.waitForProps<Types.SoundboardUtils>(
    "canUseSoundboardSound",
    "removeCustomJoinSound",
  );
  Modules.EmojiStore ??= webpack.getByStoreName<Types.EmojiStore>("EmojiStore");
  Modules.StickersStore ??= webpack.getByStoreName<Types.StickersStore>("StickersStore");
  Modules.SoundboardStore ??= webpack.getByStoreName<Types.SoundboardStore>("SoundboardStore");
};

export default Modules;
