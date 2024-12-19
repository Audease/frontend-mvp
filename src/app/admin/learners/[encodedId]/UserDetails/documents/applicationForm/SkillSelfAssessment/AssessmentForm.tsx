import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { skillsAssesment } from "./data/skillsAssessment";
import { TextInput } from "@/app/components/form";
import FootLogos from "../components/FootLogos";

interface ChildProtectionFormProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  userRole?: string;
  isSubmitted?: boolean;
}

interface Variable {
  id: string;
  name: string;
}

type FormValues = Record<string, number>;

const content = skillsAssesment;
const sections = skillsAssesment.sections;
const formFields = content.summary.formFields;

const formSchema = z.object({
  ...Object.fromEntries([
    ...sections.flatMap((section) =>
      section.variables.map((variable) => [
        variable.id,
        z.number().min(1, "Rating is required").max(5),
      ])
    ),

    ...formFields.map((field) => [field.id, field.validation]),
  ]),
});

type FormSchema = z.infer<typeof formSchema>;

const SkillsAssessmentForm = ({
  formData = {},
  setFormData,
  onNextClick,
  onPrevClick,
  userRole,
  isSubmitted,
}: ChildProtectionFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formData,
      ...Object.fromEntries(
        sections.flatMap((section) =>
          section.variables.map((v) => [v.id, formData?.[v.id] ?? 5])
        )
      ),
    },
    ...formFields.reduce((acc, field) => {
      acc[field.id] = field.type === "checkbox" ? false : "";
      return acc;
    }, {}),
  });

  const allValues = watch();

  const calculateSectionScore = (sectionVariables: Variable[]) => {
    const sectionTotal = sectionVariables.reduce((sum, variable) => {
      const value = allValues[variable.id] ?? 0;
      return sum + value;
    }, 0);
    const sectionMax = sectionVariables.length * 5;
    return { total: sectionTotal, max: sectionMax };
  };

  const totalScore = sections.reduce((sum, section) => {
    const { total } = calculateSectionScore(section.variables);
    return sum + total;
  }, 0);

  const maxPossibleScore = sections.reduce(
    (sum, section) => sum + section.variables.length * 5,
    0
  );

  const onSubmit = (data: FormSchema) => {
    setFormData && setFormData(data);
    onNextClick && onNextClick();
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 my-4">
      {sections.map((section, index) => (
        
        <Card key={section.title} className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {section.variables.map((variable) => (
              
              <div key={variable.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{variable.name}</span>
                  <span className="text-sm text-gray-500">
                    {allValues[variable.id]}/5
                  </span>
                </div>
                <Controller
                  name={variable.id}
                  control={control}
                  render={({ field }) => (
                    <Slider
                      value={[field.value]}
                      min={0}
                      max={5}
                      step={1}
                      className="w-full"
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  )}
                />
                {errors[variable.id] && (
                  <span className="red">
                    {errors[variable.id]?.message as string}
                  </span>
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between items-center bg-gray-50 rounded-b-lg">
            <div className="text-sm font-medium">Section Score:</div>
            <div className="text-base font-semibold">
              {(() => {
                const { total, max } = calculateSectionScore(section.variables);
                return (
                  <>
                    {total}/{max}
                    <span className="text-sm text-gray-500 ml-2">
                      ({((total / max) * 100).toFixed(1)}%)
                    </span>
                  </>
                );
              })()}
            </div>
          </CardFooter>
        </Card>
      ))}

      <Card className="w-full max-w-2xl bg-gray-50">
        <CardContent className="py-4">
          <div className="flex justify-between items-center">
            <div className="text-base font-semibold">Overall Score:</div>
            <div className="text-base font-bold">
              {totalScore}/{maxPossibleScore}
              <span className="text-sm text-gray-500 ml-2">
                ({((totalScore / maxPossibleScore) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <p className="text-base text-justification">{content.summary.p}</p>
        {formFields.map((field) => {
          const isEditable =
            !isSubmitted && field.editableBy.includes(userRole);
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
        <Button type="submit" disabled={userRole === "Admin"}>Save</Button>
      </div>
    </form>
  );
};

export default SkillsAssessmentForm;
