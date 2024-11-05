import React from "react";

interface NumberInputProps {
  id: string;
  label: string;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

function NumberInput({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  min,
  max,
  step,
}: NumberInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm mb-1">
        {label}
      </label>
      <input
        type="number"
        id={id}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={`border rounded-md p-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}

export default NumberInput;
