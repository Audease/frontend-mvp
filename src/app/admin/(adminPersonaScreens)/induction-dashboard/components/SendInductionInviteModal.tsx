"use client";

import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { z } from "zod";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  meetingId: z.string().min(1, "Meeting ID is required"),
  meetingUrl: z.string().url("Invalid URL").min(1, "Meeting URL is required"),
  password: z.string().min(1, "Password is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

export function MeetingFormDialog({isOpen, onOpenChange}) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meetingId: "",
      meetingUrl: "",
      password: "",
      startTime: "",
      endTime: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog  open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}></form>
          <FormField
            control={form.control}
            name="meetingId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting ID</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <AlertDialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={onOpenChange}
            >
              Cancel
            </Button>
            <Button type="submit">Schedule Meeting</Button>
          </AlertDialogFooter>
        </Form> */}
      </DialogContent>
    </Dialog>
  );
}

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Clear error when user starts typing
//     if (formErrors[name]) {
//       setFormErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };
