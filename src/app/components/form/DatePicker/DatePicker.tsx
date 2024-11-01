import React from 'react';

interface DatePickerProps {
  id: string;
  label: string;
  error?: string; 
  value?: Date | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function DatePicker({ id, label, error, onChange, value }: DatePickerProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1" htmlFor={id}>{label}</label>
          <input
            type="date"
            id={id}
            onChange={onChange}
            value={value ? new Date(value).toISOString().slice(0, 10) : ''}
            className={`border rounded-md p-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
          />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>} 
    </div>
  );
}

export default DatePicker;
