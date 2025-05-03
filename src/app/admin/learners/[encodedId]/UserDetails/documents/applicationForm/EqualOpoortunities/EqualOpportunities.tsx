"use client";

import React from "react";
import EqualOpportunitiesForm from "./EqualOpportunitiesForm";
import { equalOpportunitiesData } from "./data/EqualOpportunities";

interface EqualOpportunitiesPolicyProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  isSubmitted?: boolean;
  userRole?: string;
}

const content = equalOpportunitiesData;

const EqualOpportunitiesPolicy: React.FC<EqualOpportunitiesPolicyProps> = ({
  formData,
  setFormData,
  onPrevClick,
  onNextClick,
  isSubmitted,
  userRole,
}) => {
  return (
    <div>
      <h3 className="text-xl font-bold py-3">{content.title}</h3>

      <div>
        {content.statement.map((section) => (
          <div key={section.id}>
            <p className="text-base text-justify">{section.text}</p>
          </div>
        ))}
      </div>
      <div>
        {content.procedures.map((section) => (
          <div key={section.id}>
            <p className="text-base text-justify">{section.text}</p>
            <div>
              {section.list.map((points) => (
                <div key={points.id}>
                  <li className="text-base text-justify">{points.text}</li>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* The Form */}
      <EqualOpportunitiesForm
        {...{
          formData,
          setFormData,
          onPrevClick,
          onNextClick,
          isSubmitted,
          userRole,
        }}
      />
    </div>
  );
};

export default EqualOpportunitiesPolicy;
