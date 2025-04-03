import React, { useState } from "react";
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
  const [fundingType, setFundingType] = useState("self-funding");

  const handleFundingChange = (value) => {
    setFundingType(value);
    
    if (value === "self-funding") {
      form.setValue("funding", "self-funding");
    } else {
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
                  <RadioGroupItem value="self-funding" id="self-funding" />
                  <Label htmlFor="self-funding">Self Funding</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scholarship" id="scholarship" />
                  <Label htmlFor="scholarship">Scholarship</Label>
                </div>
              </RadioGroup>

              {fundingType === "scholarship" && (
                <Input 
                  placeholder="Enter scholarship provider" 
                  value={field.value !== "self-funding" ? field.value : ""}
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