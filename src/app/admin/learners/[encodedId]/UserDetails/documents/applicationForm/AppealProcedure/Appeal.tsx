import React from "react";
import { Button } from "@/components/ui/button";
import { appealData } from "./data/AppealProcedure";
import AppealsFlow from "./ProccessFlow";
import FootLogos from "../components/FootLogos";

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
          <h3 className="flex justify-center text-center pt-3 font-bold text-xl">
            Diagram
          </h3>
          <AppealsFlow />
        </div>
      </div>
      <div>
        <FootLogos />
      </div>

      <div className="flex flex-row space-x-5 my-8">
        <Button onClick={onPrevClick}>Back</Button>
        <Button onClick={onNextClick}>Proceed</Button>
      </div>
    </div>
  );
};

export default Appeal;
