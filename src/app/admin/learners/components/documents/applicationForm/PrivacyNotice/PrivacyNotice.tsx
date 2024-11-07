"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { applicationForm } from "../../dummyForm";
import { TextInput } from "@/app/components/form";
import { Button } from "@/components/ui/button";
import { Text } from "@react-pdf/renderer";
import Checkbox from "@/app/components/form/Checkbox/Checkbox";


interface PrivacyNoticeProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const content = applicationForm[0].privacyNotice;
const description = applicationForm[0].privacyNotice.description;
const formFields = applicationForm[0].enrollmentForm.fields;
const sectionFields = applicationForm[0].privacyNotice.section;

const formSchema = z.object(
  formFields.reduce((acc, field) => {
    acc[field.id] = field.validation;
    return acc;
  }, {})
);

export default function PrivacyNotice({
  formData,
  setFormData,
  onPrevClick,
  onNextClick,
}: PrivacyNoticeProps) {
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
      <div className="text-xl flex flex-col">
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {content.title}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {content.subtitle}
        </Text>
        <div className="flex flex-col">
          {description.map((paragraph) => (
            <Text style={{ fontSize: 12 }} key={paragraph.id}>
              {paragraph.paragraph}
            </Text>
          ))}
        </div>
      </div>
      <div></div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
        {sectionFields.map((field) => (
          <div key={field.title}>
            <div className="flex flex-col">
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {field.title}
              </Text>
              <Text style={{ fontSize: 12 }}>{field.p}</Text>
            </div>
            {field.fields.map((innerField) => {
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

        <div className="flex flex-row space-x-5 my-8">
          {onPrevClick && (
            <Button type="button" onClick={onPrevClick}>
              Back
            </Button>
          )}
          <Button type="submit">Save and Continue</Button>
        </div>
      </form>
    </div>
  );
}
