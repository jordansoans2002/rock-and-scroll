import PptxGenJS from "pptxgenjs";
import { GeneratePresentationRequest, SongSettings, TextStyle } from "../../dto/generatePresentationRequestDto";
import { IPresentationGenerator } from "./IPresentationGenerator";
import { SlideRatio, Unit } from "./layout";

export class MockGenerator implements IPresentationGenerator {
    renderSlideLayout(ratio: SlideRatio): PptxGenJS {
        throw new Error("Method not implemented.");
    }
    renderTitleSlide(slide: PptxGenJS.Slide, title: string, titleStyle: TextStyle, background: { color: string; }): void {
        throw new Error("Method not implemented.");
    }
    renderLyricsSlide(slide: PptxGenJS.Slide, settings: SongSettings, block: { text1: string; text2?: string | null; }, presentationSettings: { titleStyle: TextStyle; unit: Unit; slideRatio: SlideRatio; }): void {
        throw new Error("Method not implemented.");
    }
    generatePresentationBuffer(presentation: PptxGenJS): Promise<Buffer> {
        throw new Error("Method not implemented.");
    }
}