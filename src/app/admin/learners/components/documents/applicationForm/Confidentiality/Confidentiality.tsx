"use client";

import React from "react";
import { applicationForm } from "../../dummyForm";
import { StyleSheet, Text } from "@react-pdf/renderer";
import ConfidentialityForm from "./ConfidentitalityForm";

interface ConfidentialityPolicyProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const styles = StyleSheet.create({
  page: { marginBottom: 10, textTransform: "capitalize" },
  section: { textAlign: "center", margin: 30 },
});

const Confidentiality: React.FC<ConfidentialityPolicyProps> = ({
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
              {section.confidentiality.title}
            </Text>
          </div>
          <div>
            {section.confidentiality.paragraphs.map((list) => (
              <div key={list.id} className="text-lg">
                  <Text style={{ fontSize: 12, marginLeft: 10 }}>{list.p}</Text>
              </div>
            ))}
          </div>
          {/* The Form  */}
          <ConfidentialityForm
            {...{ formData, setFormData, onPrevClick, onNextClick }}
          />
        </div>
      ))}
    </div>
  );
};

export default Confidentiality;
