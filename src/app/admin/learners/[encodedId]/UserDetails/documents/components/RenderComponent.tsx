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
          formData={formData.behavioural}
          setFormData={async (data) => await (handleSaveFormData("behavioural", data  ))}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "CandidateRecord":
      return (
        <CandidateRecordForm
          formData={formData.candidaterecord}
          setFormData={(data) => handleSaveFormData("candidaterecord", data)}
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
          formData={formData.dataprotection}
          setFormData={(data) => handleSaveFormData("dataprotection", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "EqualOpportunities":
      return (
        <EqualOpportunitiesPolicy
          formData={formData.equalopportunities}
          setFormData={(data) => handleSaveFormData("equalopportunities", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "HealthSafetyPolicy":
      return (
        <HealthSafetyPolicy
          formData={formData.healthandsafetypolicy}
          setFormData={(data) =>
            handleSaveFormData("healthAndSafetyPolicy", data)
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
          formData={formData.guidancepolicy}
          setFormData={(data) => handleSaveFormData("guidancepolicy", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "Enrolment":
      return (
        <Enrolment
          formData={formData.enrolment}
          setFormData={(data) => handleSaveFormData("enrolment", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "PrivacyNotice":
      return (
        <PrivacyNotice
          formData={formData.privacynotice}
          setFormData={(data) => handleSaveFormData("privacynotice", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "AwardAssessment":
      return (
        <AwardAssessment
          formData={formData.awardassessment}
          setFormData={(data) => handleSaveFormData("awardassessment", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "EmployerAgreement":
      return (
        <EmployerAgreement
          formData={formData.employeragreement}
          setFormData={(data) => handleSaveFormData("employeragreement", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "ParticipantAgreement":
      return (
        <ParticipantAgreement
          formData={formData.participantagreement}
          setFormData={(data) =>
            handleSaveFormData("participantagreement", data)
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
          formData={formData.extremismpolicy}
          setFormData={(data) => handleSaveFormData("extremismpolicy", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "ChildProtection":
      return (
        <ChildProtection
          formData={formData.childprotection}
          setFormData={(data) => handleSaveFormData("childprotection", data)}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole={userRole}
        />
      );
    case "SkillsAssessment":
      return (
        <SkillsAssessment
          formData={formData.skillsassessment}
          setFormData={(data) => handleSaveFormData("skillsassessment", data)}
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
