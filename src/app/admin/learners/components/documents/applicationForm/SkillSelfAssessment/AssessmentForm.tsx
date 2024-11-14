import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ChildProtectionFormProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const formSchema = z.object({});

const SkillsAssessmentForm = ({
  formData,
  setFormData,
  onNextClick,
  onPrevClick,
}: ChildProtectionFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formData,
    },
  });

  const onSubmit = (data: any) => {
    setFormData(data);
    onNextClick && onNextClick();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 my-4">
      <div className="flex flex-row space-x-5 my-8">
        {onPrevClick && (
          <Button type="button" onClick={onPrevClick}>
            Back
          </Button>
        )}
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default SkillsAssessmentForm;
