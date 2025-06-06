"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "@/app/components/form";
import { Button } from "@/components/ui/button";
import Checkbox from "@/app/components/form/Checkbox/Checkbox";
import DatePicker from "@/app/components/form/DatePicker/DatePicker";
import NumberInput from "@/app/components/form/NumberInput/NumberInput";
import RadioInput from "@/app/components/form/RadioInput/RadioInput";
import TelInput from "@/app/components/form/TelInput/TelInput";
import EmailInput from "@/app/components/form/EmailInput/EmailInput";
import { enrolmentData } from "./data/Enrollment";
import FootLogos from "../components/FootLogos";
import MultiSelectInput from "@/app/components/form/MultiSelect/MultiSelect";

interface EnrolmentFormProps {
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

const formFields = enrolmentData.fields;
const sectionFields = enrolmentData.section;

const formSchema: z.ZodObject<FormSchema> = z.object({
  ...formFields.reduce((acc, field) => {
    acc[field.id] = field.validation;
    return acc;
  }, {}),
  ...sectionFields.reduce((acc, section) => {
    section.fields.forEach((field) => {
      acc[field.id] = field.validation;
    });
    return acc;
  }, {}),
});

export default function EnrolmentForm({
  formData = {},
  setFormData,
  onPrevClick,
  onNextClick,
  userRole,
  isSubmitted
}: EnrolmentFormProps) {
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
          (field.type === "checkbox" ? false : 
           field.type === "multiselect" ? [] : "");
        return acc;
      }, {}),
      ...sectionFields.reduce((acc, section) => {
        section.fields.forEach((field) => {
          acc[field.id] = 
            formData[field.id] || 
            (field.type === "checkbox" ? false : 
             field.type === "multiselect" ? [] : "");
        });
        return acc;
      }, {}),
    },
  });

  const onSubmit = (data: any) => {
    setFormData(data);
    // console.log(data)
    onNextClick && onNextClick();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
        {formFields.map((field, index) => {
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
            default:
              return null;
          }
        })}
        {sectionFields.map((field, sectionIndex) => (
          <div key={`section-${field.title || sectionIndex}`}>
            <div className="flex flex-col">
              <h3 className="text-base font-bold py-2">{field.title}</h3>
              <p className="text-base">{field.p}</p>
            </div>
            {field.fields.map((innerField, index) => {
              const isEditable =
              !isSubmitted && innerField.editableBy.includes(userRole);
              switch (innerField.type) {
                case "text":
                  return (
                    <Controller
                      key={`sectionField-${
                        innerField.id || `${sectionIndex}-${index}`
                      }`}
                      name={innerField.id}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          id={innerField.id}
                          className="application-form-input"
                          placeholder={innerField.placeholder}
                          disabled={!isEditable}
                          label={innerField.label}
                          value={value || ""}
                          onChange={(e) => {
                            onChange(e);
                          }}
                          error={errors[innerField.id]?.message as string}
                        />
                      )}
                    />
                  );
                case "checkbox":
                  return (
                    <Controller
                      key={`sectionField-${
                        innerField.id || `${sectionIndex}-${index}`
                      }`}
                      name={innerField.id}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox
                          onChange={(e) => {
                            onChange(e);
                          }}
                          value={value || ""}
                          disabled={!isEditable}
                          label={innerField.label}
                          error={errors[innerField.id]?.message as string}
                        />
                      )}
                    />
                  );
                case "date":
                  return (
                    <Controller
                      key={`sectionField-${
                        innerField.id || `${sectionIndex}-${index}`
                      }`}
                      name={innerField.id}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          onChange={(e) => {
                            onChange(e);
                          }}
                          value={value || ""}
                          disabled={!isEditable}
                          label={innerField.label}
                          error={errors[innerField.id]?.message as string}
                          id={innerField.id}
                        />
                      )}
                    />
                  );
                case "number":
                  return (
                    <Controller
                      key={`sectionField-${
                        innerField.id || `${sectionIndex}-${index}`
                      }`}
                      name={innerField.id}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <NumberInput
                          id={innerField.id}
                          label={innerField.label}
                          disabled={!isEditable}
                          onChange={(e) => onChange(Number(e.target.value))}
                          value={value || ""}
                          error={errors[innerField.id]?.message as string}
                          placeholder={
                            innerField.placeholder || "Enter a number"
                          }
                          min={innerField.min || 0}
                          max={innerField.max || 100}
                        />
                      )}
                    />
                  );
                case "radio":
                  return (
                    <Controller
                      key={`sectionField-${
                        innerField.id || `${sectionIndex}-${index}`
                      }`}
                      name={innerField.id}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <RadioInput
                          id={innerField.id}
                          disabled={!isEditable}
                          label={innerField.label}
                          options={innerField.options}
                          onChange={(e) => onChange(e.target.value)}
                          value={value || ""}
                          error={errors[innerField.id]?.message as string}
                        />
                      )}
                    />
                  );
                case "tel":
                  return (
                    <Controller
                      key={`sectionField-${
                        innerField.id || `${sectionIndex}-${index}`
                      }`}
                      name={innerField.id}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TelInput
                          id={innerField.id}
                          disabled={!isEditable}
                          label={innerField.label}
                          onChange={onChange}
                          value={value || ""}
                          error={errors[innerField.id]?.message as string}
                          placeholder="Enter phone number"
                        />
                      )}
                    />
                  );
                case "email":
                  return (
                    <Controller
                      key={`sectionField-${
                        innerField.id || `${sectionIndex}-${index}`
                      }`}
                      name={innerField.id}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <EmailInput
                          id={innerField.id}
                          disabled={!isEditable}
                          label={innerField.label}
                          onChange={onChange}
                          value={value || ""}
                          error={errors[innerField.id]?.message as string}
                          placeholder="Enter email"
                        />
                      )}
                    />
                  );
                  case "multiselect":
                    return (
                      <Controller
                        key={`formField-${field.id || index}`}
                        name={innerField.id}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <MultiSelectInput
                            id={innerField.id}
                            className="application-form-input"
                            disabled={!isEditable}
                            label={innerField.label}
                            options={innerField.options}
                            onChange={(selectedValues) => {
                              onChange(selectedValues);
                            }}
                            value={value || []} 
                            error={errors[innerField.id]?.message as string}
                          />
                        )}
                      />
                    );
                default:
                  return null;
              }
            })}
          </div>
        ))}

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
}
