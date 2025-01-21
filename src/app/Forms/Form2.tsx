import Button from "../components/button";
import { BackButton } from "../components/button";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import counties from "../data/counties .json";
import { useState, useRef, useEffect } from "react";

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

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const suggestionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const fetchAddressDetails = async (postcode) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${postcode}`
      );
      const data = await response.json();

      if (data.status === 200) {
        setFormData((prev) => ({
          ...prev,
          postCode: postcode,
          streetAddress: data.result.thoroughfare || "",
          city: data.result.nhs_ha || "",
          selectedCounty: data.result.primary_care_trust || "",
        }));
        setError("");
      } else {
        setError("Invalid postcode. Please try again.");
      }
    } catch (err) {
      setError("Error fetching address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePostcodeChange = async (e) => {
    const value = e.target.value;
    handleChange(e);

    if (value.length >= 2) {
      try {
        const response = await fetch(
          `https://api.postcodes.io/postcodes/${value}/autocomplete`
        );
        const data = await response.json();

        if (data.status === 200 && data.result) {
          setSuggestions(data.result);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = async (selectedPostcode) => {
    await fetchAddressDetails(selectedPostcode);
    setShowSuggestions(false);
  };

  return (
    <div>
      <div className="text-tblack bg-white rounded-md">
        <form className="p-8" onSubmit={handleSubmit}>
          <div className="mt-4 space-y-6">
            <div className="relative" ref={suggestionRef}>
              <input
                type="text"
                name="postCode"
                className={`border-tgrey2 rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                  postCode ? "bg-gray-100" : ""
                }`}
                value={postCode}
                placeholder="Post code"
                onChange={handlePostcodeChange}
                required
              />

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-tgrey2 rounded-md shadow-lg max-h-60 overflow-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-tgrey1"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}

              {loading && (
                <p className="text-sm text-tgrey1 mt-1">
                  Loading address details...
                </p>
              )}
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
            <input
              type="text"
              name="streetAddress"
              className={`border-tgrey2 rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
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
              className={`border-tgrey2 rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                streetAddress2 ? "bg-gray-100" : ""
              }`}
              value={streetAddress2}
              placeholder="Street address 2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              className={`border-tgrey2 rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                city ? "bg-gray-100" : ""
              }`}
              value={city}
              placeholder="City"
              onChange={handleChange}
              required
            />

            <div>
              <select
                id="county"
                name="selectedCounty"
                value={selectedCounty}
                onChange={handleChange}
                className={`border-tgrey2 rounded-md p-2 text-h2 text-tgrey1 font-normal w-full bg-white focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
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
                className={`border-tgrey2 rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                  phoneNumber ? "bg-gray-100" : ""
                }`}
              >
                <PhoneInput
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  defaultCountry="GB"
                  className="w-full phoneInput"
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
