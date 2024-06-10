"use client";
import { FiPlusCircle } from "react-icons/fi";


export default function Button({ buttonText, className, arrowDirection }) {
  return (
    <div>
      <button
        className={`${className} p-2 rounded-md bg-dashboardButtonsBg font-semibold focus:ring focus:ring-tgrey1`}
        type="submit"
      >
        <div className="flex flex-row">
        <span className="font-inter font-medium text-sm text-dashboardButtons">{buttonText}</span>
        <span className="text-dashboardButtons pl-10 pr-2"> { arrowDirection } </span>
        </div>
      </button>
    </div>
  );
}

export function Type2Button ({leftIcon, buttonText}) {
  return (
    <div>
      <button className="flex flex-row">
        <span>{leftIcon}</span>
        <span> {buttonText} </span>
        <FiPlusCircle />
      </button>
    </div>
  )
}