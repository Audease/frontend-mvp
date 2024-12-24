"use client";

import React from "react";
import Appeal from "../applicationForm/AppealProcedure/Appeal";
import Complaint from "../applicationForm/StatementOfComplaint/Complaint";
import BehaviouralPolicy from "../applicationForm/BehaviouralPolicy/BehaviouralPolicy";
import CandidateRecordForm from "../applicationForm/CandidateRecord/CandidateRecord";
import Confidentiality from "../applicationForm/Confidentiality/Confidentiality";
import DataProtection from "../applicationForm/DataProtection/DataProtection";
import EqualOpportunitiesPolicy from "../applicationForm/EqualOpoortunities/EqualOpportunities";
import HealthSafetyPolicy from "../applicationForm/HealthSafetyPolicy/HealthSafetyPolicy";
import GuidancePolicy from "../applicationForm/GuidancePolicy/GuidancePolicy";
import Enrolment from "../applicationForm/EnrollmentForm/Enrolment";
import PrivacyNotice from "../applicationForm/PrivacyNotice/PrivacyNotice";
import EmployerAgreement from "../applicationForm/EmployerAgreement/EmployerAgreement";
import ParticipantAgreement from "../applicationForm/ParticipantAgreement/ParticipantAgreement";
import ExtremismPolicy from "../applicationForm/ExtremismPolicy/ExtremismPolicy";
import ChildProtection from "../applicationForm/ChildProtection/ChildProtection";
import SkillsAssessment from "../applicationForm/SkillSelfAssessment/Assessment";
import AwardAssessment from "../applicationForm/AwardAssessment/AwardAssessment.tsx";
import SubmissionSuccess from "../applicationForm/components/SubmissionSuccess";
import AccessorSuccessPage from "../applicationForm/components/AccessorSuccessPage";
import AccessorRejectPage from "../applicationForm/components/AccessorRejectPAge";

const RenderFormComponent = ({
  formContent,
  formData,
  handleSaveFormData,
  onPrevClick,
  onNextClick,
  isSubmitted,
  userRole,
}) => {
  switch (formContent) {
    case "Appeal":
      return <Appeal {...{ onPrevClick, onNextClick }} />;
    case "Complaint":
      return <Complaint {...{ onPrevClick, onNextClick }} />;
    case "BehaviouralPolicy":
      return (
        <BehaviouralPolicy
          formData={formData.behavioral}
          setFormData={async (data) => await (handleSaveFormData("behavioral", data  ))}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "CandidateRecord":
      return (
        <CandidateRecordForm
          formData={formData.candidate_record}
          setFormData={(data) => handleSaveFormData("candidate_record", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "Confidentiality":
      return (
        <Confidentiality
          formData={formData.confidentiality}
          setFormData={(data) => handleSaveFormData("confidentiality", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "DataProtection":
      return (
        <DataProtection
          formData={formData.data_protection}
          setFormData={(data) => handleSaveFormData("data_protection", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "EqualOpportunities":
      return (
        <EqualOpportunitiesPolicy
          formData={formData.equal_opportunities}
          setFormData={(data) => handleSaveFormData("equal_opportunities", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "HealthSafetyPolicy":
      return (
        <HealthSafetyPolicy
          formData={formData.health_and_safety}
          setFormData={(data) =>
            handleSaveFormData("health_and_safety", data)
          }
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "GuidancePolicy":
      return (
        <GuidancePolicy
          formData={formData.guidance_policy}
          setFormData={(data) => handleSaveFormData("guidance_policy", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "Enrolment":
      return (
        <Enrolment
          formData={formData.complaint}
          setFormData={(data) => handleSaveFormData("complaint", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "PrivacyNotice":
      return (
        <PrivacyNotice
          formData={formData.privacy_notice}
          setFormData={(data) => handleSaveFormData("privacy_notice", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "AwardAssessment":
      return (
        <AwardAssessment
          formData={formData.award_assessment}
          setFormData={(data) => handleSaveFormData("award_assessment", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "EmployerAgreement":
      return (
        <EmployerAgreement
          formData={formData.employer_agreement}
          setFormData={(data) => handleSaveFormData("employer_agreement", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "ParticipantAgreement":
      return (
        <ParticipantAgreement
          formData={formData.participant_agreement}
          setFormData={(data) =>
            handleSaveFormData("participant_agreement", data)
          }
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "ExtremismPolicy":
      return (
        <ExtremismPolicy
          formData={formData.extremism_policy}
          setFormData={(data) => handleSaveFormData("extremism_policy", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "ChildProtection":
      return (
        <ChildProtection
          formData={formData.child_protection}
          setFormData={(data) => handleSaveFormData("child_protection", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "SkillsAssessment":
      return (
        <SkillsAssessment
          formData={formData.skills_assessment}
          setFormData={(data) => handleSaveFormData("skills_assessment", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "SubmissionSuccess":
      return <SubmissionSuccess />;
    case "AccessorSuccessPage":
      return <AccessorSuccessPage />;
    case "AccessorRejectPage":
      return <AccessorRejectPage />;
    default:
      return <Appeal {...{ onNextClick }} />;
  }
};

export default RenderFormComponent;
