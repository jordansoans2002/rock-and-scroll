import { PresentationSettings, Song } from "@rock-and-scroll/shared/types/settings";
import ButtonBar, { ButtonConfig } from "../../ButtonBar/ButtonBar"
import styles from "./PreviewTray.module.css"
import { splitLyrics } from "@rock-and-scroll/shared/utils/separateIntoSlides";
import SlidePreview from "../SlidePreview/SlidePreview";
import { arrangeLyricsSlide } from "@rock-and-scroll/shared/utils/arrangeInSlide";

interface PreviewTrayProps {
    presentationSettings: PresentationSettings;
    song: Song;
    minimizePreview: () => void;
}

export default function PreviewTray({
    presentationSettings,
    song,
    minimizePreview,
}: PreviewTrayProps) {
    const minimize: ButtonConfig = {
        icon: <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true">
            <line x1="3" y1="13" x2="13" y2="13" stroke={"currentColor"} strokeWidth={2} strokeLinecap="round" />
        </svg>,
        onClick: minimizePreview,
        className: styles.minimizeButton
    }

    const slideText = splitLyrics(song)
    const textboxes = arrangeLyricsSlide(
        presentationSettings.slideRatio,
        song.settings.orientation,
        song.settings.padding,
        presentationSettings.unit,
        song.text1 ? true : false,
        song.settings.text1Style,
        song.text2 ? true : false,
        song.settings.text2Style,
    )

    return (
        <div className={styles.tray}>
            <div className={styles.titleBar}>
                <span className={styles.title}>{"Song Preview"}</span>
                <div className={styles.titleBarActions}>
                    <ButtonBar orientation="horizontal" endGroup={[minimize]} />
                </div>
            </div>

            <div className={styles.previewSlides}>
                {slideText.map((text, index) => (
                    <SlidePreview
                        key={index}
                        presentationSettings={presentationSettings}
                        text1={text.text1}
                        textbox1={textboxes.textbox1}
                        text2={text.text2}
                        textbox2={textboxes.textbox2} />
                ))}
            </div>
        </div>
    )
}