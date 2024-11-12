"use client";

import React from "react";

import { StyleSheet, Text } from "@react-pdf/renderer";
import { applicationForm } from "../../dummyForm";
import GuidancePolicyForm from "./GuidancePolicyForm";

interface GuidancePolicyProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: "bold", padding: 10 },
  sub_title: { fontSize: 12, fontWeight: "bold", paddingHorizontal: 10 },
  description: { paddingHorizontal: 10, paddingVertical: 5, fontSize: 12, lineHeight: 2.5 },
  list: { paddingHorizontal: 12, paddingVertical: 5, fontSize: 12, lineHeight: 2 },
  section: { textAlign: "center", margin: 30 },
});

const content = applicationForm[0].guidancePolicy;

const GuidancePolicy: React.FC<GuidancePolicyProps> = ({
  formData,
  setFormData,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div>
      {/* Policy Title and Commitment */}
      <div className="text-xl flex flex-col">
        <Text style={styles.title}>
          {content.title}
        </Text>
        <Text style={styles.description}>{content.commitment}</Text>
      </div>

      {/* Body Sections */}
      <div>
        {content.body.map((section) => (
          <div key={section.id}>
            <Text style={styles.sub_title}>
              {section.title}
            </Text>
            <ul>
              {section.points.map((point) => (
                <li key={point.id}>
                  <Text style={styles.sub_title}>
                    {point.point}
                  </Text>
                  <Text style={styles.list}>{point.description}</Text>

                  {/* Render sub_points if they exist */}
                  {point.sub_points && (
                    <ul>
                      {point.sub_points.map((subPoint) => (
                        <li key={subPoint.id} >
                          <Text style={styles.list}>
                            - {subPoint.sub_point}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div>
            <Text style={styles.sub_title}>
              {content.table.title}
            </Text>
            <p>
              {" "}
              <Text style={styles.sub_title}>
                {content.table.paragraph}
              </Text>
            </p>
          </div>
          {/* Table  */}
          <div className="w-full max-w-6xl mx-auto">
            <div>
              <div className="grid grid-cols-5 gap-4 my-3">
                {content.table.processData.columns.map(
                  (column, columnIndex) => (
                    <div key={columnIndex} className=" p-4">
                      <h3 className="font-bold text-xs mb-4 text-center border-b pb-2">
                        {column.header}
                      </h3>
                      {column.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-4">
                          {section.title && (
                            <h4 className="font-semibold text-xs mb-2">
                              {section.title}
                            </h4>
                          )}
                          <ul className="space-y-2">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-xs">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Table 2  */}
          <div className="flex flex-col justify-center items-center">
            {content.table.toc.map((text) => (
              <div key={text.id} className="w-[20rem]">
                <p className="text-center tet-sm border ">{text.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Form */}
      <GuidancePolicyForm
        {...{ formData, setFormData, onPrevClick, onNextClick }}
      />
    </div>
  );
};

export default GuidancePolicy;
