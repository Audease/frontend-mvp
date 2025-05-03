import React, { useEffect, useState } from "react";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FundingField = ({ form }) => {
  const [fundingType, setFundingType] = useState(form.getValues("funding") || "");  

  const handleFundingChange = (value) => {
    setFundingType(value);
    
    if (value === "student-loan") {
      form.setValue("funding", "student-loan");
    } else if (value === "private") {
      form.setValue("funding", "private");
    } else if (value === "others") {
      form.setValue("funding", "");
    }
  };

  return (
    <FormField
      control={form.control}
      name="funding"
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormLabel>Funding</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <RadioGroup 
                defaultValue="self-funding"
                value={fundingType}
                onValueChange={handleFundingChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student-loan" id="student-loan" />
                  <Label htmlFor="student-loan">Student loan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private">Private</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="others" id="others" />
                  <Label htmlFor="others">Others</Label>
                </div>
              </RadioGroup>

              {fundingType === "others" && (
                <Input 
                  placeholder="Enter funding source" 
                  value={field.value !== "others" ? field.value : ""}
                  onChange={(e) => {
                    form.setValue("funding", e.target.value);
                  }}
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FundingField;