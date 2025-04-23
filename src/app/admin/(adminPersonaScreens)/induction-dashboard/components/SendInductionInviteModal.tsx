"use client";

import React, { useState } from "react";
import FormComponent from "./FormComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Modal } from "flowbite-react";

export function MeetingFormDialog({ isOpen, onOpenChange, onSubmit, loading }) {
  const [activeTab, setActiveTab] = useState("manual");
  
  const handleFormSubmit = (formData) => {
    console.log("MeetingFormDialog received submission:", formData);
    
    // Determine which tab was used based on presence of meetingInfo
    const tabUsed = formData.meetingInfo ? "paste" : "manual";
    console.log("Tab used for submission:", tabUsed);
    
    // Call the parent's onSubmit
    onSubmit(formData);
  };

  return (
    <Modal show={isOpen} onClose={onOpenChange} size={"xl"}>
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Schedule Meeting</CardTitle>
          <CardDescription>
            Enter meeting details using individual fields or paste meeting information directly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormComponent 
            closeModal={onOpenChange} 
            onSubmit={handleFormSubmit} 
            loading={loading} 
          />
        </CardContent>
      </Card>
    </Modal>
  );
}