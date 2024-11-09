import React from "react";
import { applicationForm } from "../dummyForm";
import { Text } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";

type ComplaintProps = {
  onNextClick?: () => void;
  onPrevClick?: () => void;
};


const Complaint: React.FC<ComplaintProps> = ({onPrevClick, onNextClick}) => {
  return (
    <div>
      {applicationForm.map((section) => {
        return (
          <div key={section.id}>
            <div className="text-xl">
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {section.complaints.title}
              </Text>
            </div>
            {section.complaints.description.map((list) => {
              return (
                <div key={list.id} className="text-lg">
                  <Text style={{ fontSize: 12 }}>{list.paragraph}</Text>
                </div>
              );
            })}
          </div>
        );
      })}
      <div className="flex flex-row space-x-5 my-8">
        <Button onClick={onPrevClick}>Back</Button>
        <Button onClick={onNextClick}>Proceed</Button>
      </div>
    </div>
  );
};

export default Complaint;
