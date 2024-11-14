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
        <h3>{content.title}</h3>
        <p>{content.description}</p>
      </div>
      <div>
        {content.points.map((d, index) => (
          <div key={index}>
            <p>{d.text}</p>
            {d.points.map((dd, index) => (
              <li key={index}>{dd}</li>
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
