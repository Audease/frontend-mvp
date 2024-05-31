import React, { useEffect } from 'react';
import './PasswordStrengthMeter.css';

const PasswordStrengthMeter = ({ password, actions, errorMessage }) => {
  const createPasswordLabel = (password) => {
    let score = 0;
    const regexPositive = ["[A-Z]", "[a-z]", "[0-9]", "\\W"];
    regexPositive.forEach((regex) => {
      if (new RegExp(regex).test(password)) {
        score += 1;
      }
    });

    switch (score) {
      case 0:
        return { value: 0, info: "" };
      case 1:
        return { value: 1, info: "Weak" };
      case 2:
        return { value: 2, info: "Fair" };
      case 3:
        return { value: 3, info: "Good" };
      case 4:
        return { value: 4, info: "Strong" };
      default:
        return { value: 0, info: "" };
    }
  };

  const passwordLabel = createPasswordLabel(password);

  useEffect(() => {
    actions(passwordLabel.info);
  }, [password, actions, passwordLabel.info]);

  return (
    <div className="password-strength-meter">
      <progress
        className={`password-strength-meter-progress strength-${passwordLabel.info}`}
        value={passwordLabel.value}
        max="4"
      />
      <br />
      <h3 className="password-strength-meter-label">
        {password && (
          <div className='flex flex-row justify-between'>
            <p className={`password__label strength-${passwordLabel.info} text-xs text-tgrey1 mt-0`}>
              {errorMessage}
            </p>
            <p className='text-xs text-tgrey1'>
              {passwordLabel.info}
            </p>
          </div>
        )}
      </h3>
    </div>
  );
};

export default PasswordStrengthMeter;
