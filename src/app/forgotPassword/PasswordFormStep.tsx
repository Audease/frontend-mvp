"use client";

import { useState } from "react";
import ForgotPasswordFormOne from "./ForgotPasswordFormOne";
import ForgotPasswordFormTwo from "./ForgotPasswordFormTwo";

export default function PasswordFormStep() {
  const [currentPasswordForm, setCurrentPasswordForm] = useState(1);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setCurrentPasswordForm(currentPasswordForm + 1);
    // localStorage.setItem("email", JSON.stringify(email));
    console.log(forgotPasswordEmail);
  };

  

  let passwordFormComponent;

  switch (currentPasswordForm) {
    case 1:
      passwordFormComponent = (
        <ForgotPasswordFormOne handleEmailSubmit={handleEmailSubmit} forgotPasswordEmail={forgotPasswordEmail} setForgotPasswordEmail = {setForgotPasswordEmail}/>
      );
      break;
    case 2:
      passwordFormComponent = <ForgotPasswordFormTwo />;
      break;
    default:
      passwordFormComponent = <ForgotPasswordFormOne handleEmailSubmit={handleEmailSubmit} forgotPasswordEmail={forgotPasswordEmail} setForgotPasswordEmail = {setForgotPasswordEmail}/>
  }



 


  return <div>{passwordFormComponent}</div>;
}
