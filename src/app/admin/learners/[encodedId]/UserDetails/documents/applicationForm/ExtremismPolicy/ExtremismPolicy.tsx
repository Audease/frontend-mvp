import React from "react";
import ExtremismPolicyForm from "./ExtremismPolicyForm";
import { extremismPolicyData } from "./data/ExtremismPolicy";

type ExtremismPolicyProps = {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  userRole?: string;
  isSubmitted?: boolean;
};

const content = extremismPolicyData;

const ExtremismPolicy: React.FC<ExtremismPolicyProps> = ({
  onNextClick,
  onPrevClick,
  formData,
  setFormData,
  userRole,
  isSubmitted
}) => {
  return (
    <div>
      <div>
        <h3 className="text-xl font-bold py-3">{content.title}</h3>
        <p className="text-base text-justification">{content.description}</p>
      </div>
      <div>
        {content.content.map((d, index) => (
          <div key={index}>
            <h3 className="text-base font-bold py-2">{d.title}</h3>
            {d.paragraphs.map((d, index) => (
              <p key={index} className="text-base text-justify">
                {d}
              </p>
            ))}
            <div>
              <h3 className="text-base font-bold py-2">{d.lists.title}</h3>
              <p className="text-base text-justify">{d.lists.p}</p>

              {d.lists.li.map((d, index) => (
                <li key={index} className="text-base text-justify">
                  {d}
                </li>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <ExtremismPolicyForm
          {...{
            formData,
            setFormData,
            onPrevClick,
            onNextClick,
            userRole,
            isSubmitted,
          }}
        />
      </div>
    </div>
  );
};

export default ExtremismPolicy;
