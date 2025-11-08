import { SLIDE_HEIGHT_INCHES, SLIDE_WIDTH_INCHES, TextLayout } from "@rock-and-scroll/shared/types/layout";
import { HORIZONTAL_ALIGNMENTS, HorizontalAlignment, PresentationSettings, VERTICAL_ALIGNMENTS, VerticalAlignment } from "@rock-and-scroll/shared/types/settings";
import { useLayoutEffect, useRef, useState } from "react";

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
    const textbox1Ref = useRef<HTMLDivElement | null>(null);
    const [textbox1Overflow, setTextbox1Overflow] = useState(false);
    
    const textbox2Ref = useRef<HTMLDivElement | null>(null);
    const [textbox2Overflow, setTextbox2Overflow] = useState(false);

    const slideWidth = SLIDE_WIDTH_INCHES[presentationSettings.slideRatio];
    const slideHeight = SLIDE_HEIGHT_INCHES[presentationSettings.slideRatio];

    useLayoutEffect(
        () => {
            const checkOverflow = (ref: React.RefObject<HTMLDivElement | null>): boolean => {
                if(!ref.current)
                    return false;

                const hasOverflow = ref.current.scrollHeight > ref.current.clientHeight ||
                    ref.current.scrollWidth > ref.current.clientWidth;
                
                return hasOverflow;
            };

            const overflow1 = checkOverflow(textbox1Ref);
            const overflow2 = checkOverflow(textbox2Ref);

            setTextbox1Overflow(prev => {
                if(prev === overflow1)
                    return prev;

                return overflow1
            });

            setTextbox2Overflow(prev => {
                if(prev === overflow2)
                    return prev;
                
                return overflow2;
            })
        },
        [
            text1,
            text2,
            textbox1,
            textbox2,
            presentationSettings.slideRatio,
        ]
    );

    const renderTextbox = (
        text: string,
        textbox: TextLayout,
        key: string,
        ref: React.RefObject<HTMLDivElement | null>,
        hasOverflow: boolean
    ) => {
        console.log("preview textbox", textbox);
        return <foreignObject
            key={key}
            x={textbox.x}
            y={textbox.y}
            width={textbox.w}
            height={textbox.h}>

            <div
                ref={ref}
                className={`${styles.textboxContent} ${hasOverflow ? styles.textboxOverflow : ''}`}
                style={{
                    ...getAlignmentStyles(textbox.align, textbox.valign),
                    fontFamily: textbox.fontFace,
                    fontSize: `${textbox.fontSize/(72*100)}in`,
                    color: textbox.color,
                    textAlign: textbox.align,

                    whiteSpace: textbox.wrap ? 'normal' : 'nowrap',
                    wordWrap: textbox.wrap ? 'break-word' : "normal",
                    overflow: "hidden",

                    boxSizing: "border-box",
                    // padding: '0.05in',

                    // lineHeight: 1.2,
                }} >
                {text.split("\n").map((line, i) => (
                    <span key={i}>
                        {line}
                        <br/>
                    </span>
                ))}
            </div>
        </foreignObject>
    }

    return (
        <div
            className={`${styles.previewContainer} ${textbox1Overflow || textbox2Overflow ? styles.slideOverflow : ""}`}
            style={{aspectRatio: `${slideWidth} / ${slideHeight}`}}>

            <svg
                viewBox={`0 0 ${slideWidth} ${slideHeight}`}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                className={styles.slideSvg}
                xmlns="http://www.w3.org/2000/svg">
                
                <rect
                    x="0"
                    y="0"
                    width={slideWidth}
                    height={slideHeight}
                    fill="#ffffff" />


                {
                    text1 &&
                    textbox1 && 
                    renderTextbox(
                        text1,
                        textbox1,
                        'textbox1',
                        textbox1Ref,
                        textbox1Overflow
                    )
                }

                {text2 && textbox2 && renderTextbox(text2, textbox2, 'textbox2', textbox2Ref, textbox2Overflow)}
            </svg>
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