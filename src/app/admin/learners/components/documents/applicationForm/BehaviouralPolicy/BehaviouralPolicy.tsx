"use client";

import React from "react";
import { applicationForm } from "../../dummyForm";
import { StyleSheet, Text } from "@react-pdf/renderer";
import BehaviouralForm from "./BehaviouralForm";

interface BehaviouralPolicyProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const styles = StyleSheet.create({
  page: { marginBottom: 1, textTransform: "capitalize", padding: 10 },
  title: { fontSize: 18, fontWeight: "bold" },
  description: {paddingVertical: 5, fontSize: 12, lineHeight:2.5 },
  section: { textAlign: "center", margin: 30 },
});

const BehaviouralPolicy: React.FC<BehaviouralPolicyProps> = ({
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
            <Text style={styles.title}>
              {section.behavioural.title}
            </Text>
          </div>
          <div>
            {section.behavioural.section.map((list) => (
              <div key={list.id}>
                <div className="text-lg font-bold">
                  <Text style={styles.description}>{list.title}</Text>
                </div>
                <div className="text-lg">
                  <Text style={styles.description}>
                    {list.paragraph}
                  </Text>
                </div>
              </div>
            ))}
          </div>
          <div className="text-lg">
            {section.behavioural.bulletPoints.map((list) => (
              <ul key={list.id} style={{ ...styles.description, listStyleType: "disc" }}>
                <li className="list-disc">
                  <Text style={{ fontSize: 12 }}>{list.paragraph}</Text>
                </li>
              </ul>
            ))}
          </div>
          {/* The Form  */}
          <BehaviouralForm
            {...{ formData, setFormData, onPrevClick, onNextClick }}
          />
        </div>
      ))}
    </div>
  );
};

export default BehaviouralPolicy;
