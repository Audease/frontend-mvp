"use client";

import React, { useEffect, useState } from "react";
import {
  applicationForm,
  formComponentsArray,
} from "../applicationForm/mainForm";
import Pagination from "../applicationForm/components/Pagination";
import RenderFormComponent from "./RenderComponent";
import LoadingSpinner, {
  LoadingSpinner2,
} from "@/app/components/dashboard/Spinner";
import DialogRender from "./DialogueRender";
import Header from "./Header";
import { accessorApprove, accessorReject } from "../lib/accessorActions";
import { useUserRole } from "../lib/hooks/useUserRole";
import { useFormNavigation } from "../lib/hooks/useFormNavigation";
import { useFormDataManager } from "../lib/hooks/useFormDataManager";
import { SubmitFinal } from "../lib/learnerFinalSubmission";
import { AccessorRejectDialog } from "./AccessorRejectDialog";

interface DocViewProps {
  userId: string;
  onBackClick: () => void;
}

export default function DocView({ onBackClick, userId }: DocViewProps) {
  // Local state
  const [CollegeName, setCollegeName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Hooks for user role and navigation
  const userRole = useUserRole();
  const {
    formContent,
    sectionNumber,
    totalSectionNumber,
    setShowDialog,
    ShowDialog,
    goToNextSection,
    goToPreviousSection,
    goToSpecificSection,
    setFormContent,
  } = useFormNavigation(formComponentsArray);

  const { formData, formLoading, isSubmitted, updateFormData } =
    useFormDataManager(userId);

  // Load college name on mount
  useEffect(() => {
    const form = applicationForm[0];
    if (form) {
      setCollegeName(form.name);
    }
  }, []);

  // Handlers
  const handleSubmit = async () => {
    await submitFinall();
    setShowDialog(false);
    if (userRole === "learner") {
      setFormContent("SubmissionSuccess");
    } else {
      setFormContent("AccessorSuccessPage");
    }
  };

  const handleReject = () => {
    setIsDialogOpen(true);
  };

  const handleAccessorDialogeReject = (rejectionReason) => {
    accessorReject(userId, rejectionReason, setLoading, setShowDialog, setFormContent);
  }

  const handleApprove = () => {
    accessorApprove(userId, setLoading, setShowDialog, setFormContent);
  };

  const submitFinall = async () => {
    try {
      const success = await SubmitFinal(userId);
      return { success };
    } catch (error) {
      return { success: false, error };
    }
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

          <div className="px-4 relative">
            {formLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-10">
                <LoadingSpinner2 />
              </div>
            )}
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
          showDialog={ShowDialog}
          setShowDialog={setShowDialog}
          handleSubmit={handleSubmit}
          accessorApprove={async () => handleApprove()}
          accessorReject={async () => handleReject()}
        />
        <div>
          <AccessorRejectDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onReject={handleAccessorDialogeReject}
          />
        </div>
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
