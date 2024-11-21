import React from "react";
import { skillsAssesment } from "./data/skillsAssessment";
import SkillsAssessmentForm from "./AssessmentForm";

interface SkillsAssessmentProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  userRole?: string;
  isSubmitted?: boolean;
}

const content = skillsAssesment;

const SkillsAssessment = ({
  formData,
  setFormData,
  onNextClick,
  onPrevClick,
  userRole,
  isSubmitted,
}: SkillsAssessmentProps) => {
  return (
    <div>
      <h3 className="text-xl font-bold py-3">{content.title}</h3>
      <div>
        <p className="text-base text-justification">{content.instructions}</p>
        {content.grade.map((d, index) => (
          <li key={index} className="text-base text-justification">
            {d.digit} : {d.text}
          </li>
        ))}
      </div>
      <div>
        {/* The Form  */}
        <SkillsAssessmentForm
          {...{
            formData,
            setFormData,
            onPrevClick,
            onNextClick,
            userRole,
            isSubmitted,
          }}
        />
      </div>
    </div>
  );
};

export default SkillsAssessment;
