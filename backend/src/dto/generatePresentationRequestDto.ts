import { z } from "zod";
import {
    HORIZONTAL_ALIGNMENTS,
    ORIENTATIONS,
    SEPARATION_MODES,
    SLIDE_RATIOS,
    UNITS,
    VERTICAL_ALIGNMENTS,
    type Background,
    type Padding,
    type Separation,
    type SeparationMode,
    type Song,
    type TextStyle
} from "@rock-and-scroll/shared/types/settings"

import { type CreatePresentationRequest } from "@rock-and-scroll/shared/types/api"

import {
    DEFAULT_BACKGROUND,
    DEFAULT_PADDING,
    DEFAULT_PRESENTATION_SETTINGS,
    DEFAULT_SEPARATOR,
    DEFAULT_SONG_SETTINGS,
    DEFAULT_TEXT_STYLE
} from "@rock-and-scroll/shared/defaults/defaultSettings"

// Style schema
const TextStyleSchema = z.object({
    fontFamily: z.string().default(DEFAULT_TEXT_STYLE.fontFamily),
    fontSize: z.number().positive("Font size must be greater than 0").default(DEFAULT_TEXT_STYLE.fontSize),
    fontColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color must be in hex format").default(DEFAULT_TEXT_STYLE.fontColor),
    align: z.enum([HORIZONTAL_ALIGNMENTS.center, HORIZONTAL_ALIGNMENTS.left, HORIZONTAL_ALIGNMENTS.right, HORIZONTAL_ALIGNMENTS.justify]).default(DEFAULT_TEXT_STYLE.align),
    vAlign: z.enum([VERTICAL_ALIGNMENTS.middle, VERTICAL_ALIGNMENTS.top, VERTICAL_ALIGNMENTS.bottom]).default(DEFAULT_TEXT_STYLE.vAlign)
}) satisfies z.ZodType<TextStyle>;

// Background schema
const BackgroundSchema = z.object({
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color must be in hex format").default(DEFAULT_BACKGROUND.color),
}) satisfies z.ZodType<Background>;

// Padding schema
const PaddingSchema = z.object({
    left: z.number().nonnegative().default(DEFAULT_PADDING.left),
    top: z.number().nonnegative().default(DEFAULT_PADDING.top),
    right: z.number().nonnegative().default(DEFAULT_PADDING.right),
    bottom: z.number().nonnegative().default(DEFAULT_PADDING.bottom),
    gap: z.number().nonnegative().default(DEFAULT_PADDING.gap)
}) satisfies z.ZodType<Padding>;


const SeparationModeSchema = z.enum([
    SEPARATION_MODES.blankLines,
    SEPARATION_MODES.linesPerSlide,
    SEPARATION_MODES.symbol,
    SEPARATION_MODES.blankLines_linesPerSlide,
    SEPARATION_MODES.symbol_linesPerSlide,
]) satisfies z.ZodType<SeparationMode>;

// Separation schema
const SeparationSchema = z.object({
    separationMode: SeparationModeSchema,
    blankLines: z.number().int().positive().nullable().optional(),
    symbol: z.string().nullable().optional(),
    lines: z.number().int().positive().nullable().optional()
}).transform((data) => {
    const noSymbol = data.symbol == null || data.symbol === "";
    const noLines = data.lines == null;
    if (noSymbol && noLines) {
        return { ...data, symbol: "\r\n\r\n\r\n"}
    }
    return data
}) satisfies z.ZodType<Separation>;

// Song settings schema
const SongSettingsSchema = z.object({
    separation: SeparationSchema.default(DEFAULT_SEPARATOR),
    orientation: z.enum([ORIENTATIONS.stacked, ORIENTATIONS.sideBySide]).default(ORIENTATIONS.sideBySide),
    stanzas: z.array(z.number().int().positive()).default([]),
    padding: PaddingSchema.default(DEFAULT_PADDING),
    text1Style: TextStyleSchema.default(DEFAULT_TEXT_STYLE),
    text2Style: TextStyleSchema.default(DEFAULT_TEXT_STYLE),
    background: BackgroundSchema.default(DEFAULT_BACKGROUND)
});

// Song schema
export const SongSchema = z.object({
    id: z.string(),
    title: z.string().default(""),
    lang1: z.string().nullable(),
    text1: z.string().nullable(),
    lang2: z.string().nullable(),
    text2: z.string().nullable(),
    settings: SongSettingsSchema.default(DEFAULT_SONG_SETTINGS)
}) satisfies z.ZodType<Song>;

// Root request schema
export const CreatePresentationRequestSchema = z.object({
    presentationSettings: z.object({
      slideRatio: z.enum([SLIDE_RATIOS._16x9, SLIDE_RATIOS._4x3]).default(DEFAULT_PRESENTATION_SETTINGS.slideRatio),
      unit: z.enum([UNITS.px, UNITS.cm, UNITS.in]).default(DEFAULT_PRESENTATION_SETTINGS.unit),
      titleStyle: TextStyleSchema.default(DEFAULT_PRESENTATION_SETTINGS.titleStyle)
    }).default(DEFAULT_PRESENTATION_SETTINGS),
    songs: z.array(SongSchema).min(1, "At least one song is required")
}) satisfies z.ZodType<CreatePresentationRequest>;