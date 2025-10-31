import { CreatePresentationRequest } from "@rock-and-scroll/shared/types/api";
import config from "../config";
import { IPresentationGenerator } from "../services/presentationGenerator/IPresentationGenerator";
import { SEPARATION_MODES } from "@rock-and-scroll/shared/types/settings";
import { splitByBlankLines, splitByLinesPerSlide, splitBySymbol } from "@rock-and-scroll/shared/utils/separateIntoSlides"
import { sl } from "zod/v4/locales";

export class GeneratePresentationUseCase {
  constructor(private generator: IPresentationGenerator) { }

  async execute(payload: CreatePresentationRequest): Promise<Buffer> {
    if (payload.songs.length > config.pptRequestLimits.maxSongs) {
      throw new Error(`Too many songs. Max songs allowed at a time are ${config.pptRequestLimits.maxSongs}`)
    }

    const presentation = this.generator.renderSlideLayout(payload.presentationSettings.slideRatio)
    for (const song of payload.songs) {

      const stanzas = this.splitByStanzas(song.text1, song.text2, song.settings.stanzas)
      const slides: { text1: string | null; text2: string | null }[] = []
      for (const stanza of stanzas) {
        let parts: { text1: string | null; text2: string | null }[] = [];
        if (song.settings.separation.separationMode.includes(SEPARATION_MODES.blankLines)) {
          // split by blank lines
          parts = splitByBlankLines(stanza.text1, stanza.text2, song.settings.separation.blankLines ?? 2);
          if (parts.length > config.pptRequestLimits.maxSlidesPerSong) {
            throw new Error(`Song: ${song.title} is separated by ${song.settings.separation.lines} blank lines into too many slides. Max allowed is ${config.pptRequestLimits.maxSlidesPerSong}`);
          }
        }
        if (song.settings.separation.separationMode.includes(SEPARATION_MODES.symbol)) {
          // split by symbol
          parts = splitBySymbol(stanza.text1, stanza.text2, song.settings.separation.symbol ?? ";");
          if (parts.length > config.pptRequestLimits.maxSlidesPerSong) {
            throw new Error(`Song: ${song.title} is separated by symbol ${song.settings.separation.symbol} into too many slides. Max allowed is ${config.pptRequestLimits.maxSlidesPerSong}`);
          }
        }
        if (song.settings.separation.separationMode.includes(SEPARATION_MODES.linesPerSlide)) {
          // split by symbol
          parts = splitByLinesPerSlide(stanza.text1, stanza.text2, song.settings.separation.lines ?? 1);
          if (parts.length > config.pptRequestLimits.maxSlidesPerSong) {
            throw new Error(`Song: ${song.title} is separated by ${song.settings.separation.lines} lines per slide into too many slides. Max allowed is ${config.pptRequestLimits.maxSlidesPerSong}`);
          }
        }

        if (parts)
          slides.push(...parts);
      }


      this.generator.renderTitleSlide(presentation.addSlide(), song.title, payload.presentationSettings.titleStyle, song.settings.background)
      for (const slide of slides) {
        this.generator.renderLyricsSlide(presentation.addSlide(), song.settings, slide, payload.presentationSettings);
      }
    }

    return this.generator.generatePresentationBuffer(presentation);
  }

  private splitByStanzas(text1: string | null, text2: string | null, stanzas: Array<Number>) {
    if (stanzas.length == 0) {
      return [{ text1, text2 }]
    }
    return [{ text1, text2 }]
  }
}
