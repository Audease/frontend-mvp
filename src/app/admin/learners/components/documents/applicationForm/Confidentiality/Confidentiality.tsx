"use client";

import React from "react";
import ConfidentialityForm from "./ConfidentitalityForm";
import { confidentialityData } from "./data/Confidentiality";

interface ConfidentialityPolicyProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const Confidentiality: React.FC<ConfidentialityPolicyProps> = ({
  formData,
  setFormData,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div>
      <div key={confidentialityData.id}>
        <h3 className="text-xl font-bold py-3">{confidentialityData.title}</h3>
        <div>
          {confidentialityData.paragraphs.map((list) => (
            <div key={list.id} >
              <p className="text-base text-justify">{list.p}</p>
            </div>
          ))}
        </div>
        {/* The Form  */}
        <ConfidentialityForm
          {...{ formData, setFormData, onPrevClick, onNextClick }}
        />
      </div>
    </div>
  );
};

export default Confidentiality;
