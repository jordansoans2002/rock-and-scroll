export interface DropdownTextInputProps<T = string> {
    placeholder? : string;
    suggestions: T[];
    value: string;
    onChange: (value: string) => void;
    onSelect?: (value: T) => void;
    filterFunction?: (inputValue: string, suggestions?: T[]) => T[];
    getDisplayValue?: (item: T) => string;
    disabled?: boolean;
    allowCustom?: boolean;
    editable?: boolean;
    error?: string;
    className?: string;
}