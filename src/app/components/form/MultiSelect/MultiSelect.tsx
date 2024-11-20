import React, { useState } from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  id: string;
  className?: string;
  options: Option[];
  label?: string;
  error?: string;
  onChange?: (selectedValues: string[]) => void;
  disabled?: boolean;
};

function MultiSelectInput({
  id,
  className = "",
  options,
  label,
  error,
  onChange,
  disabled = false,
}: Props) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleCheckboxChange = (optionValue: string) => {
    const newSelectedValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((value) => value !== optionValue)
      : [...selectedValues, optionValue];

    setSelectedValues(newSelectedValues);
    onChange?.(newSelectedValues);
  };

  return (
    <div className="flex flex-col justify-start align-start multi-select-input">
      {label && (
        <label htmlFor={id} className="text-black mb-2">
          {label}
        </label>
      )}
      <div className={`
        grid grid-cols-2 gap-2 
        ${disabled ? "opacity-50 pointer-events-none" : ""}
        ${className}
      `}>
        {options.map((option) => (
          <label 
            key={option.value} 
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              id={`${id}-${option.value}`}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              disabled={disabled}
              className="form-checkbox h-4 w-4 text-blue-600 rounded"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}

export default MultiSelectInput;