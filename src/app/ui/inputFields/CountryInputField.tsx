"use client"

import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const SelectedCountryContext = createContext("Select State");

export default function CountryInputField() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const sortedCountries = response.data.sort((a, b) => {
          return a.name.common.localeCompare(b.name.common);
        });
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const userSelectedCountry = e.target.value;
    setSelectedCountry(userSelectedCountry);
    console.log(userSelectedCountry);
  };

  return (
    <SelectedCountryContext.Provider value={selectedCountry}>
      <div className="">
        <select
          id="country"
          value={selectedCountry}
          onChange={handleChange}
          className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-[10rem] bg-white ${
            selectedCountry ? "bg-gray-100 focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1" : ""
          }`}
        >
          <option value="Country">Country</option>
          {countries.map((country) => (
            <option key={country.cca2} value={country.name.common}>
              {country.name.common}
            </option>
          ))}
        </select>
      </div>
    </SelectedCountryContext.Provider>
  );
}

export function StateInputField() {
  const [selectedStates, setSelectedStates] = useState("");

  const handleChange = (e) => {
    setSelectedStates(e.target.value);
  };

  const userSelectedCountry = useContext(SelectedCountryContext);

  return (
    <div>
      <select
        id="country"
        value={selectedStates}
        onChange={handleChange}
        className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full bg-white ${
          selectedStates
            ? "bg-gray-100 focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1"
            : ""
        }`}
      >
        <option value="States">States</option>
        <option value={userSelectedCountry}>{userSelectedCountry}</option>
      </select>
    </div>
  );
}
