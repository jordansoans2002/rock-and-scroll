import PptxGenJS from "pptxgenjs";
import { IPresentationGenerator } from "./IPresentationGenerator";
import { TextStyle, SongSettings, SlideRatio, Unit } from "@rock-and-scroll/shared/types/settings";
import { SLIDE_HEIGHT_INCHES, SLIDE_WIDTH_INCHES } from "@rock-and-scroll/shared/types/layout";
import { arrangeLyricsSlide, arrangeTitleSlide } from "@rock-and-scroll/shared/utils/arrangeInSlide";


export class RealPresentationGenerator implements IPresentationGenerator {
  renderSlideLayout(ratio: SlideRatio): PptxGenJS {
    const pptx = new PptxGenJS();

    pptx.defineLayout({ name: "LAYOUT", width: SLIDE_WIDTH_INCHES[ratio], height: SLIDE_HEIGHT_INCHES[ratio] });
    pptx.layout = "LAYOUT";

    return pptx
  }

  async generatePresentationBuffer(presentation: PptxGenJS): Promise<Buffer> {
    const arrayBuffer = await presentation.write({ outputType: "arraybuffer" });
    return Buffer.from(arrayBuffer as ArrayBuffer);
  }

  renderTitleSlide(
    slide: PptxGenJS.Slide, 
    title: string,
    titleStyle: TextStyle,
    background: { color: string; },
  ) {
    //todo get 
    slide.background = {
        color: background.color,
    };

    const textbox = arrangeTitleSlide(titleStyle)
    slide.addText(
      title,
      {
        x: textbox.x as PptxGenJS.Coord,
        y: textbox.y as PptxGenJS.Coord,
        w: textbox.w as PptxGenJS.Coord,
        h: textbox.h as PptxGenJS.Coord,
        fontFace: textbox.fontFace,
        fontSize: textbox.fontSize,
        color: textbox.color,
        bold: textbox.bold,
        align: textbox.align,
        valign: textbox.valign,
        wrap: textbox.wrap,
      }
    );
  }

  renderLyricsSlide(
    slide: PptxGenJS.Slide,
    settings: SongSettings,
    block: { text1: string | null; text2: string | null },
    presentationSettings: { titleStyle: TextStyle; unit: Unit; slideRatio: SlideRatio }
  ) {
    const bg = settings.background;
    slide.background = { color: bg.color };

    const textboxes = arrangeLyricsSlide(
      presentationSettings.slideRatio,
      settings.orientation,
      settings.padding,
      presentationSettings.unit,
      block.text1 ? true : false,
      settings.text1Style,
      block.text2 ? true : false,
      settings.text2Style,
    )

    if(block.text1 && textboxes.textbox1) {
      slide.addText(
        block.text1,
        {
          x: textboxes.textbox1.x as PptxGenJS.Coord,
          y: textboxes.textbox1.y as PptxGenJS.Coord,
          w: textboxes.textbox1.w as PptxGenJS.Coord,
          h: textboxes.textbox1.h as PptxGenJS.Coord,
          fontFace: textboxes.textbox1.fontFace,
          fontSize: textboxes.textbox1.fontSize,
          color: textboxes.textbox1.color,
          bold: textboxes.textbox1.bold,
          align: textboxes.textbox1.align,
          valign: textboxes.textbox1.valign,
          wrap: textboxes.textbox1.wrap,
        }
      );
    }
    if(block.text2 && textboxes.textbox2) {
      slide.addText(
        block.text2, 
        {
          x: textboxes.textbox2.x as PptxGenJS.Coord,
          y: textboxes.textbox2.y as PptxGenJS.Coord,
          w: textboxes.textbox2.w as PptxGenJS.Coord,
          h: textboxes.textbox2.h as PptxGenJS.Coord,
          fontFace: textboxes.textbox2.fontFace,
          fontSize: textboxes.textbox2.fontSize,
          color: textboxes.textbox2.color,
          bold: textboxes.textbox2.bold,
          align: textboxes.textbox2.align,
          valign: textboxes.textbox2.valign,
          wrap: textboxes.textbox2.wrap,
        }
      );
    }
  }
}