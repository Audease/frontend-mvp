import React, { useState, useEffect } from "react";

type Props = {
  id: string;
  className?: string;
  value?: string | number;
  type?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  signature?: boolean;
  [key: string]: any; 
};

function TextInput({
  id,
  className = "",
  value = "",
  type = "text",
  label,
  placeholder = "",
  signature = false,
  error,
  onChange,
  disabled,
  ...inputElementProps
}: Props) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(!!value);
  }, [value]);

  return (
    <div className="flex flex-col justify-start align-start text-input">
      {label && (
        <label htmlFor={id} className="text-black">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          input order-tgrey2 rounded-md p-2 text-base text-stone-950 font-normal w-full 
          focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 
          placeholder:text-gray-400 placeholder:italic
          ${isActive ? "bg-blue-50" : "bg-white"}
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-75" : ""}
          ${className}
          ${signature && "signature-input font-semibold font-signature"}
        `}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange?.(e);
          setIsActive(!!e.target.value);
        }}
        disabled={disabled}
        {...inputElementProps}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

export default TextInput;
