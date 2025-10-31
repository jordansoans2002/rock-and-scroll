import PptxGenJS from "pptxgenjs";
import { IPresentationGenerator } from "./IPresentationGenerator";
import { Orientation, SLIDE_HEIGHT_INCHES, SLIDE_WIDTH_INCHES, SlideRatio, Unit } from "./layout";
import { TextStyle, SongSettings } from "@rock-and-scroll/shared/types/settings";


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

    slide.addText(title, {
      x: 0.5,
      y: "40%",
      w: "90%",
      h: 1,
      fontFace: titleStyle.fontFamily,
      fontSize: titleStyle.fontSize,
      color: titleStyle.fontColor,
      bold: true,
      align: titleStyle.align,
      valign: titleStyle.vAlign
    });
  }

  renderLyricsSlide(
    slide: PptxGenJS.Slide,
    settings: SongSettings,
    block: { text1: string | null; text2?: string | null },
    presentationSettings: { titleStyle: TextStyle; unit: Unit; slideRatio: SlideRatio }
  ) {
    const unit: Unit = presentationSettings.unit;
    const text1Style = settings.text1Style;
    const text2Style = settings.text2Style;
    const bg = settings.background;
    slide.background = { color: bg.color };

    // consider updating values in pre-processing of request
    const padding = settings.padding;
    const marginLeftIn = this.toInches(padding.left, unit);
    const marginRightIn = this.toInches(padding.right, unit);
    const marginTopIn = this.toInches(padding.top, unit);
    const marginBottomIn = this.toInches(padding.bottom, unit);
    const gap = this.toInches(padding.gap, unit);

    const contentWidthIn = SLIDE_WIDTH_INCHES[presentationSettings.slideRatio] - (marginLeftIn + marginRightIn);
    const contentHeightIn = SLIDE_HEIGHT_INCHES[presentationSettings.slideRatio] - (marginTopIn + marginBottomIn);

    const orientation: Orientation = settings.orientation;
    if (orientation === "sideBySide") {
      const colWidthIn = (contentWidthIn - gap) / 2;

      if(block.text1) {
        text1Style.fontSize = text1Style.fontSize ?? this.adaptiveFontSize(block.text1, text1Style.fontSize, block.text2? colWidthIn : contentWidthIn, contentHeightIn);
        slide.addText(block.text1, {
          x: marginLeftIn,
          y: marginTopIn,
          w: block.text2 ? colWidthIn : contentWidthIn,
          h: contentHeightIn,
          fontFace: text1Style.fontFamily,
          fontSize: text1Style.fontSize,
          color: text1Style.fontColor,
          align: text1Style.align,
          wrap: true,
          valign: text1Style.vAlign
        });
      }

      if (block.text2) {
        text2Style.fontSize = text2Style.fontSize ?? this.adaptiveFontSize(block.text2, text2Style.fontSize, colWidthIn, contentHeightIn);
        slide.addText(block.text2, {
          x: marginLeftIn + colWidthIn + gap,
          y: marginTopIn,
          w: colWidthIn,
          h: contentHeightIn,
          fontFace: text2Style.fontFamily,
          fontSize: text2Style.fontSize,
          color: text2Style.fontColor,
          align: text2Style.align,
          wrap: true,
          valign: text2Style.vAlign
        });
      }
    } else {
      const rowHeightIn = (contentHeightIn - gap) / 2;

      if(block.text1) {
        text1Style.fontSize = text1Style.fontSize ?? this.adaptiveFontSize(block.text1, text1Style.fontSize, contentWidthIn, block.text2 ? rowHeightIn : contentHeightIn);
        slide.addText(block.text1, {
          x: marginLeftIn,
          y: marginTopIn,
          w: contentWidthIn,
          h: block.text2 ? rowHeightIn : contentHeightIn,
          fontFace: text1Style.fontFamily,
          fontSize: text1Style.fontSize,
          color: text1Style.fontColor,
          align: text1Style.align,
          wrap: true,
          valign: text1Style.vAlign
        });
      }

      if (block.text2) {
        text2Style.fontSize = text2Style.fontSize ?? this.adaptiveFontSize(block.text2, text2Style.fontSize, contentWidthIn, rowHeightIn);
        slide.addText(block.text2, {
          x: marginLeftIn,
          y: marginTopIn + rowHeightIn + gap,
          w: contentWidthIn,
          h: rowHeightIn,
          fontFace: text2Style.fontFamily,
          fontSize: text2Style.fontSize,
          color: text2Style.fontColor,
          align: text2Style.align,
          wrap: true,
          valign: text2Style.vAlign
        });
      }
    }
  }

  private adaptiveFontSize(text: string, requestedSize: number | null | undefined, boxWidthIn: number, boxHeightIn: number) {
    const MAX_FONT = requestedSize && requestedSize > 0 ? requestedSize : 36;
    const MIN_FONT = 10;
    if (!text) return Math.max(MIN_FONT, Math.min(18, MAX_FONT));

    const charsPerInchAt12 = 8; // heuristic: approx chars per inch at font 12
    const baselineFont = 12;
    const approxCharsPerInchAtRequested = (charsPerInchAt12 * baselineFont) / MAX_FONT;
    const approxCharsPerLine = Math.max(10, Math.floor(boxWidthIn * approxCharsPerInchAtRequested));
    const lines = Math.max(1, text.split("\n").reduce((acc, l) => acc + Math.max(1, Math.ceil(l.length / approxCharsPerLine)), 0));
    const maxLinesThatFit = Math.floor(boxHeightIn * (72 / MAX_FONT)); // heuristic convert inches->points then divide
    if (requestedSize && requestedSize > 0) {
      if (lines <= maxLinesThatFit) return requestedSize;
    }

    // scale font down proportionally to fit lines into boxHeightIn
    const scaling = Math.max(0.3, Math.min(1, maxLinesThatFit / lines));
    let computed = Math.floor(MAX_FONT * scaling);
    if (computed < MIN_FONT) computed = MIN_FONT;
    return computed;
  }

  private toInches(value: number, unit: Unit): number {
    if (unit === "in") return value;
    if (unit === "cm") return value / 2.54;
    return value / 96;
  }
}