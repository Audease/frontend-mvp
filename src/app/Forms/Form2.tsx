"use client";

import Button from "../components/button";
import { BackButton } from "../components/button";
import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import counties from "../data/counties .json";


export default function Form2({
  formData,
  setFormData,
  handleSubmit,
  handleBackClick,
}) {
  const {
    streetAddress,
    streetAddress2,
    city,
    postCode,
    selectedCounty,
    phoneNumber,
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneNumberChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  // const axios = require("axios");

  // const apiKey = "GN2QkYKGxcZ9Tmrvj5gusxxJ62OR54OI";

  // async function findCounties() {
  //   try {
  //     const response = await axios.get('https://api.os.uk/search/names/v1/find', {
  //       params: {
  //         key: apiKey,
  //         query: 'County',
  //         maxresults: 100, // Adjust as needed
  //         fq: 'LOCAL_TYPE:Postcode'
  //       }
  //     });
      
  //     // For explanation and debugging purposes we display the full response from the API in the console
  //     // console.log(JSON.stringify(response.data, null, 50));
  
  //     // Extract county names from the response
  //     const counties = response.data.results.map(result => result.GAZETTEER_ENTRY.NAME1);
  //     console.log('Counties:', counties);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }
  
  // findCounties();

  return (
    <div>
      <div className="text-tblack bg-white rounded-md">
        <form className="p-8" onSubmit={handleSubmit}>
          <div className="mt-4 space-y-6">
            <input
              type="text"
              name="streetAddress"
              className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                streetAddress ? "bg-gray-100" : ""
              }`}
              value={streetAddress}
              placeholder="Street address"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="streetAddress2"
              className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                streetAddress2 ? "bg-gray-100" : ""
              }`}
              value={streetAddress2}
              placeholder="Street address 2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="City"
              className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                city ? "bg-gray-100" : ""
              }`}
              value={city}
              placeholder="City"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="postCode"
              className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                postCode ? "bg-gray-100" : ""
              }`}
              value={postCode}
              placeholder="Post code"
              onChange={handleChange}
              required
            />
            <div>
            <select
                id="county"
                name="selectedCounty"
                value={selectedCounty}
                onChange={handleChange}
                className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full bg-white focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                  selectedCounty ? "bg-gray-100" : ""
                }`}
                required
              >
                <option value="">County</option>
                {counties.counties.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div
                className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                  phoneNumber ? "bg-gray-100" : ""
                }`}
              >
                <PhoneInput
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  defaultCountry="GB"
                  className="w-full"
                  required
                />
              </div>
              <p className="font-normal text-xs text-tgrey1 py-1">
                Standard call, messaging or data rates may apply.
              </p>
            </div>
          </div>
          <Button buttonText={`Continue`} className={`mt-10`} />
        </form>
        <hr className="border-2 border-tgrey2" />
        <div className="py-4 px-6">
          <p className="font-normal text-xs text-tgrey1">
            Protected by reCAPTCHA and subject to the Rhombus
            <span className="text-xs text-link1">
              {" "}
              Privacy Policy and Terms of Service.
            </span>
          </p>
        </div>
      </div>
      <BackButton
        buttonText={`Go back`}
        className={`bg-deepGrey mt-4`}
        onClick={handleBackClick}
      />
    </div>
  );
}