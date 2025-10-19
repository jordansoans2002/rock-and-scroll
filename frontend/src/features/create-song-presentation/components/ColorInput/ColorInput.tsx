import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./ColorInput.module.css"
import baseStyles from "../SettingsPanel/SettingsPanel.module.css"
import { ColorSetting } from "../../types/settings";

interface ColorInputProps {
  setting: ColorSetting;
  onChange: (value: string) => void;
}

export default function ColorInput({
    setting,
    onChange,
}: ColorInputProps) {
    const [showPicker, setShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState(setting.value);
  const pickerRef = useRef<HTMLDivElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showPicker]);

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange(newValue);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
    },
    []
  );

  const handleInputBlur = useCallback(() => {
    // Validate hex color
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    if (hexRegex.test(inputValue)) {
      onChange(inputValue);
    } else {
      // Reset to previous valid value
      setInputValue(setting.value);
    }
  }, [inputValue, setting.value, onChange]);

  const handleSwatchClick = useCallback(() => {
    setShowPicker((prev) => !prev);
    // Focus the color input when opening
    setTimeout(() => colorInputRef.current?.click(), 0);
  }, []);

  // Sync internal state when external value changes
  useEffect(() => {
    setInputValue(setting.value);
  }, [setting.value]);

  return (
    <div className={styles.colorSetting}>
      {/* Hex input */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder="#000000"
        className={`${styles.input} ${baseStyles.baseSetting}`}
        maxLength={7}
      />
      
      {/* Color swatch button */}
      <button
        type="button"
        className={styles.swatch}
        style={{ backgroundColor: setting.value }}
        onClick={handleSwatchClick}
        aria-label="Select color">
        <span className={styles.swatchBorder} />
      </button>

      {/* Color picker (hidden input) */}
      {showPicker && (
        <div ref={pickerRef} className={styles.pickerContainer}>
          <input
            ref={colorInputRef}
            type="color"
            value={setting.value}
            onChange={handleColorChange}
            className={styles.colorInput}
          />
        </div>
      )}
    </div>
  );
}