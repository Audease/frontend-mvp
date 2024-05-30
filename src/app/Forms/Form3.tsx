import Button from "../components/button";
import { BackButton } from "../components/button";
import { useState } from "react";

export default function Form3({
  formData,
  setFormData,
  handleSubmit,
  handleBackClick,
  userCollege,
}) {
  const { userName, password, confirmPassword } = formData;

  const [filledCollege, setFilledCollege] = useState(userCollege);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "filledCollege") {
      setFilledCollege(value); // Update filledCollege state
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        
      }));
    }
  };

  // const handleCollegeSubmit = (e) => {
  //   e.preventDefault();
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     college: filledCollege, // Update formData with the final value of filledCollege
  //   }));
  // };

  return (
    <div>
      <div className="font-switzer text-tblack bg-white rounded-md ">
        <form className="p-8" onSubmit={handleSubmit}>
          <div className="pb-4">
            <h3 className="font-semibold  text-h3">How you&apos;ll sign in</h3>
            <p className="font-normal text-h2">
              You&apos;ll use your username to sign into your Audease Workspace
              account and create your employers account.
            </p>
          </div>
          {/* Input fields  */}
          <div className="mt-4 space-y-6">
            <div className="flex flex-row space-x-4">
              <input
                type="text"
                name="userName"
                className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                  userName ? "bg-gray-100" : ""
                }`}
                value={userName}
                placeholder="Username"
                onChange={handleChange}
              />
              <input
                type="text"
                name="filledCollege"
                className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                  filledCollege ? "bg-gray-100" : ""
                }`}
                value={filledCollege}
                placeholder=""
                onChange={handleChange}
              />
              <p className="py-2">.admin</p>
            </div>
            <input
              type="password"
              name="password"
              className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                password ? "bg-gray-100" : ""
              }`}
              value={password}
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
                confirmPassword ? "bg-gray-100" : ""
              }`}
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          </div>
          {/* agreement  */}
          <div className="font-normal py-4 text-h6 text-tgrey1">
            <label className="flex flex-row space-x-4">
              <input
                type="checkbox"
                //   checked={isChecked}
                //   onChange={handleCheckboxChange}
                className="bg-red-500"
              />
              <p>
                By clicking Create account, I agree that I have read and accepted
                the Terms of Use and Privacy Policy.
              </p>
            </label>
          </div>

          <Button buttonText={`Agree and Continue`} className={`mt-6`} />
        </form>
        <hr className="border-2 border-tgrey2 " />
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
      <BackButton buttonText={`Go back`} className={`bg-deepGrey mt-4`} onClick={handleBackClick} />
    </div>
  );
}
