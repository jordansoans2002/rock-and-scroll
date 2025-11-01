import { SLIDE_HEIGHT_INCHES, SLIDE_WIDTH_INCHES, TextLayout } from "../types/layout";
import { Orientation, ORIENTATIONS, Padding, SlideRatio, TextStyle, Unit } from "../types/settings";

export function arrangeTitleSlide(
    titleStyle: TextStyle
): TextLayout {
    const textbox: TextLayout = {
      x: 0.5,
      y: 0.4, //"40%",
      w: 0.9,//"90%",
      h: 1,
      fontFace: titleStyle.fontFamily,
      fontSize: titleStyle.fontSize,
      color: titleStyle.fontColor,
      bold: true,
      align: titleStyle.align,
      valign: titleStyle.vAlign,
      wrap: false,
    }

    return textbox;
}


export function arrangeLyricsSlide(
    slideRatio: SlideRatio,
    orientation: Orientation,
    padding: Padding,
    unit: Unit,
    text1: boolean,
    text1Style: TextStyle,
    text2: boolean,
    text2Style: TextStyle,
): {textbox1: TextLayout|null, textbox2: TextLayout|null} {
    let textbox1: TextLayout|null = null;
    let textbox2: TextLayout|null = null;

    const marginLeftIn = toInches(padding.left, unit);
    const marginRightIn = toInches(padding.right, unit);
    const marginTopIn = toInches(padding.top, unit);
    const marginBottomIn = toInches(padding.bottom, unit);
    const gap = toInches(padding.gap, unit);

    const contentWidthIn = SLIDE_WIDTH_INCHES[slideRatio] - (marginLeftIn + marginRightIn);
    const contentHeightIn = SLIDE_HEIGHT_INCHES[slideRatio] - (marginTopIn + marginBottomIn);


    if (orientation === ORIENTATIONS.sideBySide) {
      const colWidthIn = (contentWidthIn - gap) / 2;

      if(text1) {
        text1Style.fontSize = text1Style.fontSize;
        textbox1 = {
          x: marginLeftIn,
          y: marginTopIn,
          w: text2 ? colWidthIn : contentWidthIn,
          h: contentHeightIn,
          fontFace: text1Style.fontFamily,
          fontSize: text1Style.fontSize,
          color: text1Style.fontColor,
          bold: false,
          align: text1Style.align,
          wrap: true,
          valign: text1Style.vAlign
        };
      }

      if (text2) {
        text2Style.fontSize = text2Style.fontSize
        textbox2 = {
          x: marginLeftIn + colWidthIn + gap,
          y: marginTopIn,
          w: colWidthIn,
          h: contentHeightIn,
          fontFace: text2Style.fontFamily,
          fontSize: text2Style.fontSize,
          color: text2Style.fontColor,
          bold: false,
          align: text2Style.align,
          wrap: true,
          valign: text2Style.vAlign
        };
      }
    } else {
      const rowHeightIn = (contentHeightIn - gap) / 2;

      if(text1) {
        text1Style.fontSize = text1Style.fontSize
        textbox1 = {
          x: marginLeftIn,
          y: marginTopIn,
          w: contentWidthIn,
          h: text2 ? rowHeightIn : contentHeightIn,
          fontFace: text1Style.fontFamily,
          fontSize: text1Style.fontSize,
          color: text1Style.fontColor,
          bold: false,
          align: text1Style.align,
          wrap: true,
          valign: text1Style.vAlign
        };
      }

      if (text2) {
        text2Style.fontSize = text2Style.fontSize
        textbox2 = {
          x: marginLeftIn,
          y: marginTopIn + rowHeightIn + gap,
          w: contentWidthIn,
          h: rowHeightIn,
          fontFace: text2Style.fontFamily,
          fontSize: text2Style.fontSize,
          color: text2Style.fontColor,
          bold: false,
          align: text2Style.align,
          wrap: true,
          valign: text2Style.vAlign
        };
      }
    }

    return { textbox1, textbox2 }
}

function toInches(value: number, unit: Unit): number {
    if (unit === "in") return value;
    if (unit === "cm") return value / 2.54;
    return value / 96;
}

function adaptiveFontSize(text: string, requestedSize: number | null | undefined, boxWidthIn: number, boxHeightIn: number) {
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