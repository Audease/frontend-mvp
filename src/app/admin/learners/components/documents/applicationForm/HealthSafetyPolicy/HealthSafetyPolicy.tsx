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
    <div>
      <div className="text-xl flex flex-col">
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {content.title}
        </Text>
        <Text style={{ fontSize: 12 }}>{content.purpose}</Text>
      </div>
      <div>
        {content.audience.map((section) => (
          <div key={section.id} style={styles.page}>
            <div className="text-xl">
              <Text style={{ fontSize: 12 }}>{section.title}</Text>
            </div>
          </div>
        ))}
      </div>
      <div>
        {content.lists.map((section) => (
          <div key={section.id} style={styles.page}>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {section.title}
            </Text>

            {section.points.map((section) => (
              <li key={section.id} style={styles.page}>
                <Text style={{ fontSize: 12 }}>{section.point}</Text>
              </li>
            ))}
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
