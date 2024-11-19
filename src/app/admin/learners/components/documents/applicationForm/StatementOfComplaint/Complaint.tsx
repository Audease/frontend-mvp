import React from "react";
import { Button } from "@/components/ui/button";
import { complaintData } from "./data/Commplaint";
import FootLogos from "../components/FootLogos";

type ComplaintProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const Complaint: React.FC<ComplaintProps> = ({ onPrevClick, onNextClick }) => {
  return (
    <div>
      <div key={complaintData.id}>
        <div className="text-xl font-bold py-3">
          <div>{complaintData.title}</div>
        </div>
        {complaintData.description.map((list) => {
          return (
            <div key={list.id} className="text-base flex justify-start text-justify">
              <p>{list.paragraph}</p>
            </div>
          );
        })}
      </div>
      <div className="my-3">
        <FootLogos />
      </div>

      <div className="flex flex-row space-x-5 my-8">
        <Button onClick={onPrevClick}>Back</Button>
        <Button onClick={onNextClick}>Proceed</Button>
      </div>
    </div>
  );
};

export default Complaint;
