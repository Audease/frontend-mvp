import React, { useEffect, useState } from "react";

interface TelInputProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function TelInput({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  disabled,
  className,
}: TelInputProps) {
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
        type="tel"
        id={id}
        value={value || ""}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder || "Enter phone number"}
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

export default TelInput;
