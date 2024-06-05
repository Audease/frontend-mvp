import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/button";
import Link from "next/link";

/**
 * Form1 Component
 *
 * @param {Object} props - Properties passed to the component
 * @param {Object} props.formData - Data object containing form fields
 * @param {Function} props.setFormData - Function to update formData state
 * @param {Function} props.handleSubmit - Function to handle form submission
 * @returns {JSX.Element} Form component for user registration
 */

export default function Form1({ formData, setFormData, handleSubmit }) {
  const {
    college,
    bussinessNo,
    firstName,
    lastName,
    email,
    noOfEmployee,
    selectedCountry,
  } = formData;

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    /**
     * Fetches country data
     */
    //   const fetchCountries = async () => {
    //     try {
    //       const response = await axios.get("https://restcountries.com/v3.1/all");
    //       const sortedCountries = response.data.sort((a, b) =>
    //         a.name.common.localeCompare(b.name.common)
    //       );
    //       setCountries(sortedCountries);
    //     } catch (error) {
    //       console.error("Error fetching countries:", error);
    //     }
    //   };
    //   fetchCountries();
    // }, []);

    /**
     * Fetches country data and filters for United Kingdom
     */
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const unitedKingdom = response.data.find(
          (country) => country.name.common === "United Kingdom"
        );
        setCountries(unitedKingdom ? [unitedKingdom] : []);
      } catch (error) {
        // console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  /**
   * Handles input change and updates formData state
   *
   * @param {Object} e - Event object
   */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="text-tblack bg-white rounded-md">
      <form className="p-8" onSubmit={handleSubmit}>
        <div className="pb-4">
          <h3 className="font-semibold text-h3">Sign Up</h3>
          <p className="font-normal text-h2">
            Already have an account?{" "}
            <Link href={"/signIn"}>
              <span className="text-h2 text-link1"> Sign In</span>
            </Link>
          </p>
        </div>
        <div className="mt-4">
          <input
            type="text"
            name="College"
            className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
              college ? "bg-gray-100" : ""
            }`}
            value={college}
            placeholder="College"
            onChange={handleChange}
            required
          />
          <div className="flex flex-row my-4 space-x-4">
          <input
            type="number"
            name="noOfEmployee"
            className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
              noOfEmployee ? "bg-gray-100" : ""
            }`}
            value={noOfEmployee}
            placeholder="No of Employees"
            onChange={handleChange}
            required
          />

            <div className="">
              <select
                name="selectedCountry"
                id="selectedCountry"
                value={selectedCountry}
                onChange={handleChange}
                className={`border rounded-md p-[0.6rem] text-h2 text-tgrey1 font-normal w-[10rem] bg-white focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                  selectedCountry ? "bg-gray-100" : ""
                }`}
                required
              >
                <option value="Country" >Country</option>
                {countries.map((country) => (
                  <option key={country.cca2} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <input
            type="text"
            name="bussinessNo"
            className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
              bussinessNo ? "bg-gray-100" : ""
            }`}
            placeholder="Bussiness No"
            value={bussinessNo}
            onChange={handleChange}
            required
          />
          <div className="flex flex-row my-4 space-x-4">
            <input
              type="text"
              name="firstName"
              className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-[10rem] focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                firstName ? "bg-gray-100" : ""
              }`}
              placeholder="First Name"
              value={firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-[10rem] focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                lastName ? "bg-gray-100" : ""
              }`}
              placeholder="Last Name"
              value={lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
              email ? "bg-gray-100" : ""
            }`}
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
          />
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
  );
}
