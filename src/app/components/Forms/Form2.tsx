import Button from "../button";
import { BackButton } from "../button";

export default function Form2({ formData, setFormData, handleSubmit, handleBackClick }) {
  const {
    streetAddress,
    streetAddress2,
    city,
    postCode,
    selectedStates,
    phoneNumber,
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
              name="city"
              className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                city ? "bg-gray-100" : ""
              }`}
              value={city}
              placeholder="City"
              onChange={handleChange}
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
            />
            <div className="">
              <select
                id="state"
                name="selectedStates"
                value={selectedStates}
                onChange={handleChange}
                className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full bg-white ${
                  selectedStates
                    ? "bg-gray-100 focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1"
                    : ""
                }`}
              >
                <option value="">State</option>
                {/* {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))} */}
              </select>
            </div>
            <div>
              <input
                type="text"
                name="phoneNumber"
                className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                  phoneNumber ? "bg-gray-100" : ""
                }`}
                value={phoneNumber}
                placeholder="Phone number"
                onChange={handleChange}
              />
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
            <span className="text-xs text-link1"> Privacy Policy and Terms of Service.</span>
          </p>
        </div>
      </div>

      <BackButton buttonText={`Go back`} className={`bg-deepGrey mt-4`} onClick={handleBackClick} />
    </div>
  );
}
