"use client";

import { useState } from "react";
import ForgotPasswordFormOne from "./ForgotPasswordFormOne";
import ForgotPasswordFormTwo from "./ForgotPasswordFormTwo";
import WelcomeBack from "../components/WelcomeBack";

export default function PasswordFormStep() {
  const [currentPasswordForm, setCurrentPasswordForm] = useState(1);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setCurrentPasswordForm(currentPasswordForm + 1);
    // localStorage.setItem("email", JSON.stringify(email));
    console.log(forgotPasswordEmail);
  };

  

  let passwordFormComponent
  
  let sideTextComponent

  switch (currentPasswordForm) {
    case 1:
      passwordFormComponent = (
        <ForgotPasswordFormOne handleEmailSubmit={handleEmailSubmit} forgotPasswordEmail={forgotPasswordEmail} setForgotPasswordEmail = {setForgotPasswordEmail}/>
      );
      sideTextComponent = (<WelcomeBack boldText={"Forgot your password?"} smallText={"Don't worry, we've got you covered. Enter your email address to receive a link to reset your password."}/>)
      break;
    case 2:
      passwordFormComponent = <ForgotPasswordFormTwo />;
      sideTextComponent = (<WelcomeBack boldText={"Forgot your password?"} smallText={"Don't worry, we've got you covered. Enter your email address to receive a link to reset your password."}/>)
      break;
    default:
      passwordFormComponent = (
        <ForgotPasswordFormOne handleEmailSubmit={handleEmailSubmit} forgotPasswordEmail={forgotPasswordEmail} setForgotPasswordEmail = {setForgotPasswordEmail}/>
      );
      sideTextComponent = (<WelcomeBack boldText={"Forgot your password?"} smallText={"Don't worry, we've got you covered. Enter your email address to receive a link to reset your password."}/>)
  }



 


  return <div>
    {sideTextComponent}
    {passwordFormComponent}
    </div>;
}
