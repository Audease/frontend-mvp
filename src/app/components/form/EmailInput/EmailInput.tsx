import React, { useState, useEffect } from "react";

interface EmailInputProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}

function EmailInput({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  disabled,
}: EmailInputProps) {
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
        type="email"
        id={id}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder || "Enter email"}
        disabled={disabled}
        className={`
          border rounded-md p-2 
          ${error ? "border-red-500" : "border-gray-300"}
          ${isActive ? "bg-blue-50" : "bg-white"}
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : ""}
        `}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}
export default EmailInput;
