"use client";

import React from "react";
import HealthSafetyPolicyForm from "./HealthSafetyPolicyForm";
import { healthandSafetyData } from "./data/HealthandSafety";

interface HealthAndSafetyPolicyProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const content = healthandSafetyData;

const HealthSafetyPolicy: React.FC<HealthAndSafetyPolicyProps> = ({
  formData,
  setFormData,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div>
      <div className="text-xl flex flex-col">
        <h3 className="text-xl font-bold py-3">{content.title}</h3>
        <p className="text-base text-justify">{content.purpose}</p>
      </div>
      <div>
        {content.audience.map((section) => (
          <h3 key={section.id} className="text-base text-justify">
            {section.title}
          </h3>
        ))}
      </div>
      <div>
        {content.lists.map((section) => (
          <div key={section.id}>
            <h3 className="text-base font-bold py-3">{section.title}</h3>

            {section.points.map((section) => (
              <li key={section.id} className="text-base text-justify py-3">
                {section.point}
              </li>
            ))}
          </div>
        ))}
      </div>

      {/* The Form */}
      <HealthSafetyPolicyForm
        {...{ formData, setFormData, onPrevClick, onNextClick }}
      />
    </div>
  );
};

export default HealthSafetyPolicy;
