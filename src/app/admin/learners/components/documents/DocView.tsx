"use client";

import React, { useEffect, useState } from "react";
import { applicationForm } from "./dummyForm";
import Image from "next/image";
import Pagination from "./applicationForm/components/Pagination";
import { FinalSubmissionAlert } from "./applicationForm/components/DialogueBox";
import SubmissionSuccess from "./applicationForm/SubmissionSuccess";
import { SlArrowLeft } from "react-icons/sl";
import RenderFormComponent from "./RenderComponent";

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [useRole, setUserRole] = useState("learner")

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

  const handlePageClick = (pageNumber) => {
    setSectionNumber(pageNumber);
    setFormContent(formComponents[pageNumber - 1] || "Appeal");
  };

  const handleSubmit = () => {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    console.log("Form submitted:", formData);
    setShowDialog(false);
    setIsSubmitted(true);
    setFormContent("SubmissionSuccess");
  };

  const openUpForEdit = (e) => {
    e.preventDefault();
    setIsSubmitted(false)
  }


  return (
    <div className="space-y-4 border-tgrey2  p-4 mb-8  rounded-xl border  bg-tgrey4 text-card-foreground shadow">
      <div className="flex flex-row justify-between m-4">
        <div className="pt-1 ">
          <button
            className="flex flex-row space-x-2"
            type="button"
            onClick={onBackClick}
          >
            <div className="pt-2">
              <SlArrowLeft className=" h-[0.6rem]" />
            </div>
            <p className="font-medium text-base">Back</p>
          </button>
        </div>
        <h3>{`Page ${sectionNumber} of  ${totalSectionNumber - 1}`}</h3>
      </div>
      <div className="flex flex-row px-4 justify-between ">
        <div></div>
        <h2 className="text-center text-3xl my-6 font-extrabold capitalize">
          {CollegeName}
        </h2>
        <Image
          src={"/enrolmentForm/Logos/eden-college-logo-final.png"}
          alt={"Eden college logo"}
          width={80}
          height={40}
        ></Image>
      </div>
      <div>
        <div className="px-4">
          <RenderFormComponent
            formContent={formContent}
            formData={formData}
            handleSaveFormData={handleSaveFormData}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
            isSubmitted={isSubmitted}
            userRole={useRole}
          />
        </div>
        {showDialog && (
          <FinalSubmissionAlert
            isOpen={showDialog}
            onClose={() => setShowDialog(false)}
            handleSubmit={handleSubmit}
          />
        )}

        <button onClick={openUpForEdit}>Open Up</button>
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
