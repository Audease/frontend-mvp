"use client";

import React from "react";
import GuidancePolicyForm from "./GuidancePolicyForm";
import { guidancePolicyData } from "./data/GuidancePolicy";

interface GuidancePolicyProps {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
}


const content = guidancePolicyData;

const GuidancePolicy: React.FC<GuidancePolicyProps> = ({
  formData,
  setFormData,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div>
      {/* Policy Title and Commitment */}
      <div className="flex flex-col">
        <h3 className="text-xl font-bold py-3">
          {content.title}
        </h3>
        <p className="text-base text-justify">{content.commitment}</p>
      </div>

      {/* Body Sections */}
      <div>
        {content.body.map((section) => (
          <div key={section.id}>
            <h3 className="text-base font-bold py-3">
              {section.title}
            </h3>
            <ul>
              {section.points.map((point) => (
                <li key={point.id}>
                  <p className="text-base text-justify py-2">
                    {point.point}
                  </p>
                  <p className="text-base text-justify">{point.description}</p>

                  {/* Render sub_points if they exist */}
                  {point.sub_points && (
                    <ul>
                      {point.sub_points.map((subPoint) => (
                        <li key={subPoint.id} className="text-base text-justify py-2 list-disc">
                            {subPoint.sub_point}
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
            <h3 className="text-base py-3 font-bold">
              {content.table.title}
            </h3>
            <p>
              <p className="text-base text-justify">
                {content.table.paragraph}
              </p>
            </p>
          </div>
          {/* Table  */}
          <div className="w-full max-w-6xl mx-auto">
            <div>
              <div className="grid grid-cols-5 gap-4 my-3">
                {content.table.processData.columns.map(
                  (column, columnIndex) => (
                    <div key={columnIndex} className=" p-4">
                      <h3 className="font-bold text-base mb-4 text-center border-b pb-2">
                        {column.header}
                      </h3>
                      {column.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-4">
                          {section.title && (
                            <h4 className="font-semibold text-base mb-2">
                              {section.title}
                            </h4>
                          )}
                          <ul className="space-y-2">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-base">
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
                <p className="text-center text-base border ">{text.text}</p>
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
