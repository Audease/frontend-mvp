"use client";

import React from "react";

import { StyleSheet, Text } from "@react-pdf/renderer";
import { applicationForm } from "../../dummyForm";
import EqualOpportunitiesForm from "./EqualOpportunitiesForm";

interface EqualOpportunitiesPolicyProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const styles = StyleSheet.create({
  page: { marginBottom: 10, textTransform: "capitalize" },
  section: { textAlign: "center", margin: 30 },
});

const content = applicationForm[0].equalOpportunitiesPolicy;

const EqualOpportunitiesPolicy: React.FC<EqualOpportunitiesPolicyProps> = ({
  formData,
  setFormData,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div>
      <div className="text-xl">
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {content.title}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {content.introduction}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {content.statement}
        </Text>
      </div>
      <div>
        {content.objectives.map((section) => (
          <div key={section.id} style={styles.page}>
            <div className="text-xl">
              <Text style={{ fontSize: 18 }}>{section.description}</Text>
            </div>
          </div>
        ))}
      </div>

      {/* The Form */}
      <EqualOpportunitiesForm
        {...{ formData, setFormData, onPrevClick, onNextClick }}
      />
    </div>
  );
};

export default EqualOpportunitiesPolicy;
