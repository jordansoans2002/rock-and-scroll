import { useCallback, useState } from 'react';

import { type SongSettings } from "@rock-and-scroll/shared/types/settings";
import { DEFAULT_SONG_SETTINGS } from "@rock-and-scroll/shared/defaults/defaultSettings"
import { getNestedValue, setNestedValue } from '@rock-and-scroll/shared/types/settingsSchema';


export const useSettings = (initialSettings: SongSettings = DEFAULT_SONG_SETTINGS) => {
    const [settings, setSettings] = useState<SongSettings>(initialSettings);

    const updateSetting = useCallback((path: string, value: any) => {
    setSettings((prev) => {
      const updated = { ...prev };
      setNestedValue(updated, path, value);
      return updated;
    });
  }, []);

  const getSettingValue = useCallback((path: string) => {
    return getNestedValue(settings, path);
  }, [settings]);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SONG_SETTINGS);
  }, []);

  return {
    settings,
    updateSetting,
    getSettingValue,
    resetSettings,
  };
};