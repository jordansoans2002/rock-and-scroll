import { Background, Padding, Separation, TextStyle } from "./generatePresentationRequestDto";

export const DEFAULT_TEXT_STYLE: TextStyle = {
  fontFamily: "Arial",
  fontSize: 32,
  fontColor: "#000000",
  align: "center",
  vAlign: "middle"
};

export const DEFAULT_BACKGROUND: Background = {
  color: "#FFFFFF",
  opacity: 1
};

export const DEFAULT_PADDING: Padding = {
  left: 12,
  top: 12,
  right: 12,
  bottom: 12,
  gap: 12
};

export const DEFAULT_SEPARATOR: Separation = {
    symbol: "\r\n\r\n\r\n",
    lines: null
}