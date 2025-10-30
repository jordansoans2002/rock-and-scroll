import { useCallback, useState } from "react"

export type ActiveSettingView = "presentation" | "song" | null;

export const useSettingPanelUI = () => {
    const [activeView, setActiveView] = useState<ActiveSettingView>(null);

    const toggleActiveView = useCallback(
        (view: ActiveSettingView) => {
            if(!view) activeView;
            setActiveView((currentView) => {
                if(currentView === view)
                    return null;

                return view;
            })
        },
        []
    );

    const minimizePanel = useCallback(
        () => {
            setActiveView(null);
        },
        []
    );

    return {
        activeView,
        toggleActiveView,
        minimizePanel,
    }
}