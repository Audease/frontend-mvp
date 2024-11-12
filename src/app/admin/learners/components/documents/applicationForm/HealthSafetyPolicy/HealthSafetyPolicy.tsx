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
  title: { fontSize: 18, fontWeight: "bold", padding:12 },
  sub_title: { fontSize: 12, fontWeight: "bold", padding:10 },
  description: {padding: 10, fontSize: 12, lineHeight:2.5 },
  list: {paddingVertical: 5, fontSize: 12, lineHeight:2.5, paddingHorizontal:10 },
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
        <Text style={styles.title}>
          {content.title}
        </Text>
        <Text style={styles.description}>{content.purpose}</Text>
      </div>
      <div>
        {content.audience.map((section) => (
          <div key={section.id}>
            <div className="text-xl">
              <Text style={styles.description}>{section.title}</Text>
            </div>
          </div>
        ))}
      </div>
      <div>
        {content.lists.map((section) => (
          <div key={section.id}>
            <Text style={styles.sub_title}>
              {section.title}
            </Text>

            {section.points.map((section) => (
              <li key={section.id} >
                <Text style={styles.list}>{section.point}</Text>
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
