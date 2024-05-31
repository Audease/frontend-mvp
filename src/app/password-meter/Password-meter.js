import React, { useState } from "react";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const PasswordMeter = () => {
  const [userInfo, setuserInfo] = useState({
    password: "",
  });

  const [isError, setError] = useState(null);
  const handleChangePassword = (e) => {
    let password = e.target.value;
    setuserInfo({
      ...userInfo,
      password: e.target.value,
    });
    setError(null);
    let capsCount, smallCount, numberCount, symbolCount;
    if (password.length < 4) {
      setError(
        "Password must be minimum 4 characters include one UPPERCASE, lowercase, number and special character: @$! % * ? &"
      );
      return;
    } else {
      capsCount = (password.match(/[A-Z]/g) || []).length;
      smallCount = (password.match(/[a-z]/g) || []).length;
      numberCount = (password.match(/[0-9]/g) || []).length;
      symbolCount = (password.match(/\W/g) || []).length;
      if (capsCount < 1) {
        setError("Must contain one UPPERCASE letter");
        return;
      } else if (smallCount < 1) {
        setError("Must contain one lowercase letter");
        return;
      } else if (numberCount < 1) {
        setError("Must contain one number");
        return;
      } else if (symbolCount < 1) {
        setError("Must contain one special character: @$! % * ? &");
        return;
      }
    }
  };

  const [isStrength, setStrength] = useState(null);
  const dataHandler = async (childData) => {
    setStrength(childData);
  };

  return (
    <div className="App">
      <label htmlFor="password">
        {isError !== null && <p className="errors mt-0"> - {isError}</p>}
      </label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleChangePassword}
        className={`border rounded-md p-2 text-h2 text-tgrey1 font-normal w-full focus:border-tgrey2 focus:outline-none focus:ring focus:ring-tgrey1 ${
          password ? "bg-gray-100" : ""
        }`}
        required
      />
      <PasswordStrengthMeter
        password={userInfo.password}
        actions={dataHandler}
      />
    </div>
  );
};
export default PasswordMeter;
