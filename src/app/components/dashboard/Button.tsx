"use client";
import { FiPlusCircle } from "react-icons/fi";
import Image from "next/image";


export default function Button({ buttonText, className, arrowDirection, onClick }) {
  return (
    <div>
      <button
        className={`${className} p-2 rounded-md bg-dashboardButtonsBg font-semibold focus:ring focus:ring-tgrey1`}
        type="button" onClick={onClick}
      >
        <div className="flex flex-row">
        <span className="font-inter font-medium text-sm text-dashboardButtons">{buttonText}</span>
        <span className="text-dashboardButtons pl-10 pr-2"> { arrowDirection } </span>
        </div>
      </button>
    </div>
  );
}

export function Type2Button ({leftIcon, buttonText, onClick}) {
  return (
    <div>
      <button className="flex flex-row bg-dashboardRolesBtn p-1 rounded-lg text-white font-inter" onClick={onClick}>
        <span className="px-3 py-1">
          <Image src={leftIcon} width={16} height={16} alt="icon"/>
          </span>
        <span className="text-base"> {buttonText} </span>
        <span className="pl-8 pt-1 pr-4">
        <FiPlusCircle />
        </span>
      </button>
    </div>
  )
}