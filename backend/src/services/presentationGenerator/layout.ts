export type SlideRatio = "16x9" | "4x3"
export type Unit = "px" | "in" | "cm";
export type Orientation = "stacked" | "sideBySide";

export const SLIDE_WIDTH_INCHES: Record<SlideRatio, number> = {
    "16x9": 13.33,
    "4x3": 10
}

export const SLIDE_HEIGHT_INCHES: Record<SlideRatio, number> = {
    "16x9": 7.5,
    "4x3": 7.5
}