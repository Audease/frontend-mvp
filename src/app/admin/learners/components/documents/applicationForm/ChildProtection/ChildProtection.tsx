import React from "react";
import { childProtection } from "./data/childProtection";
import ChildProtectionForm from "./ChildProtectionForm";

interface ChildProtectionProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const content = childProtection;

const ChildProtection = ({
  formData,
  setFormData,
  onNextClick,
  onPrevClick,
}: ChildProtectionProps) => {
  return (
    <div>
      <div>
        <h3 className="text-xl font-bold py-3">{content.title}</h3>
        <p className="text-base text-justification">{content.description}</p>
      </div>
      <div>
        {content.points.map((d, index) => (
          <div key={index}>
            <p className="text-base text-justification">{d.text}</p>
            {d.points.map((dd, index) => (
              <li key={index} className="text-base text-justification">{dd}</li>
            ))}
          </div>
        ))}
      </div>
      <div>
        {/* The Form  */}
        <ChildProtectionForm
          {...{ formData, setFormData, onPrevClick, onNextClick }}
        />
      </div>
    </div>
  );
};

export default ChildProtection;
