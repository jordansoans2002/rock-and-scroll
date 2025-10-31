// helper: split by N consecutive blank lines (tolerant of spaces/tabs)
export function splitByBlankLines(
    text1: string | null, text2: string | null, n: number
): { text1: string|null; text2: string|null }[] {
    // build a regex that matches n or more blank lines (blank lines may contain spaces/tabs)
    // we split on the boundary between groups, so use lookahead to preserve behavior
    const re = new RegExp(`(?:\\r?\\n[ \\t]*){${n},}`, "g");
    return split({text1, text2}, re);
}

// helper: split by symbol
export function splitBySymbol(
    text1: string|null, text2: string|null, symbolStr: string
): { text1: string|null; text2: string|null }[] {
    const escaped = symbolStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(escaped, "g");
    return split({text1, text2}, re);
}

// helper: chunk by linesPerSlide (preserve original line breaks inside chunks)
export function splitByLinesPerSlide(
    text1: string|null, text2: string|null, linesCount: number
): { text1: string|null; text2: string|null }[] {

    const re = /\r?\n/;

    const lines1 = text1 ? text1.split(re) : [];
    const lines2 = text2 ? text2.split(re) : [];

    const out: { text1: string|null; text2: string|null }[] = [];
    const maxChunks = Math.ceil(Math.max(lines1.length, lines2.length) / linesCount);

    for (let i=0; i < maxChunks; i++) {
        const start = i * linesCount;
        const end = start + linesCount;

        const chunk1 = lines1.slice(start, end).join("\n");
        const chunk2 = lines2.slice(start, end).join("\n");
        out.push({
            text1: chunk1.length > 0 ? chunk1 : null,
            text2: chunk2.length > 0 ? chunk2 : null,
        });
    }
    return out;
}

function split(text: {text1: string|null; text2: string|null}, regex: RegExp) {
    const parts1 = text.text1?.split(regex) ?? null;
    const parts2 = text.text2?.split(regex) ?? null;
    const maxParts = Math.max(parts1?.length ?? 0, parts2?.length ?? 0);

    const out: { text1: string|null; text2: string|null }[] = [];
    for (let i=0; i < maxParts; i++) {
        out.push({
            text1: parts1 ? (parts1[i] ?? "").trim() : null,
            text2: parts2 ? (parts2[i] ?? "").trim() : null,
        })
    }

    return out;
}


