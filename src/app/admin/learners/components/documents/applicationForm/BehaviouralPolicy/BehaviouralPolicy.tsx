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
  page: { marginBottom: 10, textTransform: "capitalize" },
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
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {section.behavioural.title}
            </Text>
          </div>
          <div>
            {section.behavioural.section.map((list) => (
              <div key={list.id} style={{ marginLeft: 10 }}>
                <div className="text-lg font-bold">
                  <Text style={{ fontSize: 12 }}>{list.title}</Text>
                </div>
                <div className="text-lg">
                  <Text style={{ fontSize: 10, marginLeft: 5 }}>
                    {list.paragraph}
                  </Text>
                </div>
              </div>
            ))}
          </div>
          <div className="text-lg">
            {section.behavioural.bulletPoints.map((list) => (
              <ul key={list.id} style={{ marginLeft: 10 }}>
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
