"use client";

import React from "react";
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
          <FormComponent closeModal={onOpenChange} onSubmit={onSubmit} loading={loading} />
        </CardContent>
      </Card>
    </Modal>
  );
}