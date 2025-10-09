import config from "../config";
import { GeneratePresentationRequest } from "../dto/generatePresentationRequestDto";
import { IPresentationGenerator } from "../services/presentationGenerator/IPresentationGenerator";

export class GeneratePresentationUseCase {
    constructor(private generator: IPresentationGenerator) {}

    async execute(payload: GeneratePresentationRequest): Promise<Buffer> {
        if(payload.songs.length > config.pptRequestLimits.maxSongs) {
            throw new Error(`Too many songs. Max songs allowed at a time are ${config.pptRequestLimits.maxSongs}`)
        }

        const presentation = this.generator.renderSlideLayout(payload.settings.slideRatio)        
        for(const song of payload.songs) {
            // TODO integrate separation by stanzas
            const partsByStanza = this.splitByStanzas(song.text, song.settings.stanzas)
            const partsBySybmol = this.splitBySymbol(song.text, song.settings.separation.symbol);
            if(partsBySybmol.length > config.pptRequestLimits.maxSlidesPerSong) {
                throw new Error(`Song: ${song.title} is separated by symbol ${song.settings.separation.symbol} into too many slides. Max allowed is ${config.pptRequestLimits.maxSlidesPerSong}`)
            }

            this.generator.renderTitleSlide(presentation.addSlide(), song.title, payload.settings.titleStyle, song.settings.background)
            for (const part of partsBySybmol) {
                const partsByLine = this.splitByLines(part, song.settings.separation.lines);
                if(partsBySybmol.length > config.pptRequestLimits.maxSlidesPerSong) {
                    throw new Error(`Song: ${song.title} is separated by ${song.settings.separation.lines} lines per slide into too many slides. Max allowed is ${config.pptRequestLimits.maxSlidesPerSong}`)
                }

                for (const block of partsByLine) {
                    this.generator.renderLyricsSlide(presentation.addSlide(), song.settings, block, payload.settings);
                }
            }
        }    
        
        return this.generator.generatePresentationBuffer(presentation);
    }

    private splitByStanzas(text: { text1: string; text2?: string | null; }, stanzas: Array<Number>) {
        if (stanzas.length == 0) {
            return text
        }
    }

    private splitBySymbol(text: { text1: string; text2?: string | null; }, symbol?: string | null) {
        const raw1 = text.text1 ?? "";
        const raw2 = text.text2 ?? null;
        if (!symbol) return [{ text1: raw1.trim(), text2: raw2 ? raw2.trim() : null }];
    
        const parts1 = raw1.split(symbol);
        const parts2 = raw2 ? raw2.split(symbol) : null;
        const max = Math.max(parts1.length, parts2?.length ?? 0);
    
        const out: { text1: string; text2: string | null }[] = [];
        for (let i = 0; i < max; i++) {
          out.push({
            text1: (parts1[i] ?? "").trim(),
            text2: parts2 ? (parts2[i] ?? "").trim() : null
          });
        }
        return out;
      }
    
      private splitByLines(
        part: { text1: string; text2?: string | null },
        linesPerSlide?: number | null
      ): { text1: string; text2?: string | null }[] {
        const n = typeof linesPerSlide === "number" && Number.isInteger(linesPerSlide) && linesPerSlide > 0 ? linesPerSlide : null;
        if (!n) return [part];
    
        const lines1 = part.text1.split("\n").map((l) => l.trim()).filter(Boolean);
        const lines2 = part.text2 ? part.text2.split("\n").map((l) => l.trim()).filter(Boolean) : null;
    
        const chunks1 = chunk(lines1, n).map((c) => c.join("\n"));
        const chunks2 = lines2 ? chunk(lines2, n).map((c) => c.join("\n")) : null;
    
        const max = Math.max(chunks1.length, chunks2?.length ?? 0);
        const out: { text1: string; text2: string | null }[] = [];
        for (let i = 0; i < max; i++) {
          out.push({
            text1: chunks1[i] ?? "",
            text2: chunks2 ? chunks2[i] ?? "" : null
          });
        }
        return out;
      }
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}