"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "@/app/components/form";
import { Button } from "@/components/ui/button";
import Checkbox from "@/app/components/form/Checkbox/Checkbox";
import DatePicker from "@/app/components/form/DatePicker/DatePicker";
import Dropdown from "@/app/components/form/SelectInput/SelectInput";
import { candidateRecordData } from "./data/CandidateRecord";
import FootLogos from "../components/FootLogos";
import NumberInput from "@/app/components/form/NumberInput/NumberInput";

interface CandidateRecordFormProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  userRole?: string;
  isSubmitted?: boolean;
}

const formFields = candidateRecordData.formFields;

const formSchema = z.object(
  formFields.reduce((acc, field) => {
    acc[field.id] = field.validation;
    return acc;
  }, {})
);

export default function CandidateRecordForm({
  formData = {},
  setFormData,
  onPrevClick,
  onNextClick,
  userRole,
  isSubmitted,
}: CandidateRecordFormProps) {
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
    <div>
      <div>
        <div key={candidateRecordData.id}>
          <div>
            <h3 className="text-xl font-bold py-3">
              {candidateRecordData.title}
            </h3>
          </div>
        </div>
      </div>
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
            case "number":
              return (
                <Controller
                  key={`sectionField-${field.id}`}
                  name={field.id}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <NumberInput
                      id={field.id}
                      label={field.label}
                      disabled={!isEditable}
                      onChange={(e) => onChange(Number(e.target.value))}
                      value={value || ""}
                      error={errors[field.id]?.message as string}
                      placeholder={field.placeholder || "Enter a number"}
                      min={field.min || 0}
                      max={field.max || 10}
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
            case "select":
              return (
                <Controller
                  key={field.id}
                  name={field.id}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Dropdown
                      onChange={(e) => {
                        onChange(e);
                      }}
                      value={value || ""}
                      disabled={!isEditable}
                      label={field.label}
                      error={errors[field.id]?.message as string}
                      id={field.id}
                      options={field.options}
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
            <Button
              type="button"
              onClick={onPrevClick}
              disabled={userRole === "Admin"}
            >
              Back
            </Button>
          )}
          <Button type="submit" disabled={userRole === "Admin"}>
            Save and Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
