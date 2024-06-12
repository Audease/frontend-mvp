import Button, { BackButton } from "../components/button"; // Combined import statement
import { useState, useEffect } from "react";
import PasswordStrengthMeter from "../password-meter/PasswordStrengthMeter";
import Image from "next/image";

export default function Form3({
  formData,
  setFormData,
  handleSubmit,
  handleBackClick,
  userCollege,
}) {
  const { userName, password, confirmPassword } = formData;
  const [filledCollege, setFilledCollege] = useState(userCollege);
  const [isChecked, setChecked] = useState(false);
  const [isStrength, setStrength] = useState(null);
  const [isError, setError] = useState(null);
  const [passwordToggle, setPasswordToggle] = useState("password");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "filledCollege") {
      setFilledCollege(value);
      setFormData((prevData) => ({
        ...prevData,
        filledCollege: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const dataHandler = (childData) => {
    setStrength(childData);
  };

  useEffect(() => {
    if (password) {
      setError("Your password is great. Nice work!");
      let capsCount = (password.match(/[A-Z]/g) || []).length;
      let smallCount = (password.match(/[a-z]/g) || []).length;
      let numberCount = (password.match(/[0-9]/g) || []).length;
      let symbolCount = (password.match(/\W/g) || []).length;

      if (password.length < 4) {
        setError(
          "Password must be a minimum of 4 characters and include one UPPERCASE letter, one lowercase letter, one number, and one special character: @$! % * ? &"
        );
      } else if (capsCount < 1) {
        setError("Must contain one UPPERCASE letter");
      } else if (smallCount < 1) {
        setError("Must contain one lowercase letter");
      } else if (numberCount < 1) {
        setError("Must contain one number");
      } else if (symbolCount < 1) {
        setError("Must contain one special character: @$! % * ? &");
      }
    }
  }, [password]);

  const eyeClick = () => {
    setPasswordToggle((prevState) =>
      prevState === "password" ? "text" : "password"
    );
  };

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!filledCollege) {
      setFormData((prevData) => ({
        ...prevData,
        filledCollege: userCollege,
      }));
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (isStrength < 3) { // Assuming strength criteria is minimum 3
      setError("Password strength is not sufficient.");
      return;
    }

    if (!isChecked) {
      setError("You must agree to the Terms of Use and Privacy Policy.");
      return;
    }

    setError(null); // Clear any previous errors
    handleSubmit(e); // Call the original handleSubmit function
  };

  const filledCollegeValue = filledCollege === "" ? userCollege : filledCollege;

  return (
    <div>
      <div className="font-switzer text-tblack bg-white rounded-md">
        <form className="p-8" onSubmit={handleFormSubmit}>
          <div className="pb-4">
            <h3 className="font-semibold text-h3">
              Create Your Audease Account
            </h3>
            <p className="font-normal text-h2">
              Complete the form to create your Audease account.
            </p>
          </div>
          {/* Input fields */}
          <div className="mt-4 space-y-6">
            <div className="flex flex-row space-x-4">
              <input
                type="text"
                name="userName"
                className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                  userName ? "bg-gray-100" : ""
                }`}
                value={userName}
                placeholder="Username"
                onChange={handleChange}
              />
              <input
                type="text"
                name="filledCollege"
                className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                  filledCollege ? "bg-gray-100" : ""
                }`}
                value={filledCollegeValue}
                placeholder=""
                onChange={handleChange}
              />
              <p className="py-2">.admin</p>
            </div>
            {/* Password */}
            <div
              style={{ position: "relative", display: "inline-flex" }}
              className="mt-4 w-full"
            >
              <input
                type={passwordToggle}
                name="password"
                className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                  password ? "bg-gray-100" : ""
                }`}
                value={password}
                placeholder="Password"
                onChange={handleChange}
              />
              <span
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <Image
                  src="/eye.png"
                  width={12}
                  height={12}
                  className="hover:bg-gray-100"
                  alt="audease logo"
                  onClick={eyeClick}
                ></Image>
              </span>
            </div>
            <div>
              <div
                style={{ position: "relative", display: "inline-flex" }}
                className="w-full"
              >
                <input
                  type={passwordToggle}
                  name="confirmPassword"
                  className={`border rounded-md p-2 text-h2 mb-0 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-gold1 ${
                    confirmPassword ? "bg-gray-100" : ""
                  }`}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />

                <span
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <Image
                    src="/eye.png"
                    width={12}
                    height={12}
                    className="hover:bg-gray-100"
                    alt="audease logo"
                    onClick={eyeClick}
                  ></Image>
                </span>
              </div>

              <PasswordStrengthMeter
                password={password}
                actions={dataHandler}
                errorMessage={isError}
              />
            </div>
          </div>
          {/* Agreement */}
          <div className="font-normal py-4 text-h6 text-tgrey1">
            <label className="flex flex-row space-x-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="bg-white"
              />
              <p>
                By clicking Create account, I agree that I have read and
                accepted the Terms of Use and Privacy Policy.
              </p>
            </label>
          </div>

          <Button buttonText={`Agree and Continue`} className={`mt-6`} />
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
