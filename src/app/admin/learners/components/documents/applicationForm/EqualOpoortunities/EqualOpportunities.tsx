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
  page: { marginBottom: 4, textTransform: "capitalize", padding: 10 },
  title: { fontSize: 18, fontWeight: "bold", paddingBottom: 5 },
  description: {paddingVertical: 10, fontSize: 12, lineHeight:2.5 },
  list: {paddingVertical: 5, fontSize: 12, lineHeight:2.5 },
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
    <div style={styles.page}>
      <div className="text-xl flex flex-col">
        <Text style={styles.title}>
          {content.title}
        </Text>
      </div>
      <div>
        {content.statement.map((section) => (
          <div key={section.id}>
            <div className="text-xl">
              <Text style={styles.description}>{section.text}</Text>
            </div>
          </div>
        ))}
      </div>
      <div>
        {content.procedures.map((section) => (
          <div key={section.id}>
            <div className="text-xl">
              <Text style={styles.description}>{section.text}</Text>
            </div>
            <div>
              {section.list.map((points) => (
                <div key={points.id}>
                  <li className="text-xl">
                    <Text style={styles.list}>{points.text}</Text>
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
