import React from "react";

interface RadioInputProps {
  id: string;
  label: string;
  options: Array<{ label: string; value: string }>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

function RadioInput({
  id,
  label,
  options,
  value,
  onChange,
  error,
  disabled,
}: RadioInputProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1">{label}</label>
      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              disabled={disabled}
              onChange={onChange}
              className={`border-gray-300 ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}

export default RadioInput;
