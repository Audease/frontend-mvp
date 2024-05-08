"use client";

import { useState } from "react";

export default function InputField({ className, type, placeholder }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={selectedOption}
        onChange={handleChange}
        className={`${className} border rounded-md p-2 text-h2 text-tgrey1 font-normal`}
      />
    </div>
  );
}

export function InputFieldWithDropdown({ className, placeholder }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <select
        value={selectedOption}
        onChange={handleChange}
        className={`${className} border rounded-md p-2 bg-white text-h2 text-tgrey1 font-normal`}
      >
        <option value="">{placeholder}</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
}
