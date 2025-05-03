import React from "react";

interface CheckboxProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
  label: string;
  error?: string;
  id?: string;
  disabled?: boolean;
}

function Checkbox({
  onChange,
  value,
  label,
  error,
  disabled,
  id = `checkbox-${Math.random().toString(36).substr(2, 9)}`,
}: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        onChange={onChange}
        checked={value}
        disabled={disabled}
        className={`
        mr-2 
        rounded 
        text-tgrey3  
        focus:ring-red-500 
        focus:ring-opacity-50
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
      />
      <label htmlFor={id} className="text-base cursor-pointer">
        {label}
      </label>
      {error && <span className="text-red-500 text-sm ml-2">{error}</span>}
    </div>
  );
}

export default Checkbox;
