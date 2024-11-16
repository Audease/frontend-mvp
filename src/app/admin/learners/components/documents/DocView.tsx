"use client";

import React, { useEffect, useState } from "react";
import Appeal from "./applicationForm/AppealProcedure/Appeal";
import Complaint from "./applicationForm/Complaint";
import { applicationForm } from "./dummyForm";
import BehaviouralPolicy from "./applicationForm/BehaviouralPolicy/BehaviouralPolicy";
import CandidateRecordForm from "./applicationForm/CandidateRecord";
import Confidentiality from "./applicationForm/Confidentiality/Confidentiality";
import DataProtection from "./applicationForm/DataProtection/DataProtection";
import EqualOpportunitiesPolicy from "./applicationForm/EqualOpoortunities/EqualOpportunities";
import HealthSafetyPolicy from "./applicationForm/HealthSafetyPolicy/HealthSafetyPolicy";
import GuidancePolicy from "./applicationForm/GuidancePolicy/GuidancePolicy";
import Enrolment from "./applicationForm/EnrollmentForm/Enrolment";
import PrivacyNotice from "./applicationForm/PrivacyNotice/PrivacyNotice";
import Image from "next/image";
import Pagination from "./applicationForm/components/Pagination";
import AwardAssessment from "./applicationForm/AwardAssessment.tsx";
import EmployerAgreement from "./applicationForm/EmployerAgreement";
import ParticipantAgreement from "./applicationForm/ParticipantAgreement";
import ExtremismPolicy from "./applicationForm/ExtremismPolicy/ExtremismPolicy";
import ChildProtection from "./applicationForm/ChildProtection/ChildProtection";
import SkillsAssessment from "./applicationForm/SkillSelfAssessment/Assessment";
import { FinalSubmissionAlert } from "./applicationForm/components/DialogueBox";
import SubmissionSuccess from "./applicationForm/SubmissionSuccess";

export default function DocView({ onBackClick }) {
  const [formData, setFormData] = useState({
    behavioural: {},
    candidaterecord: {},
    confidentiality: {},
    dataprotection: {},
    equalopportunities: {},
    healthandsafetypolicy: {},
    guidancepolicy: {},
    enrolment: {},
    privacynotice: {},
    awardassessment: {},
    employeragreement: {},
    participantagreement: {},
    extremismpolicy: {},
    childprotection: {},
    skillsassessment: {},
  });

  const [CollegeName, setCollegeName] = useState<string>("");
  const [formContent, setFormContent] = useState<string>("Appeal");
  const [totalSectionNumber, setTotalSectionNumber] = useState<number>();
  const [sectionNumber, setSectionNumber] = useState<number>(1);
  const [showDialog, setShowDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Array of components
  const formComponents = [
    "Appeal",
    "Complaint",
    "BehaviouralPolicy",
    "CandidateRecord",
    "Confidentiality",
    "DataProtection",
    "EqualOpportunities",
    "HealthSafetyPolicy",
    "GuidancePolicy",
    "Enrolment",
    "PrivacyNotice",
    "AwardAssessment",
    "EmployerAgreement",
    "ParticipantAgreement",
    "ExtremismPolicy",
    "ChildProtection",
    "SkillsAssessment",
    "SubmissionSuccess",
  ];

  useEffect(() => {
    const form = applicationForm[0];
    if (form) {
      setCollegeName(form.name);
      setTotalSectionNumber(formComponents.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FORM_STORAGE_KEY = "multi-step-form-data";
  useEffect(() => {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleSaveFormData = (data, formType) => {
    setFormData((prevData) => ({
      ...prevData,
      [formType.toLowerCase()]: {
        ...prevData[formType.toLowerCase()],
        ...data,
      },
    }));
  };

  const renderFormComponent = () => {
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
          />
        );
      case "CandidateRecord":
        return (
          <CandidateRecordForm
            formData={formData.candidaterecord}
            setFormData={(data) => handleSaveFormData(data, "candidaterecord")}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        );
      case "Confidentiality":
        return (
          <Confidentiality
            formData={formData.confidentiality}
            setFormData={(data) => handleSaveFormData(data, "confidentiality")}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        );
      case "DataProtection":
        return (
          <DataProtection
            formData={formData.dataprotection}
            setFormData={(data) => handleSaveFormData(data, "dataprotection")}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
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
          />
        );
      case "GuidancePolicy":
        return (
          <GuidancePolicy
            formData={formData.guidancepolicy}
            setFormData={(data) => handleSaveFormData(data, "guidancepolicy")}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
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

  const onNextClick = () => {
    if (sectionNumber >= totalSectionNumber - 1) {
      setShowDialog(true);
    } else {
      setSectionNumber((prev) => Math.min(prev + 1, totalSectionNumber));
      setFormContent(formComponents[sectionNumber] || "Appeal");
    }
  };

  const onPrevClick = () => {
    setSectionNumber((prev) => Math.max(prev - 1, 1));
    setFormContent(formComponents[sectionNumber - 2] || "Appeal");
  };

  const handleSubmit = () => {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    console.log("Form submitted:", formData);
    setShowDialog(false);
    setSubmitted(true);
    setFormContent("SubmissionSuccess");
  };

  const handlePageClick = (pageNumber) => {
    setSectionNumber(pageNumber);
    setFormContent(formComponents[pageNumber - 1] || "Appeal");
  };

  return (
    <div className="space-y-4 border-tgrey2  p-4 mb-8  rounded-xl border  bg-tgrey4 text-card-foreground shadow">
      <div className="flex flex-row justify-between m-4">
        <button onClick={onBackClick}>Back</button>
        <h3>{`Page ${sectionNumber} of  ${totalSectionNumber - 1}`}</h3>
      </div>
      <div className="flex flex-row px-4 justify-between ">
        <div></div>
        <h2 className="text-center text-3xl my-6 font-extrabold capitalize">
          {CollegeName}
        </h2>
        <Image
          src={"/EdenCollegelogo.jpg"}
          alt={""}
          width={80}
          height={40}
        ></Image>
      </div>
      <div>
        <div>{renderFormComponent()}</div>
        {showDialog && (
          <FinalSubmissionAlert
            isOpen={showDialog}
            onClose={() => setShowDialog(false)}
            handleSubmit={handleSubmit}
          />
        )}
        {showSuccessMessage && <SubmissionSuccess />}
        <div>
          <Pagination
            currentPage={sectionNumber}
            totalPages={totalSectionNumber - 1}
            onPageClick={handlePageClick}
          />
        </div>
      </div>
    </div>
  );
}
