// components/DocView/Header.tsx
import Image from "next/image";
import React from "react";
import { SlArrowLeft } from "react-icons/sl";

interface HeaderProps {
  onBackClick: () => void;
  sectionNumber: number;
  totalSectionNumber: number;
  collegeName: string;
}

const Header: React.FC<HeaderProps> = ({
  onBackClick,
  sectionNumber,
  totalSectionNumber,
  collegeName,
}) => (
  <>
    <div className="flex flex-row justify-between m-4">
      <button className="flex flex-row space-x-2 justify-center items-center" type="button" onClick={onBackClick}>
        <SlArrowLeft className="h-[0.6rem]"/>
        <p className="font-medium text-base">Back</p>
      </button>
      <h3>{`Page ${sectionNumber} of ${totalSectionNumber}`}</h3>
    </div>
    <div className="flex flex-col-reverse xl:flex-row px-4 justify-between">
      <div></div>
      <h2 className="text-center text-3xl my-6 font-extrabold capitalize">
        {collegeName}
      </h2>
      <Image
          src={"/enrolmentForm/Logos/eden-college-logo-final.png"}
          alt={"Eden college logo"}
          width={80}
          height={40}
        ></Image>
    </div>
  </>
);

export default Header;
