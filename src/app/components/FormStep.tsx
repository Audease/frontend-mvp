"use client";

import { useState } from "react";
import Form1, { Form2, Form3 } from "../signup/forms";


export default function FormStep() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("I submitted");
    setCurrentStep(currentStep + 1);
    console.log(currentStep);
  };

  let formComponent;
  switch (currentStep) {
    case 1:
      formComponent = <Form1 handleSubmit={handleSubmit} />;
      break;
    case 2:
      formComponent = <Form2 handleSubmit={handleSubmit} />;
      break;
    case 3:
      formComponent = <Form3 handleSubmit={handleSubmit} />;
      break;
    default:
      formComponent = <Form1 handleSubmit={handleSubmit} />;
  }

  return (
    <div>
      {formComponent}
    </div>
  );
}
