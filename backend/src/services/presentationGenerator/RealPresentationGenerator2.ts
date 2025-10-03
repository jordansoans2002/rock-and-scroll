import PptxGenJS from "pptxgenjs"
import { GeneratePresentationRequest } from "../../dto/generatePresentationRequestDto"
import { IPresentationGenerator } from "./IPresentationGenerator"


type SlideRatio = "16x9" | "4x3"
type Unit = "px" | "cm" | "in"
interface SlidePart {
  text1Lines: string[];
  text2Lines: string[] | null;
}

export class RealPresentationGenerator2 implements IPresentationGenerator {
    async generate(payload: GeneratePresentationRequest): Promise<Buffer> {
        const pptx = new PptxGenJS();

        // Set slide ratio
        pptx.defineLayout({ name: "LAYOUT_16x9", width: 13.33, height: 7.5 });
        pptx.defineLayout({ name: "LAYOUT_4x3", width: 10, height: 7.5 });
        pptx.layout = payload.settings.slideRatio === "4x3" ? "LAYOUT_4x3" : "LAYOUT_16x9";

        // Process each song
        for (const song of payload.songs) {
            const { text, settings } = song;
            const symbol = settings.separation.symbol || "\n\n\n";
            const linesPerSlide = settings.separation.lines;

            // Add title slide for the song
            const titleSlide = pptx.addSlide();
            titleSlide.background = {
                color: this.hexToRgb(settings.background.color),
                transparency: Math.round((1 - settings.background.opacity) * 100)
            };

            titleSlide.addText(song.title, {
                x: 0.5,
                y: "40%",
                w: "90%",
                h: 1,
                align: "center",
                valign: "middle",
                fontSize: payload.settings.titleStyle.fontSize,
                fontFace: payload.settings.titleStyle.fontFamily,
                color: this.hexToRgb(payload.settings.titleStyle.fontColor),
                bold: true
            });

            // Process song text into slide parts
            const slideParts = this.processSongText(
                text.text1,
                text.text2,
                symbol,
                linesPerSlide
            );

            // Create slides for each part
            for (const part of slideParts) {
                const slide = pptx.addSlide();

                // Set background
                slide.background = {
                    color: this.hexToRgb(settings.background.color),
                    transparency: Math.round((1 - settings.background.opacity) * 100)
                };

                const hasText2 = part.text2Lines && part.text2Lines.length > 0;
                const isSideBySide = settings.orientation === "sideBySide";

                if (hasText2 && isSideBySide) {
                    // Side by side layout
                    const slideWidth = payload.settings.slideRatio === "16x9" ? 13.33 : 10;
                    const contentWidth = (slideWidth - settings.padding.left - settings.padding.right) / 2 - 0.2;

                    // Text 1 (left side)
                    slide.addText(part.text1Lines.join('\n'), {
                        x: settings.padding.left / 100,
                        y: settings.padding.top / 100,
                        w: contentWidth,
                        h: (7.5 - (settings.padding.top + settings.padding.bottom) / 100),
                        fontSize: settings.text1Style.fontSize,
                        fontFace: settings.text1Style.fontFamily,
                        color: this.hexToRgb(settings.text1Style.fontColor),
                        align: "left",
                        valign: "top"
                    });

                    // Text 2 (right side)
                    slide.addText(part.text2Lines!!.join('\n'), {
                        x: (slideWidth / 2 + 0.1),
                        y: settings.padding.top / 100,
                        w: contentWidth,
                        h: (7.5 - (settings.padding.top + settings.padding.bottom) / 100),
                        fontSize: settings.text2Style.fontSize,
                        fontFace: settings.text2Style.fontFamily,
                        color: this.hexToRgb(settings.text2Style.fontColor),
                        align: "left",
                        valign: "top"
                    });
                } else {
                    // Stacked layout
                    const slideWidth = payload.settings.slideRatio === "16x9" ? 13.33 : 10;;
                    const contentWidth = slideWidth - (settings.padding.left + settings.padding.right) / 100;

                    let yPosition = settings.padding.top / 100;

                    // Text 1
                    const text1Content = part.text1Lines.join('\n');
                    slide.addText(text1Content, {
                        x: settings.padding.left / 100,
                        y: yPosition,
                        w: contentWidth,
                        h: hasText2 ? 3 : (7.5 - (settings.padding.top + settings.padding.bottom) / 100),
                        fontSize: settings.text1Style.fontSize,
                        fontFace: settings.text1Style.fontFamily,
                        color: this.hexToRgb(settings.text1Style.fontColor),
                        align: "center",
                        valign: hasText2 ? "bottom" : "middle"
                    });

                    // Text 2 (if exists)
                    if (hasText2) {
                        yPosition += 3.75;
                        const text2Content = part.text2Lines!.join('\n');
                        slide.addText(text2Content, {
                            x: settings.padding.left / 100,
                            y: yPosition,
                            w: contentWidth,
                            h: 3,
                            fontSize: settings.text2Style.fontSize,
                            fontFace: settings.text2Style.fontFamily,
                            color: this.hexToRgb(settings.text2Style.fontColor),
                            align: "center",
                            valign: "top"
                        });
                    }
                }
            }
        }

        const arrayBuffer = await pptx.write({ outputType: "arraybuffer" });
        return Buffer.from(arrayBuffer as ArrayBuffer);
    }


    /**
     * Splits text into parts based on the separation symbol
     */
    private splitIntoParts(text: string, symbol: string): string[] {
        if (!text) return [];
        return text.split(symbol).filter(part => part.trim().length > 0);
    }

    /**
     * Splits a part into lines
     */
    private splitIntoLines(part: string): string[] {
        return part.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    }

    /**
     * Groups lines into slide parts based on linesPerSlide
     */
    private groupLinesIntoSlides(lines: string[], linesPerSlide: number | null | undefined): string[][] {
        if (!linesPerSlide || linesPerSlide <= 0) {
            // Put all lines in a single slide
            return [lines];
        }

        const slides: string[][] = [];
        for (let i = 0; i < lines.length; i += linesPerSlide) {
            slides.push(lines.slice(i, i + linesPerSlide));
        }
        return slides;
    }

    /**
     * Processes song text and creates slide parts
     */
    private processSongText(
        text1: string,
        text2: string | null,
        symbol: string,
        linesPerSlide: number | null | undefined
    ): SlidePart[] {
        const text1Parts = this.splitIntoParts(text1, symbol);
        const text2Parts = text2 ? this.splitIntoParts(text2, symbol) : null;

        const slideParts: SlidePart[] = [];

        // Process each part
        for (let i = 0; i < text1Parts.length; i++) {
            const text1Lines = this.splitIntoLines(text1Parts[i]);
            const text2Lines = text2Parts && i < text2Parts.length
                ? this.splitIntoLines(text2Parts[i])
                : null;

            // Group lines into slides
            const text1Slides = this.groupLinesIntoSlides(text1Lines, linesPerSlide);
            const text2Slides = text2Lines
                ? this.groupLinesIntoSlides(text2Lines, linesPerSlide)
                : null;

            // Create slide parts (ensure both languages have same number of slides per part)
            const maxSlides = Math.max(
                text1Slides.length,
                text2Slides?.length || 0
            );

            for (let j = 0; j < maxSlides; j++) {
                slideParts.push({
                    text1Lines: text1Slides[j] || [],
                    text2Lines: text2Slides ? (text2Slides[j] || []) : null
                });
            }
        }

        return slideParts;
    }

    /**
     * Converts hex color to PptxGenJS format
     */
    private hexToRgb(hex: string): string {
        return hex.replace('#', '');
    }
}