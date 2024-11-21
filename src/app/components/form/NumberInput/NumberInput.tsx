import React, { useEffect, useState } from "react";

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
  disabled?: boolean;
  className?: string;
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
  disabled,
  className
}: NumberInputProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(!!value);
  }, [value]);

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
        disabled={disabled}
        className={`
          input order-tgrey2 rounded-md p-2 text-base text-stone-950 font-normal w-full 
          focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 
          placeholder:text-gray-400 placeholder:italic
          ${isActive ? "bg-blue-50" : "bg-white"}
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : ""}
          ${className}
        `}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}

export default NumberInput;
