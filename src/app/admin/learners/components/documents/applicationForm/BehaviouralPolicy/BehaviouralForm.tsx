"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "@/app/components/form";
import { Button } from "@/components/ui/button";
import Checkbox from "@/app/components/form/Checkbox/Checkbox";
import { behaviouralData } from "./data/Behavioural";
import FootLogos from "../components/FootLogos";

interface BehaviouralFormProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const formFields = behaviouralData.formFields;

const formSchema = z.object(
  formFields.reduce((acc, field) => {
    acc[field.id] = field.validation;
    return acc;
  }, {})
);

export default function BehaviouralForm({
  formData,
  setFormData,
  onPrevClick,
  onNextClick,
}: BehaviouralFormProps) {
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
      <div>
        <FootLogos />
      </div>
      <div className="flex flex-row space-x-5 my-8">
        {onPrevClick && (
          <Button type="button" onClick={onPrevClick}>
            Back
          </Button>
        )}
        <Button type="submit">Save and Continue</Button>
      </div>
    </form>
  );
}
