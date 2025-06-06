"use client";

import React from "react";
import CollegeObligation from "./CollegeObligation";
import { dataProtectionData } from "./data/DataProtection";

interface DataProtectionProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  isSubmitted?: boolean;
  userRole?: string;
}

const DataProtection: React.FC<DataProtectionProps> = ({
  formData,
  setFormData,
  onPrevClick,
  onNextClick,
  isSubmitted,
  userRole
}) => {
  return (
    <div>
      <div key={dataProtectionData.id}>
        <h3 className="text-xl font-bold py-3">{dataProtectionData.title}</h3>
        {/* The Form  */}
        <CollegeObligation
          {...{ formData, setFormData, onPrevClick, onNextClick , isSubmitted,
            userRole}}
        />
      </div>
    </div>
  );
};

export default DataProtection;
