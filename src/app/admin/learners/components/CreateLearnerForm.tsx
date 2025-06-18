import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { usePostLearners } from "../hooks/usePostLearners";
import { learnerRevalidation } from "@/app/action";
import FundingField from "./FundingField";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  date_of_birth: z
    .string()
    .optional()
    .refine((date) => {
      if (!date) return true;
      const parsedDate = new Date(date);
      const today = new Date();
      return (
        !isNaN(parsedDate.getTime()) && parsedDate.getTime() < today.getTime()
      );
    }, "Please enter a valid date in the past"),
  mobile_number: z.string().min(10, "Mobile number must be valid"),
  email: z.string().email("Invalid email address"),
  NI_number: z.string().optional(),
  passport_number: z.string().optional(),
  home_address: z.string().optional(),
  funding: z.string().optional(),
  awarding: z.string().optional(),
  chosen_course: z.string().optional(),
  level: z.number().optional(),
});

const RegistrationForm = ({
  onLearnerCreated,
  onClose,
  setLearnerSuccessModal,
}) => {
  const { createLearner, error: apiError } = usePostLearners();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date_of_birth: "",
      mobile_number: "",
      email: "",
      NI_number: "",
      passport_number: "",
      home_address: "",
      funding: "",
      awarding: "",
      chosen_course: "",
      level: 1,
    },
  });

  const onSubmit = async (data) => {
    const submittableData = {
      name: data.name,
      date_of_birth: data.date_of_birth || "1990-01-01",
      mobile_number: data.mobile_number,
      email: data.email,
      NI_number: data.NI_number || "00000000",
      passport_number: data.passport_number || "00000000",
      home_address: data.home_address || "N/A",
      funding: data.funding || "N/A",
      awarding: data.awarding || "N/A",
      chosen_course: data.chosen_course || "N/A",
      level: data.level || 1,
    };
    setLoading(true);
    try {
      const success = await createLearner(submittableData);
      if (success) {
        onClose();
        onLearnerCreated();
        learnerRevalidation();
        setLearnerSuccessModal(true);
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 px-4 pb-4"
      >
        <div className="grid grid-cols-2 gap-y-2 gap-x-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name (First Name, Middle Name and Surname)*
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="NI_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NI Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter NI Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passport_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passport Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Passport Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="home_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Home address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="awarding"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Awarding</FormLabel>
                <FormControl>
                  <Input placeholder="Input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chosen_course"
            render={({ field }) => (
              // <FormItem>
              //   <FormLabel>Chosen course</FormLabel>
              //   <Select
              //     onValueChange={field.onChange}
              //     defaultValue={field.value}
              //   >
              //     <FormControl>
              //       <SelectTrigger>
              //         <SelectValue placeholder="Select a course" />
              //       </SelectTrigger>
              //     </FormControl>
              //     <SelectContent>
              //       <SelectItem value="AdultCare">Adult Care</SelectItem>
              //       <SelectItem value="YouthPlus">Youth Plus</SelectItem>
              //       <SelectItem value="ChildrenCare">Children Care</SelectItem>
              //     </SelectContent>
              //   </Select>
              //   <FormMessage />
              // </FormItem>
              <FormItem>
                <FormLabel>Chosen Course</FormLabel>
                <FormControl>
                  <Input placeholder="Input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Input"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FundingField form={form} />
        </div>

        {apiError && (
          <div className="text-red-500 text-sm mt-2">
            {apiError.message || "An error occurred"}
          </div>
        )}

        <div className="flex justify-center">
          <Button type="submit" className="w-96 bg-gold1">
            {loading ? "Creating Learner ..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
