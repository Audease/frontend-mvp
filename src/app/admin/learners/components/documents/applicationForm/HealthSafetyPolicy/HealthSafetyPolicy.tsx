"use client";

import React from "react";

import { StyleSheet, Text } from "@react-pdf/renderer";
import { applicationForm } from "../../dummyForm";
import HealthSafetyPolicyForm from "./HealthSafetyPolicyForm";

interface HealthAndSafetyPolicyProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const styles = StyleSheet.create({
  page: { marginBottom: 10, textTransform: "capitalize" },
  section: { textAlign: "center", margin: 30 },
});

const content = applicationForm[0].healthAndSafetyPolicy;

const HealthSafetyPolicy: React.FC<HealthAndSafetyPolicyProps> = ({
  formData,
  setFormData,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div >
      <div className="text-xl flex flex-col">
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {content.title}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {content.purpose}
        </Text>
        <Text style={{ fontSize: 18 }}>{content.commitment}</Text>
      </div>
      <div>
        {content.managementResponsibilities.map((section) => (
          <div key={section.id} style={styles.page}>
            <div className="text-xl">
              <Text style={{ fontSize: 18 }}>{section.description}</Text>
            </div>
          </div>
        ))}
      </div>
      <div>
        {content.individualResponsibilities.map((section) => (
          <div key={section.id} style={styles.page}>
            <div className="text-xl">
              <Text style={{ fontSize: 18 }}>{section.description}</Text>
            </div>
          </div>
        ))}
      </div>

      {/* The Form */}
      <HealthSafetyPolicyForm
        {...{ formData, setFormData, onPrevClick, onNextClick }}
      />
    </div>
  );
};

export default HealthSafetyPolicy;
