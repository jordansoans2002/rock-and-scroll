export type SettingType = "number" | "color" | "dropdownSelect" | "dropdownText";

export interface BaseSetting<T> {
    key: string;
    label: string;
    type: SettingType,
    value: T;
    description?: string;
}

export interface NumberSetting extends BaseSetting<number> {
    type: 'number';
    min?: number;
    max?: number;
    step?: number;
}

export interface ColorSetting extends BaseSetting<string> {
    type: 'color';
}

export interface DropdownSelectSetting<T = string> extends BaseSetting<T> {
    type: 'dropdownSelect'
    options: Array<{ label: string; value: T }>
}

export interface DropdownTextSetting extends BaseSetting<string> {
    type: 'dropdownText'
    suggestions: string[];
    allowCustom: boolean;
}

export type Setting = 
    | NumberSetting
    | ColorSetting
    | DropdownSelectSetting
    | DropdownTextSetting;

export interface SettingsSchema {
    [key: string]: Setting
}

export const isNumberSetting = (setting: Setting): setting is NumberSetting =>
    setting.type === 'number';

export const isColorSetting = (setting: Setting): setting is ColorSetting =>
    setting.type === 'color';

export const isDropdownSelectSetting = (setting: Setting): setting is DropdownSelectSetting =>
    setting.type === 'dropdownSelect';

export const isDropdownTextSetting = (setting: Setting): setting is DropdownTextSetting =>
    setting.type === 'dropdownText';
