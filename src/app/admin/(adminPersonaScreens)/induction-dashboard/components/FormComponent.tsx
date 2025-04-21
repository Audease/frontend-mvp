import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";

const formSchema = z.object({
  meetingId: z.string().optional(),
  meetingUrl: z.string().url("Please enter a valid URL").optional(),
  password: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  meetingInfo: z.string().optional(),
}).refine(data => {
  // If using manual fields, require meetingUrl, startTime, endTime
  if (!data.meetingInfo || data.meetingInfo.trim() === '') {
    return !!data.meetingUrl && !!data.startTime && !!data.endTime;
  }
  // If using one-click paste, require non-empty meetingInfo
  return data.meetingInfo.trim() !== '';
}, {
  message: "Either provide meeting URL, start time, and end time OR paste meeting information",
  path: ['meetingInfo'],
});

const FormComponent = ({ closeModal, onSubmit, loading }) => {
  const [activeTab, setActiveTab] = useState("manual");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meetingId: "",
      meetingUrl: "",
      password: "",
      startTime: "",
      endTime: "",
      meetingInfo: "",
    },
  });

  const handleSubmit = (values) => {
    // Format the data based on which tab is active
    const formattedData = activeTab === "manual" 
      ? {
          meetingId: values.meetingId,
          meetingUrl: values.meetingUrl,
          password: values.password,
          startTime: values.startTime,
          endTime: values.endTime,
        }
      : {
          meetingInfo: values.meetingInfo
        };
    
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Tabs 
          defaultValue="manual" 
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="manual">Manual Fields</TabsTrigger>
            <TabsTrigger value="paste">One-Click Paste</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="meetingUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting URL <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="https://zoom.us/j/123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meetingId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting ID</FormLabel>
                    <FormControl>
                      <Input placeholder="123 456 789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="paste">
            <FormField
              control={form.control}
              name="meetingInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Information <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={
`Join Zoom Meeting
https://zoom.us/j/123456789
Meeting ID: 123 456 789
Password: 123456
Time: May 1, 2024 2:00 PM - 3:00 PM`
                      }
                      className="min-h-[200px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Paste the entire meeting invitation here. The system will automatically extract the meeting URL, ID, password, and times.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <AlertDialogFooter className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" className="bg-dashboardButtons hover:bg-tgrey1">
            {loading ? "Sending Invites..." : "Schedule Meeting"}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default FormComponent;