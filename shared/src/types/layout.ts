import { HorizontalAlignment, SlideRatio, VerticalAlignment } from "./settings"

export const SLIDE_WIDTH_INCHES: Record<SlideRatio, number> = {
    "16x9": 13.33,
    "4x3": 10
}

export const SLIDE_HEIGHT_INCHES: Record<SlideRatio, number> = {
    "16x9": 7.5,
    "4x3": 7.5
}

export interface TextLayout {
    x: number|string;
    y: number|string;
    w: number|string;
    h: number|string;
    fontFace: string;
    fontSize: number;
    color: string;
    bold: boolean;
    align: HorizontalAlignment;
    valign: VerticalAlignment;
    wrap: boolean;
} 