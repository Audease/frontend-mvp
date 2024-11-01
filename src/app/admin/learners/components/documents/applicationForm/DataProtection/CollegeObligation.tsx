"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { applicationForm } from "../../dummyForm";
import { TextInput } from "@/app/components/form";
import { Button } from "@/components/ui/button";
import Checkbox from "@/app/components/form/Checkbox/Checkbox";
import { StyleSheet, Text } from "@react-pdf/renderer";

interface CollegeObligationProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const styles = StyleSheet.create({
  page: { marginBottom: 10, textTransform: "capitalize" },
  section: { textAlign: "center", margin: 30 },
});

const dataprotection = applicationForm[0].dataProtection;
const formFields = applicationForm[0].dataProtection.consentConfirmation;
const formContent1 = applicationForm[0].dataProtection.section1.sections;
const formContent2 = applicationForm[0].dataProtection.section2.paragraphs;
const formContent3 = applicationForm[0].dataProtection.section3;
const formContent4 = applicationForm[0].dataProtection.section4;


const formSchema = z.object(
  formFields.reduce((acc, field) => {
    acc[field.id] = field.validation;
    return acc;
  }, {})
);

export default function CollegeObligation({
  formData,
  setFormData,
  onPrevClick,
  onNextClick,
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
          <div key={section.id} style={styles.page}>
            <div className="text-xl">
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {section.title}
              </Text>
            </div>
            <div className="text-lg">
              <Text style={{ fontSize: 12, marginLeft: 10 }}>
                {section.content}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="text-xl">
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {dataprotection.section2.title}
          </Text>
        </div>
        {formContent2.map((section) => (
          <div key={section.id} style={styles.page}>
            <div className="text-xl">
              <Text style={{ fontSize: 12, marginLeft: 10 }}>
                {section.text}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="text-xl">
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {dataprotection.section3.title}
          </Text>
        </div>
        {formContent3.paragraph.map((section) => (
          <div key={section.id} style={styles.page}>
            <div className="text-xl">
              <Text style={{ fontSize: 12, marginLeft: 10 }}>
                {section.p}
              </Text>
            </div>
          </div>
        ))}
         {formContent3.list.map((section) => (
          <div key={section.id} style={styles.page}>
            <li className="text-xl">
              <Text style={{ fontSize: 12 }}>
                {section.text}
              </Text>
            </li>
          </div>
        ))}
      </div>
      {/* Section 4 */}
      <div>
        <div className="text-xl">
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {dataprotection.section4.title}
          </Text>
        </div>
        {formContent4.content.map((section) => (
          <div key={section.id} style={styles.page}>
            <div className="text-xl flex flex-col">
              <Text style={{ fontSize: 12, marginLeft: 10, fontWeight: "bold" }}>
                {section.title}
              </Text>
              <Text style={{ fontSize: 12, marginLeft: 10,  }}>
                {section.text}
              </Text>
              <Text style={{ fontSize: 12, marginLeft: 10 }}>
                {section.data}
              </Text>
              <Text style={{ fontSize: 12, marginLeft: 10 }}>
                {section.mainP}
              </Text>
              <Text style={{ fontSize: 12, marginLeft: 10 }}>
                {section.mainSnD}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
        {formFields.map((field) => {
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
