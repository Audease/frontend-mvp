"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "@/app/components/form";
import { Button } from "@/components/ui/button";
import Checkbox from "@/app/components/form/Checkbox/Checkbox";
import DatePicker from "@/app/components/form/DatePicker/DatePicker";
import { confidentialityData } from "./data/Confidentiality";
import FootLogos from "../components/FootLogos";

interface ConfidentialityFormProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  userRole?: string;
  isSubmitted?: boolean;
}

const formFields = confidentialityData.formFields;

const formSchema = z.object(
  formFields.reduce((acc, field) => {
    acc[field.id] = field.validation;
    return acc;
  }, {})
);

export default function ConfidentialityForm({
  formData = {},
  setFormData,
  onPrevClick,
  onNextClick,
  userRole,
  isSubmitted
}: ConfidentialityFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formFields.reduce((acc, field) => {
        acc[field.id] = field.type === "checkbox" ? false : "";
        return acc;
      }, {}),
      ...formData,
    },
  });

  const onSubmit = (data: any) => {
    setFormData(data);
    // console.log(data)
    onNextClick && onNextClick();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
      {formFields.map((field) => {
         let isEditable: boolean;

         if (isSubmitted) {
           if (userRole === "learner") {
             isEditable = false;
           } else if (userRole === "accessor") {
             isEditable = field.editableBy.includes("accessor");
           }
         } else {
           if (userRole === "learner") {
             isEditable = field.editableBy.includes("learner");
           } else if (userRole === "accessor") {
             isEditable = false;
           }
         }
        switch (field.type) {
          case "text":
            return (
              <Controller
                key={field.id}
                name={field.id}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    id={field.id}
                    className="application-form-input"
                    placeholder={field.placeholder}
                    label={field.label}
                    value={value || ""}
                    disabled={!isEditable}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    error={errors[field.id]?.message as string}
                  />
                )}
              />
            );
          case "checkbox":
            return (
              <Controller
                key={field.id}
                name={field.id}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    onChange={(e) => {
                      onChange(e);
                    }}
                    value={value || ""}
                    disabled={!isEditable}
                    label={field.label}
                    error={errors[field.id]?.message as string}
                  />
                )}
              />
            );
          case "date":
            return (
              <Controller
                key={field.id}
                name={field.id}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    onChange={(e) => {
                      onChange(e);
                    }}
                    value={value || ""}
                    disabled={!isEditable}
                    label={field.label}
                    error={errors[field.id]?.message as string}
                    id={field.id}
                  />
                )}
              />
            );
          default:
            return null;
        }
      })}
      <div>
        <FootLogos />
      </div>
      <div className="flex flex-row space-x-5 my-8">
        {onPrevClick && (
          <Button type="button" onClick={onPrevClick} disabled={userRole === "Admin"}>
            Back
          </Button>
        )}
        <Button type="submit" disabled={userRole === "Admin"}>Save and Continue</Button>
      </div>
    </form>
  );
}
