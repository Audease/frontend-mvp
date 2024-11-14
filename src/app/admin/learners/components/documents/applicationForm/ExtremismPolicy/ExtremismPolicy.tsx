import React from "react";
import ExtremismPolicyForm from "./ExtremismPolicyForm";
import { applicationForm } from "../../dummyForm";

type ExtremismPolicyProps = {
  formData?: any;
  setFormData?: (data: any) => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
};

const content = applicationForm[0].extremisimPolicy;

const ExtremismPolicy: React.FC<ExtremismPolicyProps> = ({
  onNextClick,
  onPrevClick,
  formData,
  setFormData,
}) => {
  return (
    <div>
      <div>
        <h3>{content.title}</h3>
        <p>{content.description}</p>
      </div>
      <div>
        {content.content.map((d, index) => (
          <div key={index}>
            <h3 className="font-bold">{d.title}</h3>
            {d.paragraphs.map((d, index) => (
              <p key={index} className="py-2">{d}</p>
            ))}
            <div>
              <h3>{d.lists.title}</h3>
              <p>{d.lists.p}</p>

              {d.lists.li.map((d, index) => (
                <li key={index} className=" py-2">{d}</li>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <ExtremismPolicyForm
          {...{ FormData, setFormData, onPrevClick, onNextClick }}
        />
      </div>
    </div>
  );
};

export default ExtremismPolicy;
