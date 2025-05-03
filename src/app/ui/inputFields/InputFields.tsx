"use client";

import { useState, useEffect } from 'react';


export default function InputField({ className, type, placeholder, onSendValue }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    // console.log(e.target.value);
    
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      setSelectedOption(e.target.value);
      // console.log(e.target.value)
      onSendValue(selectedOption);
    }
  };

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={selectedOption}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className={`${className} border rounded-md p-2 text-h2 text-tgrey1 font-normal focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${selectedOption ? "bg-gray-100" : ""}`}
      />
    </div>
  );
}

export function InputFieldWithDropdown() {
  const [noOfEmployee, setNoOfEmployee] = useState("");

  const employeeRange = [
    "1 - 50","51 - 100", "101 - 500", "501 - 1000", "Above 1000" 
  ];

  const handleChange = (e) => {
    setNoOfEmployee(e.target.value);
    // console.log(e.target.value);
  };

  return (
    <div>
      <select
        name="employee"
        id="employee"
        value={noOfEmployee}
        onChange={handleChange}
        className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-[10rem] bg-white ${
          noOfEmployee ? "bg-gray-100 focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1" : ""
        }`}
      >
        <option value="">No of Employees</option>
        {employeeRange.map((employeeNo, index) => (
          <option key={index} value={employeeNo}>
            {employeeNo}
          </option>
        ))}
      </select>
    </div>
  );
}