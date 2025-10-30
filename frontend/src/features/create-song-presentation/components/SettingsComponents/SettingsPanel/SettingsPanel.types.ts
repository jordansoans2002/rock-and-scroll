import { SongSettings } from '@rock-and-scroll/shared/types/settings';


export interface SettingsPanelProps {
  settings: SongSettings;
  onSettingsChange: (settings: SongSettings) => void;
}