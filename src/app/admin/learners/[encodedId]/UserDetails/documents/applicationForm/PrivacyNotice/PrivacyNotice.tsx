"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "@/app/components/form";
import { Button } from "@/components/ui/button";
import Checkbox from "@/app/components/form/Checkbox/Checkbox";
import { privacyNotice } from "./data/PrivacyNotice";
import FootLogos from "../components/FootLogos";

interface PrivacyNoticeProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  isSubmitted?: boolean;
  userRole?: string;
}

type FormSchema = {
  [key: string]: z.ZodType;
};

const content = privacyNotice;
const description = content.description;
const formFields = content.section;


const formSchema: z.ZodObject<FormSchema> = z.object(
  formFields.reduce((acc, section) => {
    section.fields.forEach((field) => {
      acc[field.id] = field.validation;
    });
    return acc;
  }, {}),
);

export default function PrivacyNotice({
  formData = {},
  setFormData,
  onPrevClick,
  onNextClick,
  isSubmitted,
  userRole,
}: PrivacyNoticeProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formFields.reduce((acc, section) => {
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
      <div className="text-xl flex flex-col">
        <h3 className="text-xl font-bold py-3">{content.title}</h3>
        <p className="text-base text-justify">{content.subtitle}</p>
        <div className="flex flex-col">
          {description.map((paragraph) => (
            <p className="text-base text-justify" key={paragraph.id}>
              {paragraph.paragraph}
            </p>
          ))}
        </div>
      </div>
      <div></div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
        {formFields.map((field) => (
          <div key={field.title}>
            <div className="flex flex-col">
              <h3 className="text-base font-bold text-justify">
                {field.title}
              </h3>
              <p className="text-base text-justify">{field.p}</p>
            </div>
            {field.fields.map((innerField) => {
              const isEditable =
                !isSubmitted && innerField.editableBy.includes(userRole);
              switch (innerField.type) {
                case "text":
                  return (
                    <Controller
                      key={innerField.id}
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
                      key={innerField.id}
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
