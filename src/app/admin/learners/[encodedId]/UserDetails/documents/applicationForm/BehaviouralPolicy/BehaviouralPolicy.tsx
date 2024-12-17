"use client";

import React from "react";
import BehaviouralForm from "./BehaviouralForm";
import { behaviouralData } from "./data/Behavioural";


interface BehaviouralPolicyProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  isSubmitted?: boolean;
  userRole?: string;
}

const BehaviouralPolicy: React.FC<BehaviouralPolicyProps> = ({
  formData,
  setFormData,
  onPrevClick,
  onNextClick,
  isSubmitted,
  userRole
}) => {
  return (
    <div>
      <div key={behaviouralData.id}>
        <div className="text-xl font-bold py-3">
          <h3>{behaviouralData.title}</h3>
        </div>
        <div>
          {behaviouralData.section.map((list) => (
            <div key={list.id}>
              <div className="text-base font-bold">
                <h3>{list.title}</h3>
              </div>
              <div className="text-base text-justify">
                <p>{list.paragraph}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-base">
          {behaviouralData.bulletPoints.map((list) => (
            <ul key={list.id} className="pl-3">
              <li className="list-disc text-base">{list.paragraph}</li>
            </ul>
          ))}
        </div>
        {/* The Form  */}
        <BehaviouralForm
          {...{ formData, setFormData, onPrevClick, onNextClick, isSubmitted, userRole }}
        />
      </div>
    </div>
  );
};

export default BehaviouralPolicy;
