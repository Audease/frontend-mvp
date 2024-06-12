"use client";

import { useState } from "react";
import Form1 from "../Forms/Form1";
import Form2 from "../Forms/Form2";
import Form3 from "../Forms/Form3";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function FormStep() {
  const [currentStep, setCurrentStep] = useState(1);

  const [form1Data, setForm1Data] = useState({
    college: "",
    businessNo: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === 3) {
      const newUser = {
        college_name: form1Data.college,
        first_name: form1Data.firstName,
        last_name: form1Data.lastName,
        email: form1Data.email,
        phone: form2Data.phoneNumber,
        no_of_employee: parseInt(form1Data.noOfEmployee),
        country: form1Data.selectedCountry,
        business_code: form1Data.businessNo,
        address_line1: form2Data.streetAddress,
        address_line2: form2Data.streetAddress2,
        city: form2Data.city,
        post_code: form2Data.postCode,
        state: form2Data.selectedCounty,
      };

      console.log(newUser)

      try {
        const response = await axios.post('https://audease-dev.onrender.com/v1/auth/create-school', newUser);
        console.log(response.data);
        // Programmatically navigate to verifyEmail
        router.push("/verifyEmail");
      } catch (error) {
        console.error("Error creating school:", error);
      }
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
