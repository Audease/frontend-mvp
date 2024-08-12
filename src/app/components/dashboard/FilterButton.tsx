import { useState, useRef, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";
import DropdownButton, { RecruiterFilterDropdown } from "./DropdownButton";

export default function FilterButton({ options, onSelect, label }) {
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
    <div className=" inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-black py-1 px-4 rounded focus:outline-none border-grey-300 border-2"
      >
        <div className="flex flex-row text-sm font-normal">
          <LuSettings2 className="h-4 w-8 text-tgrey3" />
          {label} <MdOutlineKeyboardArrowDown className="w-8 h-6 text-tgrey3" />
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
}

export function RecruiterFilterButton({
  options,
  onSelect,
  label,
  categoriesDropdownOptions,
  onCategorySelect,
  courseDropdownOptions,
  onCourseSelect,
  onFilterClick,
}) {
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

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-black p-1 rounded focus:outline-none border-grey-300 border-2"
      >
        <div className="flex flex-row text-sm font-normal">
          <LuSettings2 className="h-4 w-8 text-tgrey3" />
          {label} <MdOutlineKeyboardArrowDown className="w-8 h-6 text-tgrey3" />
        </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 p-2 w-44 bg-white border-2 rounded border-gray-200 shadow-lg z-10 space-y-4 flex flex-col">
          <div className="space-y-3">
            <h2 className="font-normal text-sm text-tgrey3">Funding</h2>
            <RecruiterFilterDropdown
              label={"All Categories"}
              options={categoriesDropdownOptions}
              onSelect={onCategorySelect}
            />
          </div>
          <div className="space-y-3">
            <h2 className="font-normal text-sm text-tgrey3">Chosen Course</h2>
            <RecruiterFilterDropdown
              label={"All Courses"}
              options={courseDropdownOptions}
              onSelect={onCourseSelect}
            />
          </div>

          <button
            className="font-bold text-white text-sm bg-dashboardButtons py-1 px-2 rounded-lg"
            onClick={onFilterClick}
            type="button"
          >
            Filter
          </button>
        </div>
      )}
    </div>
  );
}

export function BKSDFilterButton({
  options,
  onSelect,
  label,
  categoriesDropdownOptions,
  onCategorySelect,

  onFilterClick,
}) {
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

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-black p-1 rounded focus:outline-none border-grey-300 border-2"
      >
        <div className="flex flex-row text-sm font-normal">
          <LuSettings2 className="h-4 w-8 text-tgrey3" />
          {label} <MdOutlineKeyboardArrowDown className="w-8 h-6 text-tgrey3" />
        </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 p-2 w-44 bg-white border-2 rounded border-gray-200 shadow-lg z-10 space-y-4 flex flex-col">
          <div className="space-y-3">
            <h2 className="font-normal text-sm text-tgrey3">Application</h2>
            <RecruiterFilterDropdown
              label={"All Categories"}
              options={categoriesDropdownOptions}
              onSelect={onCategorySelect}
            />
          </div>

          <button
            className="font-bold text-white text-sm bg-dashboardButtons py-1 px-2 rounded-lg"
            onClick={onFilterClick}
            type="button"
          >
            Filter
          </button>
        </div>
      )}
    </div>
  );
}
