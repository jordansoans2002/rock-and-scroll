import React, { useEffect, useRef, useState } from "react";
import { loadFromStorage, saveToStorage } from "../../../utils/local-storage";


export function usePersistentState<T>(
    storageKey: string,
    defaultValue: T,
    debounceMs: number = 500,
): [T, React.Dispatch<React.SetStateAction<T>>] {
    
    const [state, setState] = useState<T>(
        () => {
            return loadFromStorage(storageKey, defaultValue);
        }
    );

    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if(debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            const success = saveToStorage(storageKey, state);

            if(!success) {
                console.warn(`Failed to save ${storageKey} to localStorage`);
                // can show notification
            }
        }, debounceMs);

        return () => {
            if(debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [state, storageKey, debounceMs]);


    useEffect(() => {
        return () => {
            saveToStorage(storageKey, state);
        };
    }, [state, storageKey]);

    return [state, setState];
}