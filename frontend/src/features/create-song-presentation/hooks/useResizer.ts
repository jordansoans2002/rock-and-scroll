import { useCallback, useRef } from "react";

export type ResizeAxis = "x" | "-x" | "y" | "-y"
export type ResizeConfig = {
    minSize: number;
    maxSize: number;
    axis: ResizeAxis;
    cssVarName: string,
    commit: (v: number) => void;
}

export const useResizer = (containerRef: React.RefObject<HTMLElement | null>) => {
    const currentValueRef = useRef<number>(0);
    const attachResize = useCallback(
        (cfg: ResizeConfig) => (ev: React.PointerEvent) => {
            if (!containerRef.current) return;
            const container = containerRef.current!;

            const isHorizontal = cfg.axis.includes("x")
            const startPoint = isHorizontal ? ev.clientX : ev.clientY;

            // Get initial value from CSS variable
            const cssValue = container.style.getPropertyValue(cfg.cssVarName);
            const startValue = cssValue ? parseInt(cssValue) : cfg.minSize;
            currentValueRef.current = startValue;

            const target = ev.currentTarget as Element;
            (target as Element).setPointerCapture?.((ev as any).pointerId);

            let latest = startValue;
            let raf = 0;

            const apply = (value: number) => {
                if(value < cfg.minSize) value = cfg.minSize;
                if(value > cfg.maxSize) value = cfg.maxSize;
                latest = value;
                container.style.setProperty(cfg.cssVarName, `${Math.round(value)}px`);
                // cfg.onResize?.(latest)
            };

            const onPointerMove = (moveEv: PointerEvent) => {
                const point = isHorizontal ? moveEv.clientX : moveEv.clientY;
                let delta = point - startPoint
                if(cfg.axis.includes("-"))
                    delta = -delta;
                const newValue = startValue + delta;
                
                if(!raf) {
                    raf = requestAnimationFrame(() => {
                        apply(newValue);
                        raf = 0;
                    });
                }
            };

            const onPointerUp = (_: PointerEvent) => {
                if(raf) cancelAnimationFrame(raf);
                const final = Math.min(Math.max(latest, cfg.minSize), cfg.maxSize);
                cfg.commit(final);

                (target as Element).releasePointerCapture?.((ev as any).pointerId);
                window.removeEventListener("pointermove", onPointerMove);
                window.removeEventListener("pointerup", onPointerUp);
            };

            window.addEventListener("pointermove", onPointerMove);
            window.addEventListener("pointerup", onPointerUp);
        },
        [containerRef]
    )

    return { attachResize }
}