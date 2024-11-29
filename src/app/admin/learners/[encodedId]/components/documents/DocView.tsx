"use client";

import React, { useEffect, useState } from "react";
import { applicationForm } from "./dummyForm";
import Image from "next/image";
import Pagination from "./applicationForm/components/Pagination";
import { FinalSubmissionAlert } from "./applicationForm/components/DialogueBox";
import { SlArrowLeft } from "react-icons/sl";
import RenderFormComponent from "./RenderComponent";
import { useAppSelector } from "@/redux/store";
import { usePathname } from "next/navigation";
import { AccessorDialogueBox } from "./applicationForm/components/AccessorDialogueBox";
import {
  ApproveLearner,
  RejectLearner,
} from "@/app/admin/(adminPersonaScreens)/accessor-dashboard/utils/action";
import LoadingSpinner, {
  LoadingSpinner2,
} from "@/app/components/dashboard/Spinner";

interface DocViewProps {
  userId: string;
  onBackClick: () => void;
}

export default function DocView({ onBackClick, userId }: DocViewProps) {
  const USER_DOCS_STORAGE_KEY = `user-docs-${userId}`;
  const pathname = usePathname();

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
  const [useRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(false);

  const userPermissions = useAppSelector(
    (state) => state.authReducer.value.userPermission
  );

  useEffect(() => {
    if (
      userPermissions.length > 4 &&
      pathname === "/admin/accessor-dashboard"
    ) {
      setUserRole("accessor");
    } else if (
      userPermissions.length > 4 &&
      pathname !== "/admin/accessor-dashboard"
    ) {
      setUserRole("Admin");
    } else if (userPermissions.includes("Student/Learner")) {
      setUserRole("learner");
    } else if (userPermissions === "Approve/reject application") {
      setUserRole("accessor");
    }
  }, [userPermissions, pathname]);

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
    "AccessorSuccessPage",
    "AccessorRejectPage",
  ];

  useEffect(() => {
    const form = applicationForm[0];
    if (form) {
      setCollegeName(form.name);
      setTotalSectionNumber(formComponents.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem(USER_DOCS_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }
  }, [USER_DOCS_STORAGE_KEY]);

  useEffect(() => {
    localStorage.setItem(USER_DOCS_STORAGE_KEY, JSON.stringify(formData));
  }, [formData, USER_DOCS_STORAGE_KEY]);

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
    if (sectionNumber >= totalSectionNumber - 3) {
      setShowDialog(true);
    } else {
      setSectionNumber((prev) => Math.min(prev + 1, totalSectionNumber));
      setFormContent(formComponents[sectionNumber] || "Appeal");
    }
  };

  const onPrevClick = () => {
    setSectionNumber((prev) => Math.max(prev - 1, 1));
    setFormContent(formComponents[sectionNumber - 1] || "Appeal");
  };

  const handlePageClick = (pageNumber) => {
    setSectionNumber(pageNumber);
    setFormContent(formComponents[pageNumber - 1] || "Appeal");
  };

  const handleSubmit = () => {
    localStorage.setItem(USER_DOCS_STORAGE_KEY, JSON.stringify(formData));
    setShowDialog(false);
    setIsSubmitted(true);
    if (useRole === "learner") {
      setFormContent("SubmissionSuccess");
    } else {
      setFormContent("AccessorSuccessPage");
    }
  };

  const accessorReject = async () => {
    setLoading(true);
    try {
      const success = await RejectLearner(userId);
      setShowDialog(false);
      setIsSubmitted(false);

      if (success) {
        setFormContent("AccessorRejectPage");
      } else {
        alert("Failed to reject learner.");
      }
    } catch (error) {
      console.error("Error during rejection:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const accesssorApprove = async () => {
    localStorage.setItem(USER_DOCS_STORAGE_KEY, JSON.stringify(formData));
    setLoading(true);
    const success = await ApproveLearner(userId);
    setShowDialog(false);
    setIsSubmitted(false);
    if (success) {
      setFormContent("AccessorSuccessPage");
    } else if (!success) {
      alert("An unexpected error occurred. Please try again.");
    }
    setLoading(false);
  };

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
        <h3>{`Page ${sectionNumber} of  ${totalSectionNumber - 3}`}</h3>
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
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
              <LoadingSpinner />
            </div>
          )}
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
        </div>

        {useRole !== "Admin" &&
          showDialog &&
          (useRole === "accessor" ? (
            <AccessorDialogueBox
              isOpen={showDialog}
              onClose={() => setShowDialog(false)}
              approve={accesssorApprove}
              reject={accessorReject}
            />
          ) : (
            <FinalSubmissionAlert
              isOpen={showDialog}
              onClose={() => setShowDialog(false)}
              handleSubmit={handleSubmit}
            />
          ))}
        <div>
          <Pagination
            currentPage={sectionNumber}
            totalPages={totalSectionNumber - 3}
            onPageClick={handlePageClick}
          />
        </div>
      </div>
    </div>
  );
}
