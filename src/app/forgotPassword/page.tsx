"use client";

import { useState } from "react";
import ForgotPasswordFormOne from "./ForgotPasswordFormOne";
import ForgotPasswordFormTwo from "./ForgotPasswordFormTwo";
import WelcomeBack from "../components/WelcomeBack";
import axios from "axios";

export default function ForgotPassword() {
  const [currentPasswordForm, setCurrentPasswordForm] = useState(1);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 

    try {
      const response = await axios.post(
        "https://audease-dev.onrender.com/v1/auth/initiate-reset",
        { email: forgotPasswordEmail }
      );

      if (response.status === 200) {
        setCurrentPasswordForm(currentPasswordForm + 1);
      } else {
        setError(response.data?.message || "Failed to initiate reset");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error initiating reset");
      console.error("Error initiating reset:", error);
    } finally {
      setLoading(false);
    }

    // localStorage.setItem("email", JSON.stringify(email));
    console.log(forgotPasswordEmail);
  };

  let passwordFormComponent;
  let sideTextComponent;

  switch (currentPasswordForm) {
    case 1:
      passwordFormComponent = (
        <ForgotPasswordFormOne
          handleEmailSubmit={handleEmailSubmit}
          forgotPasswordEmail={forgotPasswordEmail}
          setForgotPasswordEmail={setForgotPasswordEmail}
          loading={loading}
          error={error}
        />
      );
      sideTextComponent = (
        <WelcomeBack
          boldText={"Forgot your password?"}
          smallText={
            "Don't worry, we've got you covered. Enter your email address to receive a link to reset your password."
          }
        />
      );
      break;
    case 2:
      passwordFormComponent = <ForgotPasswordFormTwo />;
      sideTextComponent = (
        <WelcomeBack
          boldText={"Forgot your password?"}
          smallText={""}
        />
      );
      break;
    default:
      passwordFormComponent = (
        <ForgotPasswordFormOne
          handleEmailSubmit={handleEmailSubmit}
          forgotPasswordEmail={forgotPasswordEmail}
          setForgotPasswordEmail={setForgotPasswordEmail}
          loading={loading}
          error={error}
        />
      );
      sideTextComponent = (
        <WelcomeBack
          boldText={"Forgot your password?"}
          smallText={
            "Don't worry, we've got you covered. Enter your email address to receive a link to reset your password."
          }
        />
      );
  }

  return (
    <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-24 lg:space-y-0">
      <div>{sideTextComponent}</div>
      <div className="flex flex-row justify-center items-center m-6">
        {passwordFormComponent}
      </div>
    </div>
  );
}
