import PptxGenJS from "pptxgenjs";
import { GeneratePresentationRequest, SongSettings, TextStyle } from "../../dto/generatePresentationRequestDto";
import { SlideRatio, Unit } from "./layout";

/**
 * IPptGenerator defines the contract for any PPTX generator implementation.
 * - It takes a validated GenerateRequest (your JSON payload).
 * - It returns a Buffer containing the binary PPTX file.
 *
 * This allows you to swap implementations (mock vs real) without changing
 * controllers or use cases.
 */
export interface IPresentationGenerator {
    renderSlideLayout(ratio: SlideRatio): PptxGenJS;
    
    renderTitleSlide(
        slide: PptxGenJS.Slide, 
        title: string,
        titleStyle: TextStyle,
        background: { color: string; },
    ): void;

    renderLyricsSlide(
        slide: PptxGenJS.Slide,
        settings: SongSettings,
        block: { text1: string; text2?: string | null },
        presentationSettings: { titleStyle: TextStyle; unit: Unit; slideRatio: SlideRatio }
    ): void

    generatePresentationBuffer(presentation: PptxGenJS): Promise<Buffer>    
}