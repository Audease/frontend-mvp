"use client";

import React, { useEffect, useState } from "react";
import {
  applicationForm,
  formComponentsArray,
} from "../applicationForm/mainForm";
import Pagination from "../applicationForm/components/Pagination";
import RenderFormComponent from "./RenderComponent";
import LoadingSpinner from "@/app/components/dashboard/Spinner";
import DialogRender from "./DialogueRender";
import Header from "./Header";
import { accessorApprove, accessorReject } from "../lib/accessorActions";
import { useUserRole } from "../lib/hooks/useUserRole";
import { useFormNavigation } from "../lib/hooks/useFormNavigation";
import { useFormDataManager } from "../lib/hooks/useFormDataManager";

interface DocViewProps {
  userId: string;
  onBackClick: () => void;
}

export default function DocView({ onBackClick, userId }: DocViewProps) {
  const USER_DOCS_STORAGE_KEY = `user-docs-${userId}`;

  // Local state
  const [CollegeName, setCollegeName] = useState<string>("");
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hooks for user role and navigation
  const userRole = useUserRole();
  const {
    formContent,
    sectionNumber,
    totalSectionNumber,
    goToNextSection,
    goToPreviousSection,
    goToSpecificSection,
    setFormContent,
  } = useFormNavigation(formComponentsArray);

  const { formData, updateFormData } = useFormDataManager(userId);

  // Load college name on mount
  useEffect(() => {
    const form = applicationForm[0];
    if (form) {
      setCollegeName(form.name);
    }
  }, []);

  // Handlers
  const handleSubmit = () => {
    localStorage.setItem(USER_DOCS_STORAGE_KEY, JSON.stringify(formData));
    setShowDialog(false);
    setIsSubmitted(true);
    if (userRole === "learner") {
      setFormContent("SubmissionSuccess");
    } else {
      setFormContent("AccessorSuccessPage");
    }
  };

  const handleReject = () => {
    accessorReject(
      userId,
      setLoading,
      setShowDialog,
      setIsSubmitted,
      setFormContent
    );
  };

  const handleApprove = () => {
    accessorApprove(
      userId,
      formData,
      USER_DOCS_STORAGE_KEY,
      setLoading,
      setShowDialog,
      setIsSubmitted,
      setFormContent
    );
  };

  // Render
  return (
    <div className="space-y-4 border-tgrey2 p-4 mb-8 rounded-xl border bg-tgrey4 text-card-foreground shadow">
      {/* Header */}
      <Header
        onBackClick={onBackClick}
        sectionNumber={sectionNumber}
        totalSectionNumber={totalSectionNumber - 3}
        collegeName={CollegeName}
      />

      {/* Form Content */}
      <div>
        <div className="relative">
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
              <LoadingSpinner />
            </div>
          )}

          <div className="px-4">
            <RenderFormComponent
              formContent={formContent}
              formData={formData}
              handleSaveFormData={updateFormData}
              onPrevClick={goToPreviousSection}
              onNextClick={goToNextSection}
              isSubmitted={isSubmitted}
              userRole={userRole}
            />
          </div>
        </div>

        {/* Dialog Render */}
        <DialogRender
          useRole={userRole}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          handleSubmit={handleSubmit}
          accessorApprove={async () => handleApprove()}
          accessorReject={async () => handleReject()}
        />

        {/* Pagination */}
        <div>
          <Pagination
            currentPage={sectionNumber}
            totalPages={totalSectionNumber - 3}
            onPageClick={goToSpecificSection}
          />
        </div>
      </div>
    </div>
  );
}
