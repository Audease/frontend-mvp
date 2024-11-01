import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { applicationForm } from "../dummyForm";

type Props = {};

const FirstForm = (props: Props) => {
  // we should generate the college's form which is stored in the db (for now we will use dummy data)
  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "LastName must be at least 2 characters.",
    }),
    middleName: z.string().min(2, {
      message: "Middle name must be at least 2 characters.",
    }),
    gender: z.string().min(2, {
      message: "Middle name must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      {applicationForm.map((forms) => {
        return (
          <div key={forms.id}>
            <header className="text-center text-xl p-8 font-bold capitalize">
              {forms.name}
            </header>
            {forms.section.map((section) => {
              return (
                <div key={section.sid} className="flex flex-col space-6">
                  <div className="">
                    <h3 className="font-bold text-lg py-4">{section.title}</h3>
                    <p className="text-base">{section.description}</p>
                  </div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      {section.fields.map((formField) => {
                        return (
                          <React.Fragment key={formField.id}>
                            {(() => {
                              switch (formField.type) {
                                case "text":
                                  return (
                                    <FormField
                                      control={form.control}
                                      name={formField.name}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>
                                            {formField.label}
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder={
                                                formField.placeholder
                                              }
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormDescription>
                                            {formField.description}
                                          </FormDescription>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  );

                                case "select":
                                  return (
                                    <FormField
                                      control={form.control}
                                      name={formField.name}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>
                                            {formField.label}
                                          </FormLabel>
                                          <FormControl>
                                            <Select>
                                              <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Theme" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="light">
                                                  Light
                                                </SelectItem>
                                                <SelectItem value="dark">
                                                  Dark
                                                </SelectItem>
                                                <SelectItem value="system">
                                                  System
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </FormControl>
                                          <FormDescription>
                                            {formField.description}
                                          </FormDescription>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  );

                                default:
                                  return null;
                              }
                            })()}
                          </React.Fragment>
                        );
                      })}
                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default FirstForm;
