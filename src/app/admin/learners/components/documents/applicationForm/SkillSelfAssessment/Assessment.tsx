import React from "react";
import { skillsAssesment } from "./data/skillsAssessment";
import SkillsAssessmentForm from "./AssessmentForm";


interface SkillsAssessmentProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const content = skillsAssesment;

const SkillsAssessment = ({
  formData,
  setFormData,
  onNextClick,
  onPrevClick,
}: SkillsAssessmentProps) => {
  return (
    <div>
      <div>
        <h3>{content.title}</h3>
      </div>
      <div>
        {/* The Form  */}
        <SkillsAssessmentForm
          {...{ formData, setFormData, onPrevClick, onNextClick }}
        />
      </div>
    </div>
  );
};

export default SkillsAssessment;
