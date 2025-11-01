import { SLIDE_HEIGHT_INCHES, SLIDE_WIDTH_INCHES, TextLayout } from "@rock-and-scroll/shared/types/layout";
import { HORIZONTAL_ALIGNMENTS, HorizontalAlignment, PresentationSettings, SlideRatio, VERTICAL_ALIGNMENTS, VerticalAlignment } from "@rock-and-scroll/shared/types/settings";
import { useEffect, useRef, useState } from "react";

import styles from "./SlidePreview.module.css"

interface SlidePreviewProps {
    presentationSettings: PresentationSettings;
    text1: string|null;
    textbox1: TextLayout|null;
    text2: string|null;
    textbox2: TextLayout|null;
}

export default function SlidePreview({
    presentationSettings,
    text1,
    textbox1,
    text2,
    textbox2,
}: SlidePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    const slideWidth = SLIDE_WIDTH_INCHES[presentationSettings.slideRatio];
    const slideHeight = SLIDE_HEIGHT_INCHES[presentationSettings.slideRatio];

    const renderTextbox = (text: string, textbox: TextLayout, key: string) => {
        const fontSizeInInches = textbox.fontSize / 72; // Convert points to inches
        return <foreignObject
            key={key}
            x={textbox.x}
            y={textbox.y}
            width={textbox.w}
            height={textbox.h}
            xmlns="https://www.s3.org/1999/xhtml">

            <div
                className={styles.textboxContent}
                style={{
                    ...getAlignmentStyles(textbox.align, textbox.valign),
                    fontFamily: textbox.fontFace,
                    fontSize: `${fontSizeInInches}pt`,
                    color: textbox.color,
                    textAlign: textbox.align,

                    whiteSpace: textbox.wrap ? 'normal' : 'nowrap',
                    wordWrap: textbox.wrap ? 'break-word' : "normal",
                    overflow: "hidden",

                    boxSizing: "border-box",
                    // padding: '0.05in',

                    lineHeight: 1.2,
                }} >
                <p>{text}</p>
            </div>
        </foreignObject>
    }

    
    const getTextboxStyle = (textbox: TextLayout): React.CSSProperties => {
        const fontSizeInInches = textbox.fontSize / 72; // Convert points to inches
        return {
            position: "absolute",
            left: `${textbox.x}in`,
            top: `${textbox.y}in`,
            width: `${textbox.w}in`,
            height: `${textbox.h}in`,

            fontFamily: textbox.fontFace,
            fontSize: `${fontSizeInInches}pt`,
            color: textbox.color,

            textAlign: textbox.align,
            display: 'flex',
            alignItems: mapVerticalAlignment(textbox.valign),
            justifyContent: mapHorizontalAlignment(textbox.align),

            whiteSpace: textbox.wrap ? 'normal' : 'nowrap',
            wordWrap: textbox.wrap ? 'break-word' : "normal",
            overflow: "hidden",

            boxSizing: "border-box",
            // padding: '8px',
        }
    };

    console.log("preview slide", text1, text2);

    return (
        <div
            ref={containerRef}
            className={styles.previewContainer}
            style={{aspectRatio: `${slideWidth} / ${slideHeight}`}}>

            <svg
                viewBox={`0 0 ${slideWidth} ${slideHeight}`}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                className={styles.slideSvg}
                xmlns="http://www.w3.org/2000/org">
                
                <rect
                    x="0"
                    y="0"
                    width={slideWidth}
                    height={slideHeight}
                    fill="#ffffff" />


                {text1 && textbox1 && renderTextbox(text1, textbox1, 'textbox1')}

                {text2 && textbox2 && renderTextbox(text2, textbox2, 'textbox2')}
            </svg>

            {/* <div
                className={styles.slideContent}
                style={{
                    width: `${slideWidth}in`,
                    height: `${slideHeight}in`,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    backgroundColor: "#ffffff"
                }}>
                
                {text1 && textbox1 && (
                    <div
                        className={styles.textbox}
                        style={getTextboxStyle(textbox1)}>
                        
                        <span>{text1}</span>
                    </div>
                )}
                {text2 && textbox2 && (
                    <div
                        className={styles.textbox}
                        style={getTextboxStyle(textbox2)}>
                        
                        <span>{text2}</span>
                    </div>
                )}
            </div> */}

        </div>
    )
}

function getAlignmentStyles(
    align: HorizontalAlignment,
    valign: VerticalAlignment
): React.CSSProperties {
    return {
        display: "flex",
        alignItems: mapVerticalAlignment(valign),
        justifyContent: mapHorizontalAlignment(align),
        width: "100%",
        height: "100%",
    }
}

function mapHorizontalAlignment(align: HorizontalAlignment): string {
    switch(align) {
        case HORIZONTAL_ALIGNMENTS.left: return "flex-start";
        case HORIZONTAL_ALIGNMENTS.center: return "center";
        case HORIZONTAL_ALIGNMENTS.right: return "flex-end";
        default: return "center";
    }
}

function mapVerticalAlignment(valign: VerticalAlignment): string {
    switch(valign) {
        case VERTICAL_ALIGNMENTS.top: return "flex-start";
        case VERTICAL_ALIGNMENTS.middle: return "center";
        case VERTICAL_ALIGNMENTS.bottom: return "flex-end";
        default: return "center";
    }
}