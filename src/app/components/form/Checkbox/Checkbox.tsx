import React from "react";

interface CheckboxProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
  label: string;
  error?: string;
}

function Checkbox({ onChange, value, label, error }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        onChange={onChange}
        checked={value}
        className="mr-2"
      />
      <label className="text-sm">{label}</label>
      {error && <span className="text-red-500 text-sm ml-2">{error}</span>}
    </div>
  );
}

export default Checkbox;
