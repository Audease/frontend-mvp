import { useState, useRef, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";

const FilterButton = ({ options, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
        className=" text-black py-1 px-4 rounded focus:outline-none border-grey-300 border-2"
      >
        <div className="flex flex-row text-sm font-normal">
          <LuSettings2 className="h-4 w-8 text-tgrey3"/>
          {label}{" "}
         <MdOutlineKeyboardArrowDown className="w-8 h-6 text-tgrey3" />
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

export default FilterButton;