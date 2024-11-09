import React from "react";

interface EmailInputProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

function EmailInput({ id, label, value, onChange, error, placeholder }: EmailInputProps) {
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
        className={`border rounded-md p-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}

export default EmailInput;
