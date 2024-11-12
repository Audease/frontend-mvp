import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type Props = {
  onNextClick?: () => void;
};

const FrontCover = ({ onNextClick }: Props) => {
  return (
    <div className="h-full">
      <div className="text-center p-10 flex flex-col space-y-10">
        <h3 className="text-3xl font-semibold">EDEN COLLEGE LEARNER ENROLMENT FORM</h3>
        <p className="text-xl">Kindly fill the forms accordingly</p>
      </div>
      <div className="flex flex-col lg:flex-row justify-center m-10 space-x-4">
        <Image src={"/enrolmentForm/EdenCollegelogo.jpg"} alt={"Eden college logo"} width={50} height={50} ></Image>
        <Image src={"/enrolmentForm/Logos/Ed&Skills.png"} alt={"ED & Skills logo"} width={50} height={50} ></Image>
        <Image src={"/enrolmentForm/Logos/EY.jpg"} alt={"EY logo"} width={50} height={50} ></Image>
        <Image src={"/enrolmentForm/Logos/FocusAwards.jpeg"} alt={"Focus Awards logo"} width={50} height={50} ></Image>
        <Image src={"/enrolmentForm/Logos/InvestorsInPeople.jpg"} alt={"Investores In People logo"} width={50} height={50} ></Image>
        <Image src={"/enrolmentForm/Logos/NCFE.jpg"} alt={"NCFElogo"} width={50} height={50} ></Image>
        <Image src={"/enrolmentForm/Logos/Picture1.jpg"} alt={"Picturelogo"} width={50} height={50} ></Image>
        <Image src={"/enrolmentForm/Logos/Picture1.png"} alt={"Picture logo"} width={50} height={50} ></Image>
        <Image src={"/enrolmentForm/Logos/TQUK.png"} alt={"TQUK logo"} width={50} height={50} ></Image>
        <Image src={"/enrolmentForm/Logos/VTCT.jpg"} alt={"VTCT logo"} width={50} height={50} ></Image>
      </div>
      <div className="flex justify-center">
        <Button onClick={onNextClick}>Proceed</Button>
      </div>
    </div>
  );
};

export default FrontCover;
