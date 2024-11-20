"use client";

import React from "react";
import Appeal from "./applicationForm/AppealProcedure/Appeal";
import Complaint from "./applicationForm/StatementOfComplaint/Complaint";
import BehaviouralPolicy from "./applicationForm/BehaviouralPolicy/BehaviouralPolicy";
import CandidateRecordForm from "./applicationForm/CandidateRecord/CandidateRecord";
import Confidentiality from "./applicationForm/Confidentiality/Confidentiality";
import DataProtection from "./applicationForm/DataProtection/DataProtection";
import EqualOpportunitiesPolicy from "./applicationForm/EqualOpoortunities/EqualOpportunities";
import HealthSafetyPolicy from "./applicationForm/HealthSafetyPolicy/HealthSafetyPolicy";
import GuidancePolicy from "./applicationForm/GuidancePolicy/GuidancePolicy";
import Enrolment from "./applicationForm/EnrollmentForm/Enrolment";
import PrivacyNotice from "./applicationForm/PrivacyNotice/PrivacyNotice";
import EmployerAgreement from "./applicationForm/EmployerAgreement/EmployerAgreement";
import ParticipantAgreement from "./applicationForm/ParticipantAgreement/ParticipantAgreement";
import ExtremismPolicy from "./applicationForm/ExtremismPolicy/ExtremismPolicy";
import ChildProtection from "./applicationForm/ChildProtection/ChildProtection";
import SkillsAssessment from "./applicationForm/SkillSelfAssessment/Assessment";
import SubmissionSuccess from "./applicationForm/SubmissionSuccess";
import AwardAssessment from "./applicationForm/AwardAssessment/AwardAssessment.tsx";

const RenderFormComponent = ({
  formContent,
  formData,
  handleSaveFormData,
  onPrevClick,
  onNextClick,
  isSubmitted,
  userRole
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
          setFormData={(data) => handleSaveFormData(data, "behavioural")}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole = {userRole}
        />
      );
    case "CandidateRecord":
      return (
        <CandidateRecordForm
          formData={formData.candidaterecord}
          setFormData={(data) => handleSaveFormData(data, "candidaterecord")}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole = {userRole}
        />
      );
    case "Confidentiality":
      return (
        <Confidentiality
          formData={formData.confidentiality}
          setFormData={(data) => handleSaveFormData(data, "confidentiality")}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole = {userRole}
        />
      );
    case "DataProtection":
      return (
        <DataProtection
          formData={formData.dataprotection}
          setFormData={(data) => handleSaveFormData(data, "dataprotection")}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole = {userRole}
        />
      );
    case "EqualOpportunities":
      return (
        <EqualOpportunitiesPolicy
          formData={formData.equalopportunities}
          setFormData={(data) =>
            handleSaveFormData(data, "equalopportunities")
          }
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole = {userRole}
        />
      );
    case "HealthSafetyPolicy":
      return (
        <HealthSafetyPolicy
          formData={formData.healthandsafetypolicy}
          setFormData={(data) =>
            handleSaveFormData(data, "healthAndSafetyPolicy")
          }
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole = {userRole}
        />
      );
    case "GuidancePolicy":
      return (
        <GuidancePolicy
          formData={formData.guidancepolicy}
          setFormData={(data) => handleSaveFormData(data, "guidancepolicy")}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          isSubmitted={isSubmitted}
          userRole = {userRole}
        />
      );
    case "Enrolment":
      return (
        <Enrolment
          formData={formData.enrolment}
          setFormData={(data) => handleSaveFormData(data, "enrolment")}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
        />
      );
    case "PrivacyNotice":
      return (
        <PrivacyNotice
          formData={formData.privacynotice}
          setFormData={(data) => handleSaveFormData(data, "privacynotice")}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
        />
      );
    case "AwardAssessment":
      return (
        <AwardAssessment
          formData={formData.awardassessment}
          setFormData={(data) => handleSaveFormData(data, "awardassessment")}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
        />
      );
    case "EmployerAgreement":
      return (
        <EmployerAgreement
          formData={formData.employeragreement}
          setFormData={(data) =>
            handleSaveFormData(data, "employeragreement")
          }
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
        />
      );
    case "ParticipantAgreement":
      return (
        <ParticipantAgreement
          formData={formData.participantagreement}
          setFormData={(data) =>
            handleSaveFormData(data, "participantagreement")
          }
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
        />
      );
    case "ExtremismPolicy":
      return (
        <ExtremismPolicy
          formData={formData.extremismpolicy}
          setFormData={(data) => handleSaveFormData(data, "extremismpolicy")}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
        />
      );
    case "ChildProtection":
      return (
        <ChildProtection
          formData={formData.childprotection}
          setFormData={(data) => handleSaveFormData(data, "childprotection")}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
        />
      );
    case "SkillsAssessment":
      return (
        <SkillsAssessment
          formData={formData.skillsassessment}
          setFormData={(data) => handleSaveFormData(data, "skillsassessment")}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
        />
      );
    case "SubmissionSuccess":
      return <SubmissionSuccess />;
    default:
      return <Appeal {...{ onNextClick }} />;
  }
};

export default RenderFormComponent;
