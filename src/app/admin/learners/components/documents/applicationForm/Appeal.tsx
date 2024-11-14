import React from "react";
import { applicationForm } from "../dummyForm";
import { Button } from "@/components/ui/button";

type AppealProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const Appeal: React.FC<AppealProps> = ({ onNextClick, onPrevClick }) => {
  return (
    <div>
      {applicationForm.map((section) => (
        <div key={section.id}>
          <div className="text-xl py-3">
            <div>{section.appeal.title}</div>
          </div>
          <div className="text-lg flex justify-start">
            <div>{section.appeal.description}</div>
          </div>
          <div className="text-lg flex flex-col justify-start">
            {section.appeal.diagram.map((list) => (
              <li key={list.id}>
                <p>{list.title}</p>
                <p>{list.text}</p>
              </li>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-row space-x-5 my-8">
        <Button onClick={onPrevClick}>Back</Button>
        <Button onClick={onNextClick}>Proceed</Button>
      </div>
    </div>
  );
};

export default Appeal;
