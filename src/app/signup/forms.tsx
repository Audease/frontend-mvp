'use client'
import Button from "../components/button";
import InputField, { InputFieldWithDropdown } from "../components/inputFields";



export default function Form1({ handleSubmit }) {
  return (
    <div className="text-tblack bg-white rounded-md">
      <form className="p-8" onSubmit={handleSubmit}>
        <div className="pb-4">
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
            <div className="">
              <InputFieldWithDropdown
                placeholder={`No of Employees`}
                className={`w-[10rem]`}
              />
            </div>
            <div className="">
              <InputFieldWithDropdown
                placeholder={`Country`}
                className={`w-[10rem]`}
              />
            </div>
          </div>
          <InputField
            className={`w-full`}
            type={`text`}
            placeholder={`Business No`}
          />
          <div className="flex flex-row my-4 space-x-4">
            <InputField
              className={`w-[10rem]`}
              type={`text`}
              placeholder={`First Name`}
            />
            <InputField
              className={`w-[10rem]`}
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
        <Button buttonText={`Continue`} className={`mt-10`} />
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
  );
}

export function Form2({ handleSubmit }) {
  return (
    <div>
        <div className="text-tblack bg-white rounded-md ">
      <form className="p-8" onSubmit={handleSubmit}>
        {/* Input fields  */}
        <div className="mt-4 space-y-6">
          <InputField
            className={`w-full `}
            type={`text`}
            placeholder={`Street address`}
          />
          <InputField
            className={`w-full`}
            type={`text`}
            placeholder={`Street address 2`}
          />
          <InputField className={`w-full`} type={`text`} placeholder={`City`} />
          <InputField
            className={`w-full`}
            type={`text`}
            placeholder={`Post code`}
          />
          <div>
          <InputField
            className={`w-full`}
            type={`number`}
            placeholder={`Phone number`}
          />
          <p className="fonr-normal text-xs text-tgrey1 py-1">Standard call, messaging or data rates may apply.</p>
          </div>
          
        </div>
        <Button buttonText={`Continue`} className={`mt-8`} />
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
    <Button buttonText={`Go back`} className={`bg-deepGrey mt-4`} />
    </div>
    
  );
}


export function Form3({ handleSubmit }) {
  return (
    <div className="text-tblack bg-white rounded-md ">
      <form className="p-8" onSubmit={handleSubmit}>
        <div className="pb-4">
          <h3 className="font-semibold  text-h3">How you&apos;ll sign in</h3>
          <p className="font-normal text-h2">
          You&apos;ll use your username to sign into your Audease Workspace account and create your employers account.
          </p>
        </div>
        {/* Input fields  */}
        <div className="mt-4 space-y-6">
          <InputField
            className={`w-full`}
            type={`text`}
            placeholder={`Username`}
          />
          <InputField
            className={`w-full`}
            type={`password`}
            placeholder={`Password`}
          />
          <InputField
            className={`w-full`}
            type={`password`}
            placeholder={`Confirm password`}
          />
        </div>
        <Button buttonText={`Agree and Continue`} className={`mt-10`} />
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
  );
}