import { TextInput } from '@/app/components/form';
import Checkbox from '@/app/components/form/Checkbox/Checkbox';
import DatePicker from '@/app/components/form/DatePicker/DatePicker';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { applicationForm } from '../../dummyForm';
import { z } from 'zod';

type ExtremismPolicyProps = {
    formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const content = applicationForm[0].extremisimPolicy;
const formFieldsA  = applicationForm[0].extremisimPolicy.formFields;
const formFieldsB  = applicationForm[0].extremisimPolicy.official.formFields;

const formSchema = z.object({
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
    formData,
    setFormData,
  }) => {

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
      } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          ...formData,
          ...formFieldsA.reduce((acc, field) => {
            acc[field.id] = field.type === "checkbox" ? false : "";
            return acc;
          }, {}),
          ...formFieldsB.reduce((acc, field) => {
            acc[field.id] = field.type === "checkbox" ? false : "";
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
            <h3>{content.official.title}</h3>
          </div>
          <div>
            {formFieldsB.map((field, index) => {
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
  )
}

export default ExtremismPolicyForm