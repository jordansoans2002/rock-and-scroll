import PptxGenJS from "pptxgenjs";
import { IPresentationGenerator } from "./IPresentationGenerator";
import { TextStyle, SongSettings, ORIENTATIONS, SlideRatio, Unit, Orientation } from "@rock-and-scroll/shared/types/settings";
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

    slide.addText(
      title,
      arrangeTitleSlide(titleStyle)
    );
  }

  renderLyricsSlide(
    slide: PptxGenJS.Slide,
    settings: SongSettings,
    block: { text1: string | null; text2: string | null },
    presentationSettings: { titleStyle: TextStyle; unit: Unit; slideRatio: SlideRatio }
  ) {
    const unit: Unit = presentationSettings.unit;
    const text1Style = settings.text1Style;
    const text2Style = settings.text2Style;
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
      slide.addText(block.text1, textboxes.textbox1);
    }
    if(block.text2 && textboxes.textbox2) {
      slide.addText(block.text2, textboxes.textbox2);
    }
  }
}