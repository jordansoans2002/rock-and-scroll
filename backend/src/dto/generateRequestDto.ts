import { z } from "zod";


// Style schema
const StyleSchema = z.object({
  fontFamily: z.string().min(1, "Font family is required"),
  fontSize: z.number().positive("Font size my be greater than 0"),
  fontColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color must be in hex format")
});

// Background schema
const BackgroundSchema = z.object({
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Color must be in hex format"),
    opacity: z.number().min(0).max(1)
})

// Padding schema
const PaddingSchema = z.object({
  left: z.number().nonnegative(),
  top: z.number().nonnegative(),
  right: z.number().nonnegative(),
  bottom: z.number().nonnegative()
});


// Separation schema
const SeparationSchema = z.object({
    symbol: z.string().nullable(),
    lines: z.number().int().positive().nullable()
}).refine( 
    (data) => data.symbol !== null || data.lines !== null,
    { message: "Either symbol for separation or number of lines per slide myst be provided"}
)

// Song settings schema
const SongSettingsSchema = z.object({
  separation: SeparationSchema,
  orientation: z.enum(["stacked", "sideBySide"]),
  stanzas: z.array(z.number().int().positive()),
  padding: PaddingSchema,
  text1Style: StyleSchema,
  text2Style: StyleSchema,
  background: BackgroundSchema
});

// Song schema
export const SongSchema = z.object({
  title: z.string().min(1),
  text1: z.string(),
  text2: z.string().nullable(),
  settings: SongSettingsSchema
});

// Root request schema
export const GenerateRequestSchema = z.object({
  settings: z.object({
    slideRatio: z.enum(["16x9", "4x3"]),
    unit: z.enum(["px", "in", "cm"]),
    titleStyle: StyleSchema
  }),
  songs: z.array(SongSchema).min(1, "At least one song is required")
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;
