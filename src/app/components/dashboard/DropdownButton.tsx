import  { useState, useRef, useEffect } from 'react';
import { RiArrowDropUpLine } from "react-icons/ri";

const DropdownButton = ({ options, onSelect, label, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={className}
      >
        <div className='flex flex-row text-sm font-medium'>
        {label} <span><RiArrowDropUpLine  className='w-8 h-6'/></span>
        </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border-2 rounded border-gray-200 shadow-lg z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-black font-medium"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
