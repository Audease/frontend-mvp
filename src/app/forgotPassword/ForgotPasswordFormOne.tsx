"use client";

import Button from "../components/button";
import React, { useState } from "react";

export default function ForgotPasswordFormOne({
  handleEmailSubmit,
  forgotPasswordEmail,
  setForgotPasswordEmail,
  error,
  loading,
}) {
  const handleEmailChange = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  return (
    <div className="text-tblack bg-white rounded-md w-96">
      <div className="p-8">
        <div className="pb-4">
          <h3 className="font-semibold  text-h3">Forgot password?</h3>
          <p className="font-normal text-h2">
            We’ll send a new password link to your email
          </p>
        </div>
        <form action="" onSubmit={handleEmailSubmit} >
          <input
            type="email"
            name="email"
            className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
              forgotPasswordEmail ? "bg-gray-100" : ""
            }`}
            placeholder="Email"
            value={forgotPasswordEmail}
            onChange={handleEmailChange}
            required
          />

          {/* Button  */}
          <Button buttonText={loading ? "Sending link..." : "Send password link"} className={`my-6`} />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
