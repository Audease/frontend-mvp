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
  page: { marginBottom: 10, textTransform: "capitalize" },
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
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {content.title}
        </Text>
        <Text style={{ fontSize: 12 }}>{content.commitment}</Text>
      </div>

      {/* Body Sections */}
      <div>
        {content.body.map((section) => (
          <div key={section.id} style={styles.page}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {section.title}
            </Text>
            <ul>
              {section.points.map((point) => (
                <li key={point.id} style={styles.page}>
                  <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                    {point.point}
                  </Text>
                  <Text style={{ fontSize: 12 }}>{point.description}</Text>

                  {/* Render sub_points if they exist */}
                  {point.sub_points && (
                    <ul>
                      {point.sub_points.map((subPoint) => (
                        <li key={subPoint.id} style={styles.page}>
                          <Text style={{ fontSize: 12 }}>
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
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>
              {content.table.title}
            </Text>
            <p>
              {" "}
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
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
