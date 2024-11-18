import React from "react";
import { Button } from "@/components/ui/button";
import { appealData } from "./data/AppealProcedure";
import AppealsFlow from "./ProccessFlow";
import Image from "next/image";

type AppealProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const Appeal: React.FC<AppealProps> = ({ onNextClick, onPrevClick }) => {
  return (
    <div>
      <div key={appealData.id}>
        <div className="text-xl font-bold py-3">
          <div>{appealData.title}</div>
        </div>
        <div className="text-base font-normal flex text-justify">
          <p>{appealData.description}</p>
        </div>
        <div>
          <h3 className="flex justify-center text-center pt-3 font-bold text-xl">Diagram</h3>
          <AppealsFlow />
        </div>
      </div>
      <div className="flex flex-row space-x-4 py-4 justify-center ">
        <Image src={"/enrolmentForm/Logos/imageN.png"} alt={"European union logo"} width={100} height={40} quality={100} layout="intrinsic"></Image>
        <Image src={"/enrolmentForm/Logos/Frame3.png"} alt={"European union logo"}width={100} height={40} quality={100}></Image>
        <Image src={"/enrolmentForm/Logos/FocusAwards.png"} alt={"European union logo"} width={80} height={20} quality={100}></Image>
        <Image src={"/enrolmentForm/Logos/InvestorsInPeople.jpg"} alt={"European union logo"} width={80} height={20} quality={100}></Image>
        <Image src={"/enrolmentForm/Logos/NCFE.jpg"} alt={"European union logo"} width={80} height={20} quality={100}></Image>
        <Image src={"/enrolmentForm/Logos/Picture1.jpg"} alt={"European union logo"} width={80} height={20} quality={100}></Image>
        <Image src={"/enrolmentForm/Logos/Picture1.png"} alt={"European union logo"} width={80} height={20} quality={100}></Image>
        <Image src={"/enrolmentForm/Logos/TQUK.png"} alt={"European union logo"} width={80} height={20} quality={100}></Image>
        <Image src={"/enrolmentForm/Logos/VTCT.jpg"} alt={"European union logo"} width={80} height={20} quality={100}></Image>
      </div>

      <div className="flex flex-row space-x-5 my-8">
        <Button onClick={onPrevClick}>Back</Button>
        <Button onClick={onNextClick}>Proceed</Button>
      </div>
    </div>
  );
};

export default Appeal;
