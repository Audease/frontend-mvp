import React from "react";
import { childProtection } from "./data/childProtection";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Checkbox from "@/app/components/form/Checkbox/Checkbox";
import { TextInput } from "@/app/components/form";
import DatePicker from "@/app/components/form/DatePicker/DatePicker";
import FootLogos from "../components/FootLogos";

interface ChildProtectionFormProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  userRole?: string;
  isSubmitted?: boolean;
}

type FormSchema = {
  [key: string]: z.ZodType;
};

const content = childProtection;
const formFields = childProtection.formFields;
const formFieldsB = childProtection.official.formFields;

const formSchema: z.ZodObject<FormSchema> = z.object({
  ...formFields.reduce((acc, field) => {
    acc[field.id] = field.validation;
    return acc;
  }, {}),
  ...formFieldsB.reduce((acc, field) => {
    acc[field.id] = field.validation;
    return acc;
  }, {}),
});

const ChildProtectionForm = ({
  formData = {},
  setFormData,
  onNextClick,
  onPrevClick,
  userRole,
  isSubmitted
}: ChildProtectionFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formFields.reduce((acc, field) => {
        acc[field.id] =
          formData[field.id] ||
          (field.type === "checkbox"
            ? false
            : field.type === "multiselect"
            ? []
            : "");
        return acc;
      }, {}),
      ...formFieldsB.reduce((acc, field) => {
        acc[field.id] =
          formData[field.id] ||
          (field.type === "checkbox"
            ? false
            : field.type === "multiselect"
            ? []
            : "");
        return acc;
      }, {}),
    },
  });

  const onSubmit = (data: any) => {
    setFormData(data);
    onNextClick && onNextClick();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
      <div>
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
                      disabled={!isEditable}
                      label={field.label}
                      value={value || ""}
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
                  key={`formField-${field.id}`}
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
      </div>

      <div>
        <h3 className="text-base font-bold py-2">{content.official.title}</h3>
      </div>

      <div>
        {formFieldsB.map((field, index) => {
           const isEditable =
           !isSubmitted && field.editableBy.includes(userRole);
          switch (field.type) {
            case "text":
              return (
                <Controller
                  key={`formField-${field.id || index}`}
                  name={field.id}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      id={field.id}
                      className="application-form-input"
                      placeholder={field.placeholder}
                      disabled={!isEditable}
                      label={field.label}
                      value={value || ""}
                      onChange={(e) => {
                        onChange(e);
                      }}
                      error={errors[field.id]?.message as string}
                    />
                  )}
                />
              );
            case "date":
              return (
                <Controller
                  key={`formField-${field.id || index}`}
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
      </div>

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
};

export default ChildProtectionForm;
