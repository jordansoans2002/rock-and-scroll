import { z } from "zod";
import { DEFAULT_BACKGROUND, DEFAULT_PADDING, DEFAULT_SEPARATOR, DEFAULT_TEXT_STYLE } from "./defaults";


// Style schema
const TextStyleSchema = z.object({
    fontFamily: z.string().default("Arial"),
    fontSize: z.number().positive("Font size my be greater than 0").default(32),
    fontColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color must be in hex format").default("#000000"),
    align: z.enum(["left", "center", "right", "justify"]).default("center"),
    vAlign: z.enum(["top", "middle", "bottom"]).default("middle")
});

// Background schema
const BackgroundSchema = z.object({
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color must be in hex format").default("#FFFFFF"),
    opacity: z.number().min(0).max(1).default(1)
})

// Padding schema
const PaddingSchema = z.object({
    left: z.number().nonnegative().default(12),
    top: z.number().nonnegative().default(12),
    right: z.number().nonnegative().default(12),
    bottom: z.number().nonnegative().default(12),
    gap: z.number().nonnegative().default(12)
});


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
})

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
    settings: SongSettingsSchema
});

// Root request schema
export const GeneratePresentationRequestSchema = z.object({
    settings: z.object({
      slideRatio: z.enum(["16x9", "4x3"]).default("16x9"),
      unit: z.enum(["px", "in", "cm"]).default("px"),
      titleStyle: TextStyleSchema.default(DEFAULT_TEXT_STYLE)
    }),
    songs: z.array(SongSchema).min(1, "At least one song is required")
});


export type TextStyle = z.infer<typeof TextStyleSchema>
export type Padding = z.infer<typeof PaddingSchema>
export type Background = z.infer<typeof BackgroundSchema>
export type Separation = z.infer<typeof SeparationSchema>
export type SongSettings = z.infer<typeof SongSettingsSchema>
export type GeneratePresentationRequest = z.infer<typeof GeneratePresentationRequestSchema>;
