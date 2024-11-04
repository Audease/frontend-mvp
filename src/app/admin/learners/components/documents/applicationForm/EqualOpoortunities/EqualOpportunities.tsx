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
      <div className="text-xl flex flex-col">
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {content.title}
        </Text>
      </div>
      <div>
        {content.statement.map((section) => (
          <div key={section.id} style={styles.page}>
            <div className="text-xl">
              <Text style={{ fontSize: 12 }}>{section.text}</Text>
            </div>
          </div>
        ))}
      </div>
      <div>
        {content.procedures.map((section) => (
          <div key={section.id} style={styles.page}>
            <div className="text-xl">
              <Text style={{ fontSize: 12 }}>{section.text}</Text>
            </div>
            <div>
              {section.list.map((points) => (
                <div key={points.id}>
                  <li className="text-xl">
                    <Text style={{ fontSize: 12 }}>{points.text}</Text>
                  </li>
                </div>
              ))}
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
