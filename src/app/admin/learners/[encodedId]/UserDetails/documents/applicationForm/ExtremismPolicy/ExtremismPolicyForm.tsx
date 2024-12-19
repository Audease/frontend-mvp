import { TextInput } from "@/app/components/form";
import Checkbox from "@/app/components/form/Checkbox/Checkbox";
import DatePicker from "@/app/components/form/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { extremismPolicyData } from "./data/ExtremismPolicy";
import FootLogos from "../components/FootLogos";

type ExtremismPolicyProps = {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  userRole?: string;
  isSubmitted?: boolean;
};

type FormSchema = {
  [key: string]: z.ZodType;
};

const content = extremismPolicyData;
const formFieldsA = content.formFields;
const formFieldsB = content.official.formFields;

const formSchema: z.ZodObject<FormSchema> = z.object({
  ...formFieldsA.reduce((acc, field) => {
    acc[field.id] = field.validation;
    return acc;
  }, {}),
  ...formFieldsB.reduce((acc, field) => {
    acc[field.id] = field.validation;
    return acc;
  }, {}),
});

const ExtremismPolicyForm: React.FC<ExtremismPolicyProps> = ({
  onNextClick,
  onPrevClick,
  formData = {},
  setFormData,
  userRole,
  isSubmitted,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formFieldsA.reduce((acc, field) => {
        acc[field.id] = formData[field.id] ||
          (field.type === "checkbox"
            ? false
            : field.type === "multiselect"
            ? []
            : "");
        return acc;
      }, {}),
      ...formFieldsB.reduce((acc, field) => {
        acc[field.id] = formData[field.id] ||
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
        <div>
          {formFieldsA.map((field, index) => {
            const isEditable =
              !isSubmitted && field.editableBy.includes(userRole);
            switch (field.type) {
              case "checkbox":
                return (
                  <Controller
                    key={`formField-${field.id || index}`}
                    name={field.id}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        onChange={(e) => {
                          onChange(e);
                        }}
                        disabled={!isEditable}
                        value={value || ""}
                        label={field.label}
                        error={errors[field.id]?.message as string}
                      />
                    )}
                  />
                );
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
          <h3 className="text-base font-bold text-justify py-2">
            {content.official.title}
          </h3>
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
    </div>
  );
};

export default ExtremismPolicyForm;
