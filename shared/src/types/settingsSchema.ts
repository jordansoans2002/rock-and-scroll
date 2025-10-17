export type SettingType = "number" | "color" | "select" | "autocomplete";

export interface SETTINGS_METADATA<T = any> {
    key: string;
    label: string;
    type: SettingType;
    description?: string;

    min?: number;
    max?: number;
    step?: number;
    options?: Array<{ label: string; value: T }>;
    suggestions?: string[];
}

// Helper to get nested value
export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((curr, key) => curr?.[key], obj);
};

// Helper to set nested value
export const setNestedValue = (obj: any, path: string, value: any): any => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((curr, key) => {
    if (!curr[key]) curr[key] = {};
    return curr[key];
  }, obj);
  target[lastKey] = value;
  return obj;
};