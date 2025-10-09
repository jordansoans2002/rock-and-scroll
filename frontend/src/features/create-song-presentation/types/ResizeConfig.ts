export type ResizeConfig = {
    minSize: number;
    maxSize: number;
    axis: "x" | "-x" | "y" | "-y";
    getRef: () => React.RefObject<number>;
    cssVarName: string,
    commit: (v: number) => void;
}