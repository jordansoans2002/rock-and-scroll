export interface ButtonConfig {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

export interface ButtonBarProps {
    buttons: ButtonConfig[];
    className?: string;
}