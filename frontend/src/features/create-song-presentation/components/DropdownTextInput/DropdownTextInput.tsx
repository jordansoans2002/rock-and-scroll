import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { DropdownTextInputProps } from "./DropdownTextInput.types";

import styles from "./DropdownTextInput.module.css"
import baseStyles from "../SettingsPanel/SettingsPanel.module.css"

export default function DropdownTextInput<T = string>({
    placeholder = "Type or select...",
    suggestions,
    value = "",
    onChange,
    onSelect,
    filterFunction,
    getDisplayValue = (item) => String(item),
    disabled = false,
    allowCustom = true,
    editable = true,
    error,
    className = ''
}: DropdownTextInputProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const defaultFilterFunction = useCallback(
        (inputValue: string, items: T[]): T[] => {
            if(!inputValue.trim()) return items;
            const lowerInput = inputValue.toLowerCase();
            return items.filter(
                (item) => getDisplayValue(item).toLowerCase().includes(lowerInput)
            );
        },
        [getDisplayValue]
    );

    const filteredSuggestions = useMemo(() => {
        const filterFn = filterFunction || defaultFilterFunction;
        return isOpen ? filterFn(value, suggestions) : [];
    },[value, suggestions, isOpen, filterFunction, defaultFilterFunction]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if(isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    useEffect(() => {
        setHighlightedIndex(-1);
    }, [filteredSuggestions.length]);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            onChange(newValue);
            if(!isOpen) setIsOpen(true);
        },
        [onChange, isOpen]
    );

    const handleSuggestionClick = useCallback(
        (suggestion: T) => {
            const displayValue = getDisplayValue(suggestion);
            onChange(displayValue);
            onSelect?.(suggestion);
            setIsOpen(false);
            setHighlightedIndex(-1);
        },
        [onchange, onSelect, getDisplayValue]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            e.preventDefault();
            setIsOpen(true);
            return;
        }

        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev < filteredSuggestions.length - 1 ? prev + 1 : prev
            );
            break;

            case 'ArrowUp':
            e.preventDefault();
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
            break;

            case 'Enter':
            if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
                e.preventDefault();
                handleSuggestionClick(filteredSuggestions[highlightedIndex]);
            }
            break;

            case 'Escape':
            e.preventDefault();
            setIsOpen(false);
            setHighlightedIndex(-1);
            break;

            case 'Tab':
            setIsOpen(false);
            break;
        }
        },
        [isOpen, highlightedIndex, filteredSuggestions, handleSuggestionClick]
    );

    const handleFocus = useCallback(() => {
        if(!disabled) setIsOpen(true);
    }, [disabled]);

    const showDropdown = isOpen && !disabled;
    const showNoResults = showDropdown && value.trim() && filteredSuggestions.length === 0;
    const showSuggestions = showDropdown && filteredSuggestions.length > 0;

    const wrapperClasses = className ? `${styles.wrapper} ${className}` : styles.wrapper;

    // Dynamic classes for input based on state
    const inputClasses = [
        styles.input,
        baseStyles.baseSetting,
        error && styles.inputError,
        !editable && styles.dropdownSelect,
        disabled && styles.inputDisabled,
    ]
        .filter(Boolean)
        .join(' ');

    // Dynamic classes for arrow based on open state
    const arrowIconClasses = [
        styles.arrowIcon,
        isOpen && styles.arrowIconOpen,
    ]
        .filter(Boolean)
        .join(' ');

    // Dynamic classes for dropdown items based on highlight state
    const getItemClasses = (index: number) => {
        return [
        styles.dropdownItem,
        index === highlightedIndex && styles.dropdownItemHighlighted,
        ]
        .filter(Boolean)
        .join(' ');
    };

    return(
        <div ref={wrapperRef} className={wrapperClasses}>
            <div className={styles.container}>
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    aria-expanded={isOpen}
                    aria-autocomplete="list"
                    aria-controls="autocomplete-listbox"
                    className={inputClasses}
                    readOnly={ !editable }
                />

                <div
                    onClick={() => setIsOpen(!isOpen)} 
                    className={styles.arrow}>
                    
                    <svg
                        className={arrowIconClasses}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                            
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"/>
                    </svg>
                </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            {showSuggestions && (
                <ul
                    id="dropdownTextInput-listbox"
                    role="listbox"
                    className={styles.dropdown}>
                        {filteredSuggestions.map((suggestion, index) => {
                            const displayValue = getDisplayValue(suggestion);
                            return (
                                <li
                                    key={index} 
                                    role="option"
                                    aria-selected={index === highlightedIndex}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                    className={getItemClasses(index)}>
                                        {displayValue}
                                </li>
                            );
                        })}
                </ul>
            )}

            {showNoResults && (
                <div className={styles.noResults}>
                    No suggestions found
                </div>
            )}
        </div>
    )
}