import React, { useState, useEffect } from "react";
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

const formSchema = z
  .object({
    meetingId: z.string().optional(),
    meetingUrl: z.string().optional(), // Remove the URL validation for now
    password: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    meetingInfo: z.string().optional(),
  })
  .refine(
    (data) => {
      // Check which tab is active based on presence of meetingInfo
      const isUsingPasteTab =
        data.meetingInfo && data.meetingInfo.trim() !== "";

      if (isUsingPasteTab) {
        // For paste tab, only validate meetingInfo exists
        return true;
      } else {
        // For manual tab, require meetingUrl, startTime, endTime
        return !!data.meetingUrl && !!data.startTime && !!data.endTime;
      }
    },
    {
      message:
        "Required fields are missing. When using manual entry, please provide meeting URL, start time, and end time.",
    }
  );

// Helper function to extract meeting details from the pasted text
const extractMeetingDetails = (pastedText) => {
  const result = {
    meetingUrl: "",
    meetingId: "",
    password: "",
    startTime: "",
    endTime: "",
  };

  // Extract URL
  const urlMatch = pastedText.match(/(https?:\/\/[^\s]+)/);
  if (urlMatch) result.meetingUrl = urlMatch[0];

  // Extract Meeting ID
  const idMatch = pastedText.match(/Meeting ID:?\s*([0-9\s]+)/i);
  if (idMatch) result.meetingId = idMatch[1].replace(/\s+/g, "");

  // Extract Password
  const pwdMatch = pastedText.match(/Password:?\s*([0-9a-zA-Z]+)/i);
  if (pwdMatch) result.password = pwdMatch[1];

  // Extract Time (this is a simplified approach, would need refinement)
  const timeMatch = pastedText.match(/Time:?\s*([^\n]+)/i);
  if (timeMatch) {
    const timeInfo = timeMatch[1];
    // This is a simple approach - for production you would need more robust parsing
    if (timeInfo.includes("-")) {
      const [start, end] = timeInfo.split("-").map((t) => t.trim());
      // This is just a placeholder - in reality you'd convert these to proper datetime formats
      result.startTime = start;
      result.endTime = end;
    }
  }

  return result;
};

const FormComponent = ({ closeModal, onSubmit, loading }) => {
  const [activeTab, setActiveTab] = useState("manual");
  const [debugMessage, setDebugMessage] = useState("");

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

  // Handle extracting meeting details from pasted text
  const handlePastedInfoChange = (value) => {
    if (value && value.trim() !== "") {
      const extractedDetails = extractMeetingDetails(value);

      // Update the form values for both tabs
      Object.entries(extractedDetails).forEach(([field, value]) => {
        if (value)
          form.setValue(field as keyof z.infer<typeof formSchema>, value);
      });
    }
  };

  // Watch for changes to meetingInfo field
  const meetingInfo = form.watch("meetingInfo");

  useEffect(() => {
    if (activeTab === "paste" && meetingInfo) {
      handlePastedInfoChange(meetingInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingInfo, activeTab]);

  const handleSubmit = (values) => {
    console.log("Form submission started", {
      activeTab,
      values,
      errors: form.formState.errors,
    });

    setDebugMessage("Form submitted with tab: " + activeTab);

    // Format data appropriately based on the active tab
    let formattedData;

    if (activeTab === "manual") {
      formattedData = {
        meetingId: values.meetingId || "",
        meetingUrl: values.meetingUrl || "",
        password: values.password || "",
        startTime: values.startTime || "",
        endTime: values.endTime || "",
      };
    } else {
      // For paste tab, create a simplified payload with just the info
      formattedData = {
        meetingInfo: values.meetingInfo || "",
      };
    }

    console.log("Submitting formatted data:", formattedData);

    // Call the parent component's onSubmit
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      {debugMessage && (
        <div className="mb-4 p-2 bg-gray-100 text-gray-700 rounded-md">
          {debugMessage}
        </div>
      )}
      <form
        onSubmit={form.handleSubmit(handleSubmit, (errors) => {
          // Log validation errors
          console.error("Form validation failed", errors);
          setDebugMessage("Validation failed: " + JSON.stringify(errors));
        })}
      >
        <Tabs
          defaultValue="manual"
          className="w-full"
          onValueChange={(value) => {
            setActiveTab(value);
            console.log("Tab changed to:", value);
          }}
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
                    <FormLabel>
                      Meeting URL <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://zoom.us/j/123456789"
                        {...field}
                      />
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
                      <Input placeholder="123456" type="text" {...field} />
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
                      <FormLabel>
                        Start Time <span className="text-red-500">*</span>
                      </FormLabel>
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
                      <FormLabel>
                        End Time <span className="text-red-500">*</span>
                      </FormLabel>
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
                  <FormLabel>
                    Meeting Information <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Join Zoom Meeting
https://zoom.us/j/123456789
Meeting ID: 123 456 789
Password: 123456
Time: May 1, 2024 2:00 PM - 3:00 PM`}
                      className="min-h-[200px]"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        console.log("Textarea value changed:", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Paste the entire meeting invitation here. The system will
                    automatically extract the meeting URL, ID, password, and
                    times.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Add a simplified button just for the paste tab */}
            <div className="mt-4">
              <Button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => {
                  const meetingInfo = form.getValues("meetingInfo");
                  if (meetingInfo) {
                    console.log("Manual submit with meetingInfo:", meetingInfo);
                    onSubmit({ meetingInfo });
                    setDebugMessage("Manually submitted with meetingInfo");
                  } else {
                    setDebugMessage("No meeting info provided");
                  }
                }}
              >
                Submit Pasted Info
              </Button>
            </div>
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
