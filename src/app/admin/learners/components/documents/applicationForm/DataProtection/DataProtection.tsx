"use client";

import React from "react";
import { applicationForm } from "../../dummyForm";
import { StyleSheet, Text } from "@react-pdf/renderer";
import CollegeObligation from "./CollegeObligation";


interface DataProtectionProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const styles = StyleSheet.create({
  page: { marginBottom: 10, textTransform: "capitalize" },
  section: { textAlign: "center", margin: 30 },
});

const DataProtection: React.FC<DataProtectionProps> = ({
  formData,
  setFormData,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div>
      {applicationForm.map((section) => (
        <div key={section.id} style={styles.page}>
          <div className="text-xl">
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {section.dataProtection.title}
            </Text>
          </div>
          {/* The Form  */}
          <CollegeObligation
            {...{ formData, setFormData, onPrevClick, onNextClick }}
          />
          
        </div>
      ))}
    </div>
  );
};

export default DataProtection;
