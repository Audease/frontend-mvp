"use client";

import { useState } from "react";
import Form1 from "../Forms/Form1";
import Form2 from "../Forms/Form2";
import Form3 from "../Forms/Form3";
import { useRouter } from "next/navigation";

export default function FormStep() {
  const [currentStep, setCurrentStep] = useState(1);

  const [form1Data, setForm1Data] = useState({
    college: "",
    bussinessNo: "",
    firstName: "",
    lastName: "",
    email: "",
    noOfEmployee: "",
    selectedCountry: "",
  });

  const [form2Data, setForm2Data] = useState({
    streetAddress: "",
    streetAddress2: "",
    city: "",
    postCode: "",
    selectedCounty: "",
    phoneNumber: "",
  });

  const [form3Data, setForm3Data] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    userCollege: "",
  });
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 3) {
      const newUser = {
        ...form1Data,
        ...form2Data,
        ...form3Data,
      };
      // console.log(newUser);
      // Saving data to local storage
      localStorage.setItem("formData", JSON.stringify(newUser));
      // Retrieving data from local storage
      const savedData = JSON.parse(localStorage.getItem("formData"));
      console.log(savedData)
      // Programmatically navigate to verifyEmail
      router.push("/verifyEmail");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep - 1);
  };

  let formComponent;
  switch (currentStep) {
    case 1:
      formComponent = (
        <Form1
          formData={form1Data}
          setFormData={setForm1Data}
          handleSubmit={handleSubmit}
        />
      );
      break;
    case 2:
      formComponent = (
        <Form2
          formData={form2Data}
          setFormData={setForm2Data}
          handleSubmit={handleSubmit}
          handleBackClick={handleBackClick}
        />
      );
      break;
    case 3:
      formComponent = (
        <Form3
          formData={form3Data}
          userCollege={form1Data.college}
          setFormData={setForm3Data}
          handleSubmit={handleSubmit}
          handleBackClick={handleBackClick}
        />
      );
      break;
    default:
      formComponent = (
        <Form1
          formData={form1Data}
          setFormData={setForm1Data}
          handleSubmit={handleSubmit}
        />
      );
  }

  return <div>{formComponent}</div>;
}
