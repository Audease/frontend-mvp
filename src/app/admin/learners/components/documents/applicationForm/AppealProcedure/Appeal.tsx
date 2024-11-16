import React from "react";
import { Button } from "@/components/ui/button";
import { appealData } from "./data/AppealProcedure";
import AppealsFlow from "./ProccessFlow";

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
        <div className="text-base font-normal flex flex-col space-y-2 justify-start">
          {appealData.description.map((d, index) => (
            <p key={index}>{d}</p>
          ))}
        </div>
        <div>
          <AppealsFlow />
        </div>
      </div>

      <div className="flex flex-row space-x-5 my-8">
        <Button onClick={onPrevClick}>Back</Button>
        <Button onClick={onNextClick}>Proceed</Button>
      </div>
    </div>
  );
};

export default Appeal;
