"use client";

import { useState } from "react";
import Form1 from "../Forms/Form1";
import Form2 from "../Forms/Form2";
import Form3 from "../Forms/Form3";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function FormStep() {
  // Step tracking
  const [currentStep, setCurrentStep] = useState(1);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form data states
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

  // Router for navigation
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous error

    // Construct the username
    const userLoginName = `${form3Data.userName}.${form3Data.filledCollege}.admin`;

    // Check if we are on the final step
    if (currentStep === 3) {
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
        const startTime = Date.now();
        const response = await axios.post(
          "https://audease-dev.onrender.com/v1/auth/create-school",
          newUser
        );
        const endTime = Date.now();

        console.log(`API call duration: ${endTime - startTime} ms`);

        if (response.status === 201) {
          localStorage.setItem("userEmail", form1Data.email);
          console.log(newUser);
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
    } else {
      // Proceed to the next step
      setCurrentStep(currentStep + 1);
      setLoading(false);
    }
  };

  // Handle back button click
  const handleBackClick = (e) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Determine which form to render based on the current step
  const renderFormComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form1
            formData={form1Data}
            setFormData={setForm1Data}
            handleSubmit={handleSubmit}
          />
        );
      case 2:
        return (
          <Form2
            formData={form2Data}
            setFormData={setForm2Data}
            handleSubmit={handleSubmit}
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
            handleSubmit={handleSubmit}
          />
        );
    }
  };

  return <div>{renderFormComponent()}</div>;
}
