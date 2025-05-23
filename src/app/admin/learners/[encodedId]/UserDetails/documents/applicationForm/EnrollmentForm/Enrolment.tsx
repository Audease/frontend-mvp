"use client";

import React from "react";
import EnrolmentForm from "./EnrollmentDataForm";
import { enrolmentData } from "./data/Enrollment";

interface EnrolmentProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  userRole?: string;
  isSubmitted?: boolean;
}

const content = enrolmentData;

const Enrolment: React.FC<EnrolmentProps> = ({
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

      {/* The Form */}
      <EnrolmentForm
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

export default Enrolment;
