"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "@/app/components/form";
import { Button } from "@/components/ui/button";
import Checkbox from "@/app/components/form/Checkbox/Checkbox";
import { dataProtectionData } from "./data/DataProtection";
import FootLogos from "../components/FootLogos";

interface CollegeObligationProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  userRole?: string;
  isSubmitted?: boolean;
}

const formFields = dataProtectionData.consentConfirmation;
const formContent1 = dataProtectionData.section1.sections;
const formContent2 = dataProtectionData.section2.paragraphs;
const formContent3 = dataProtectionData.section3;
const formContent4 = dataProtectionData.section4;

const formSchema = z.object(
  formFields.reduce((acc, field) => {
    acc[field.id] = field.validation;
    return acc;
  }, {})
);

export default function CollegeObligation({
  formData = {},
  setFormData,
  onPrevClick,
  onNextClick,
  userRole,
  isSubmitted
}: CollegeObligationProps) {
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
    onNextClick && onNextClick();
  };

  return (
    <div>
      <div>
        {formContent1.map((section) => (
          <div key={section.id} className="text-base">
            <h3 className="font-bold py-3">{section.title}</h3>
            <p className="text-justify">{section.content}</p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-base font-bold ">
          {dataProtectionData.section2.title}
        </h3>

        {formContent2.map((section) => (
          <div key={section.id}>
            <h3 className="text-base text-justify">{section.text}</h3>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-xl font-bold py-3">
          {dataProtectionData.section3.title}
        </h3>

        {formContent3.paragraph.map((section) => (
          <div key={section.id}>
            <p className="text-base text-justify">{section.p}</p>
          </div>
        ))}
        {formContent3.list.map((section) => (
          <div key={section.id}>
            <li className="text-base text-justify py-3">{section.text}</li>
          </div>
        ))}
      </div>
      {/* Section 4 */}
      <div>
        <h3 className="text-xl font-bold py-3">
          {dataProtectionData.section4.title}
        </h3>

        {formContent4.content.map((section) => (
          <div key={section.id}>
            <div className="text-base text-justify flex flex-col">
              <h3 className="text-base font-bold py-3">{section.title}</h3>
              <p>{section.text}</p>
              <p>{section.data}</p>
              <p>{section.mainP}</p>
              <p>{section.mainSnD}</p>
            </div>
          </div>
        ))}
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
    </div>
  );
}
