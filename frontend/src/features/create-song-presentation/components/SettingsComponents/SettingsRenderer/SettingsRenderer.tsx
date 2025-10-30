import { SETTINGS_METADATA } from "@rock-and-scroll/shared/types/settingsMetadata";
import SettingRow from "../SettingRow/SettingRow";
import { useResizableColumns } from "./useResizableColumns";
import NumberInput from "../../InputComponents/NumberInput/NumberInput";
import ColorInput from "../../InputComponents/ColorInput/ColorInput";
import DropdownTextInput from "../../InputComponents/DropdownTextInput/DropdownTextInput";

import styles from "./SettingsRenderer.module.css"

interface SettingsRendererProps<T extends Record<string, any>> {
    settings: T;
    metadata: Record<keyof T, SETTINGS_METADATA>;
    onChange: (newSettings: T) => void;
}

export default function SettingsRenderer<T extends Record<string, any>>({
    settings,
    metadata,
    onChange,
}: SettingsRendererProps<T>) {
    const { containerRef, settingStyle, resize } = useResizableColumns(); 
    const keys = Object.keys(settings) as Array<keyof T>;

    return (
        <div className={styles.list}>
            <div ref={containerRef} style={settingStyle}>
            {keys.map((key) => {
                const meta = metadata[key];
                const value = settings[key];

                if(meta.type === "nest" && meta.metadata) {
                    return (<>
                            <h3 className={styles.topLevelLabel}>
                                {meta.label}
                            </h3>

                            <div className={styles.nestedSettings}>
                                {Object.keys(value).map((nestedKey) => {
                                    const nestedMeta = meta.metadata!![nestedKey];
                                    const nestedValue = value[nestedKey];
                                    
                                    return (
                                        <SettingRow
                                            key={`${String(key)}.${nestedKey}`}
                                            label={nestedMeta.label}
                                            topLevel={false}
                                            description={nestedMeta.description}
                                            resize={resize}>
                                                
                                                {renderSettingRow(
                                                    nestedMeta,
                                                    nestedValue,
                                                    (newValue) => {
                                                        onChange({
                                                            ...settings,
                                                            [key]: { ...value, [nestedKey]: newValue}
                                                        });
                                                    },
                                                )}
                                        </SettingRow>
                                    );
                                })}
                            </div>
                        </>);
                    }
                    
                    return(
                        <div className={styles.topLevelSettings}>
                            <SettingRow
                                key={String(key)}
                                label={meta.label}
                                topLevel={true}
                                description={meta.description}
                                resize={resize}>
                                
                                {renderSettingRow(
                                    meta,
                                    value,
                                    (newValue) => {
                                        onChange({...settings, [key]: newValue });
                                    }
                                )}
                            </SettingRow>
                        </div>
                );
            })}
            </div>
        </div>
    );
}

function renderSettingRow(
    meta: SETTINGS_METADATA,
    value: any,
    onChange: (value: any) => void
): React.ReactNode {
    switch(meta.type) {
        case "number":
            return (
                <NumberInput
                    setting={meta}
                    value={value}
                    onChange={onChange} />
            );
        
        case "color":
            return (
                <ColorInput
                    setting={meta}
                    value={value}
                    onChange={onChange} />
            );

        case "dropdownSelect":
            const onUpdate = (label: string) => {
                const selected = meta.options?.find(opt => opt.label === label);
                if(selected) {
                    onChange(selected.value);
                }
            }
            return(
                <DropdownTextInput
                    value={meta.options?.find(opt => opt.value === value)?.label || String("")}
                    suggestions={meta.options?.map(opt => opt.label) || []}
                    onChange={onUpdate}
                    onSelect={onUpdate}
                    editable={false}
                    filterFunction={(_: string, suggestions = []) =>  { return suggestions; }}
                    allowCustom={false}
                    placeholder={meta.label} />
            )

        case "dropdownText":
            // Use DropdownTextInput with custom input allowed
            // Special handling for arrays (stanzas field)
            const isArray = Array.isArray(value);
            
            if (isArray) {
                // Handle number array (stanzas)
                return (
                <DropdownTextInput
                    value={(value as number[]).join(', ') || ""}
                    suggestions={meta.suggestions || []}
                    onChange={(text) => {
                    // Parse comma-separated numbers
                    const numbers = text
                        .split(',')
                        .map(s => s.trim())
                        .filter(s => s !== '')
                        .map(s => Number(s))
                        .filter(n => !isNaN(n));
                    onChange(numbers);
                    }}
                    editable={true}
                    allowCustom={true}
                    placeholder={meta.label}
                />
                );
            }
            
            // Handle regular string input
            return (
                <DropdownTextInput
                value={value || ''}
                suggestions={meta.suggestions || []}
                onChange={onChange}
                editable={true}
                allowCustom={true}
                placeholder={meta.label}
                />
            );

        case "text":
            return (
                <DropdownTextInput
                value={value || ''}
                suggestions={[]}
                onChange={onChange}
                editable={true}
                allowCustom={true}
                placeholder={meta.label}
                />
            );

        default:

    }
}