import React, { useEffect } from "react";
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

import FundingField from "@/app/admin/learners/components/FundingField";
import { Modal } from "flowbite-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  date_of_birth: z.string().refine((date) => {
    const parsedDate = new Date(date);
    const today = new Date();
    return (
      !isNaN(parsedDate.getTime()) && parsedDate.getTime() < today.getTime()
    );
  }, "Please enter a valid date in the past"),
  mobile_number: z.string().min(10, "Mobile number must be valid"),
  email: z.string().email("Invalid email address"),
  NI_number: z.string().min(1, "NI Number is required"),
  passport_number: z.string().min(1, "Passport Number is required"),
  home_address: z.string().min(1, "Home address is required"),
  funding: z.string().min(1, "Funding is required"),
  awarding: z.string().min(1, "Awarding is required"),
  chosen_course: z.string().min(1, "Chosen course is required"),
  // level: z.number().min(0, "Level must be 0 or greater"),
});

const LearnerEditForm = ({
  handlePatchLearner,
  onClose,
  show,
  patchLoading,
  learner = null,
  apiError,
  apiSuccess,
}) => {
  // Create form with default empty values
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
      // level: 0,
    },
  });

  // Update form values when learner data changes
  useEffect(() => {
    if (learner) {
      // Format date to YYYY-MM-DD for input[type="date"]
      let formattedDate = learner.date_of_birth;
      if (formattedDate && !formattedDate.includes("-")) {
        const date = new Date(formattedDate);
        if (!isNaN(date.getTime())) {
          formattedDate = date.toISOString().split("T")[0];
        }
      }

      form.reset({
        name: learner.name || "",
        date_of_birth: formattedDate || "",
        mobile_number: learner.mobile_number || "",
        email: learner.email || "",
        NI_number: learner.NI_number || "",
        passport_number: learner.passport_number || "",
        home_address: learner.home_address || "",
        funding: learner.funding || "",
        awarding: learner.awarding || "",
        chosen_course: learner.chosen_course || "",
        // level: typeof learner.level === "number" ? learner.level : 0,
      });
    }
  }, [learner, form]);

  const onSubmit = async (data) => {
    handlePatchLearner(learner.id, data);
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header className="bg-gold1 text-white text-center">
        <h3 className="text-center pl-4">Edit Learner</h3>
      </Modal.Header>
      <Modal.Body>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 px-4 pb-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name (First Name, Middle Name and Surname)
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter Email"
                        {...field}
                      />
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
                  <FormItem>
                    <FormLabel>Chosen Course</FormLabel>
                    <FormControl>
                      <Input placeholder="Input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
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
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FundingField form={form} />
            </div>

            {apiError && (
              <div className="text-red-500 text-sm text-center  py-2">
                {apiError.message || "An error occurred, Try again!!!"}
              </div>
            )}

            {apiSuccess && (
              <div className="text-green-500 text-sm text-center py-2">
                {apiSuccess.message || "Learner updated successfully!!!"}
              </div>
            )}

            <div className="flex justify-center my-2">
              <Button type="submit" className="w-96 bg-gold1">
                {patchLoading ? "Updating Learner..." : "Update Learner"}
              </Button>
            </div>
          </form>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LearnerEditForm;
