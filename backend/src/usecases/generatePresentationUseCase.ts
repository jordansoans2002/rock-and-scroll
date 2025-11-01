import { CreatePresentationRequest } from "@rock-and-scroll/shared/types/api";
import { IPresentationGenerator } from "../services/presentationGenerator/IPresentationGenerator";
import { SEPARATION_MODES } from "@rock-and-scroll/shared/types/settings";
import { splitByBlankLines, splitByLinesPerSlide, splitByStanzas, splitBySymbol, splitLyrics } from "@rock-and-scroll/shared/utils/separateIntoSlides"
import { sl } from "zod/v4/locales";
import { config } from "@rock-and-scroll/shared/config";

export class GeneratePresentationUseCase {
  constructor(private generator: IPresentationGenerator) { }

  async execute(payload: CreatePresentationRequest): Promise<Buffer> {
    if (payload.songs.length > config.maxSongs) {
      throw new Error(`Too many songs. Max songs allowed at a time are ${config.maxSongs}`)
    }

    const presentation = this.generator.renderSlideLayout(payload.presentationSettings.slideRatio)
    for (const song of payload.songs) {
      const slideText = splitLyrics(song)
      this.generator.renderTitleSlide(presentation.addSlide(), song.title, payload.presentationSettings.titleStyle, song.settings.background)
      for (const slide of slideText) {
        this.generator.renderLyricsSlide(presentation.addSlide(), song.settings, slide, payload.presentationSettings);
      }
    }

    return this.generator.generatePresentationBuffer(presentation);
  }
}
