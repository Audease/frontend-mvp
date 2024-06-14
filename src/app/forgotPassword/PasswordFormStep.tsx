"use client";

import { useState } from "react";
import ForgotPasswordFormOne from "./ForgotPasswordFormOne";
import ForgotPasswordFormTwo from "./ForgotPasswordFormTwo";
import WelcomeBack from "../components/WelcomeBack";
import axios from "axios";

export default function PasswordFormStep() {
  const [currentPasswordForm, setCurrentPasswordForm] = useState(1);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')

  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    if (currentPasswordForm === 1) {
      try {
        const response = await axios.post('https://audease-dev.onrender.com/v1/auth/initiate-reset', {email: forgotPasswordEmail})
        console.log("Response received:", response);
        setCurrentPasswordForm(2);
      } catch (error) {
        console.log("Error reseting password:", error)
      } 
    } else {
      setCurrentPasswordForm(1);
    };
    
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
