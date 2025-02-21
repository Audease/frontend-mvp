import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FilterDropdown = ({ 
  options = [], 
  onSelect = (option: any) => {}, 
  placeholder = "Select option" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative w-32">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-1 bg-white border rounded-lg shadow-sm flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-dashboardButtons"
      >
        <span className="text-gray-700 truncate">
          {selected || placeholder}
        </span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {options.length > 0 ? (
              options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 cursor-pointer"
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 italic">No options available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;