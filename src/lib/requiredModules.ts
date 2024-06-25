import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.EmojiUtils ??= await webpack
    .waitForProps<Types.EmojiUtils>(["isEmojiFilteredOrLocked", "isEmojiFiltered"], {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find EmojiUtils Module");
    });

  Modules.EmojiCategoryUtils ??= await webpack
    .waitForModule<Types.GenericModule>(
      webpack.filters.bySource("Messages.EMOJI_CATEGORY_TOP_GUILD_EMOJI"),
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find EmojiCategoryUtils Module");
    });

  Modules.StickerSendabilityUtilsModule ??= await webpack
    .waitForModule<Types.GenericModule>(webpack.filters.bySource(".SENDABLE_WITH_PREMIUM=1"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find StickerSendabilityUtils Module");
    });

  Modules.StickerSendabilityUtils ??= {
    StickerSendability: webpack.getExportsForProps(Modules.StickerSendabilityUtilsModule, [
      "NONSENDABLE",
      "SENDABLE",
    ]),
    getStickerSendability: webpack.getFunctionBySource(
      Modules.StickerSendabilityUtilsModule,
      "canUseCustomStickersEverywhere",
    ),
    isSendableSticker: webpack.getFunctionBySource(Modules.StickerSendabilityUtilsModule, "0==="),
  };

  Modules.SoundboardUtilsModule ??= await webpack
    .waitForModule<Types.GenericModule>(webpack.filters.bySource(".joinSound=void 0"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find SoundboardUtils Module");
    });

  Modules.SoundboardUtils ??= {
    canUseSoundboardSound: webpack.getFunctionBySource(
      Modules.SoundboardUtilsModule,
      "canUseSoundboardEverywhere",
    ),
    getAmplitudinalSoundboardVolume: webpack.getFunctionBySource(
      Modules.SoundboardUtilsModule,
      ".getSetting()",
    ),
    removeCustomJoinSound: webpack.getFunctionBySource(
      Modules.SoundboardUtilsModule,
      ".joinSound=void 0",
    ),
    updateCustomJoinSound: webpack.getFunctionBySource(
      Modules.SoundboardUtilsModule,
      ".joinSound={soundId:",
    ),
  };

  Modules.StickersStore ??= webpack.getByStoreName<Types.StickersStore>("StickersStore");
  Modules.SoundboardStore ??= webpack.getByStoreName<Types.SoundboardStore>("SoundboardStore");
};

export default Modules;
