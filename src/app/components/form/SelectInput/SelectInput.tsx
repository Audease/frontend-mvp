import React, { useState, useEffect } from "react";

interface DropdownProps {
 id: string;
 options: Array<{ value: string; label: string }>;
 label: string;
 error?: string;
 onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
 value?: string;
}

function Dropdown({
 id,
 options,
 label,
 error,
 onChange,
 value,
}: DropdownProps) {
 const [isActive, setIsActive] = useState(false);

 useEffect(() => {
   setIsActive(!!value);
 }, [value]);

 return (
   <div className="flex flex-col">
     <label className="text-sm mb-1" htmlFor={id}>
       {label}
     </label>
     <select
       id={id}
       onChange={(e) => {
         onChange?.(e);
         setIsActive(!!e.target.value);
       }}
       value={value || ""}
       className={`
         border rounded-md p-2 
         ${error ? "border-red-500" : "border-gray-300"}
         ${isActive ? "bg-blue-50" : "bg-white"}
       `}
     >
       <option value="" disabled>
         Select an option
       </option>
       {options.map((option) => (
         <option key={option.value} value={option.value}>
           {option.label}
         </option>
       ))}
     </select>
     {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
   </div>
 );
}

export default Dropdown;