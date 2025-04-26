"use client"

import { useState, useEffect } from "react";
import Form1 from "../Forms/Form1";
import Form2 from "../Forms/Form2";
import Form3 from "../Forms/Form3";
import { useRouter } from "next/navigation"; // Corrected import
import axios from "axios";

export default function FormStep() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    filledCollege: "",
  });

  const router = useRouter();

  // Effect to watch currentStep changes and trigger API call on step 3
  useEffect(() => {
    if (currentStep === 3) {
      // Ensure data is filled in before submitting
      if (
        form1Data.college &&
        form1Data.firstName &&
        form1Data.lastName &&
        form1Data.email &&
        form1Data.noOfEmployee &&
        form1Data.selectedCountry &&
        form1Data.businessNo &&
        form2Data.streetAddress &&
        form2Data.city &&
        form2Data.postCode &&
        form2Data.phoneNumber &&
        form3Data.userName &&
        form3Data.password &&
        form3Data.confirmPassword &&
        form3Data.userCollege &&
        form3Data.filledCollege
      ) {
        handleSubmit();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const handleSubmit = async () => {
    // console.log("Clicking")
    setLoading(true);
    setError("");

    const userLoginName = `${form3Data.userName}.${form3Data.filledCollege}.admin`;

    const newUser = {
      college_name: form1Data.college,
      first_name: form1Data.firstName,
      last_name: form1Data.lastName,
      email: form1Data.email,
      phone: form2Data.phoneNumber,
      no_of_employee: parseInt(form1Data.noOfEmployee, 10),
      country: form1Data.selectedCountry,
      business_code: form1Data.businessNo,
      address_line1: form2Data.streetAddress,
      address_line2: form2Data.streetAddress2,
      city: form2Data.city,
      post_code: form2Data.postCode,
      county: form2Data.selectedCounty,
      username: userLoginName,
      password: form3Data.password,
    };

    try {
      const response = await axios.post(
        "/api/signup",
        newUser
      );

      if (response.status === 201) {
        localStorage.setItem("userEmail", form1Data.email);
        router.push("/verifyEmail");
      } else if (response.status === 409) {
        setError(response.data);
      } else {
        setError(response.data.message || "School creation failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error creating school");
      console.error("Error creating school:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderFormComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form1
            formData={form1Data}
            setFormData={setForm1Data}
            handleSubmit={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <Form2
            formData={form2Data}
            setFormData={setForm2Data}
            handleSubmit={() => setCurrentStep(3)}
            handleBackClick={handleBackClick}
          />
        );
      case 3:
        return (
          <Form3
            formData={form3Data}
            userCollege={form1Data.college}
            setFormData={setForm3Data}
            handleSubmit={handleSubmit}
            handleBackClick={handleBackClick}
            loading={loading}
            error={error}
          />
        );
      default:
        return (
          <Form1
            formData={form1Data}
            setFormData={setForm1Data}
            handleSubmit={() => setCurrentStep(2)}
          />
        );
    }
  };

  return <div>{renderFormComponent()}</div>;
}
