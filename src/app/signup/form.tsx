import Button from "../components/button";
import InputField, { InputFieldWithDropdown } from "../components/inputFields";

export default function Form() {
  return (
    <div className="text-tblack bg-white rounded-md ">
      <form className="p-8">
        <div className="py-2">
          <h3 className="font-semibold  text-h3">Sign Up</h3>
          <p className="font-normal text-h2">
            Already have an account?{" "}
            <span className="text-h2 text-link1">Sign In</span>
          </p>
        </div>
        {/* Input fields  */}
        <div className="mt-4">
          <InputField
            className={`w-full`}
            type={`text`}
            placeholder={`College`}
          />
          <div className="flex flex-row my-4 space-x-4">
            <InputFieldWithDropdown
              placeholder={`No of Employees`}
              className={``}
            />
            <InputFieldWithDropdown placeholder={`Country`} className={``} />
          </div>
          <InputField
            className={`w-full`}
            type={`text`}
            placeholder={`Business No`}
          />
          <div className="flex flex-row my-4 space-x-4">
            <InputField
              className={``}
              type={`text`}
              placeholder={`First Name`}
            />
            <InputField
              className={``}
              type={`text`}
              placeholder={`Last Name`}
            />
          </div>
          <InputField
            className={`w-full`}
            type={`email`}
            placeholder={`Email`}
          />
        </div>
        <Button buttonText={`Continue`} />
      </form>
      <hr className="border-2 border-tgrey2 my-4" />
      <div className="pb-4 px-4">
        <p className="font-normal text-h4 text-tgrey1">
          Protected by reCAPTCHA and subject to the Rhombus{" "}
          <span className="text-h4 text-link1">
            {" "}
            Privacy Policy and Terms of Service.
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
