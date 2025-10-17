import { z } from "zod";
import type {
    Background,
    GeneratePresentationRequest,
    Padding,
    Separation,
    Song,
    TextStyle
} from "@rock-and-scroll/shared/types/settings"

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
    fontSize: z.number().positive("Font size my be greater than 0").default(DEFAULT_TEXT_STYLE.fontSize),
    fontColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color must be in hex format").default(DEFAULT_TEXT_STYLE.fontColor),
    align: z.enum(["left", "center", "right", "justify"]).default(DEFAULT_TEXT_STYLE.align),
    vAlign: z.enum(["top", "middle", "bottom"]).default(DEFAULT_TEXT_STYLE.vAlign)
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


// Separation schema
const SeparationSchema = z.object({
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
    orientation: z.enum(["stacked", "sideBySide"]).default("sideBySide"),
    stanzas: z.array(z.number().int().positive()).default([]),
    padding: PaddingSchema.default(DEFAULT_PADDING),
    text1Style: TextStyleSchema.default(DEFAULT_TEXT_STYLE),
    text2Style: TextStyleSchema.default(DEFAULT_TEXT_STYLE),
    background: BackgroundSchema.default(DEFAULT_BACKGROUND)
});

// Song schema
export const SongSchema = z.object({
    title: z.string().default(""),
    text: z.object({
      text1: z.string(),
      text2: z.string().nullable()
    }),
    settings: SongSettingsSchema.default(DEFAULT_SONG_SETTINGS)
}) satisfies z.ZodType<Song>;

// Root request schema
export const GeneratePresentationRequestSchema = z.object({
    settings: z.object({
      slideRatio: z.enum(["16x9", "4x3"]).default("16x9"),
      unit: z.enum(["px", "in", "cm"]).default("in"),
      titleStyle: TextStyleSchema.default(DEFAULT_TEXT_STYLE)
    }).default(DEFAULT_PRESENTATION_SETTINGS),
    songs: z.array(SongSchema).min(1, "At least one song is required")
}) satisfies z.ZodType<GeneratePresentationRequest>;