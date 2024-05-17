import Image from "next/image";
import Link from "next/link";
import Button from "../components/button";

export default function SignIn() {
  return (
    <div className="font-switzer bg-bgDefault p-6  h-full lg:h-screen lg:w-full lg:m-auto lg:items-center lg:flex lg:justify-center">
      <div className="flex flex-col items-center p-8 lg:flex lg:flex-row lg:space-x-12">
        <div className="lg:max-h-80 lg:max-w-80 lg:m-10">
          {/* audease logo */}
          <div className="flex flex-row justify-center pt-4 md:py-8 lg:justify-start">
            <Link href="/">
              <Image
                src="/audease_logo.png"
                width={132}
                height={37}
                className=""
                alt="audease logo"
              ></Image>
            </Link>
          </div>

          {/* Welcome section  */}
          <div className="flex flex-col items-center text-center p-2 md:max-w-72 lg:text-left lg:p-0">
            <h6 className="text-deepGrey text-h3 font-semibold py-2 lg:text-h1">
              Welcome back to Audease
            </h6>
            <p className="font-normal text-h4 text-tblack2 py-2 lg:text-h2 ">
              We are lorem ipsum team dolor sit amet, cons adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div>
          {/* Form  */}
          <form className="text-tblack bg-white rounded-md mb-2 my-2 mx-10 p-4 md:max-w-72 lg:max-w-72	lg:m-10 xl:max-w-80 lg:px-10">
            <div>
              <h1 className="text-base font-semibold">Sign in</h1>
              <p className="text-h5 font-normal pt-2 ">
                Don’t have an account?
                <span className="font-semibold">Sign Up</span>
              </p>
            </div>
            <div className="my-4 text-h5 font-normal">
              <input
                type="email"
                className="border-2 border-borderColor border-solid rounded-lg p-2  my-4 w-full"
                placeholder="Email address"
              />

              <div
                style={{ position: "relative", display: "inline-flex" }}
                className="mt-4 w-full"
              >
                <input
                  type="password"
                  className="border-2 border-borderColor border-solid rounded-lg p-2 w-full"
                  placeholder="Password"
                />
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <Image
                    src="/eye.png"
                    width={12}
                    height={12}
                    className=""
                    alt="audease logo"
                  ></Image>
                </span>
              </div>
            </div>
                
            <div className="text-h5 text-link1 font-normal my-4">
            <Link
              href={"/forgotPassword"}
              
            >
              Forgot password?
            </Link>
            </div>
           

            {/* Submit button  */}
            <Button buttonText={"Sign In"} className={""} />

            {/* Separator  */}
            <div className="flex items-center py-4">
              <div className="border-t border-borderColor flex-grow"></div>
              <div className="mx-2 text-base text-tgrey1">or</div>
              <div className="border-t border-borderColor flex-grow"></div>
            </div>

            {/* Social links  */}
            <div className="flex flex-row justify-between md:justify-evenly md:space-x-8 ">
              <button className="border-2 rounded-lg p-2 text-h5 font-semibold flex flex-row items-center justify-center md:px-6 lg:w-full">
                <Image
                  src="/google-logo.svg"
                  width={12}
                  height={12}
                  className=""
                  alt="audease logo"
                ></Image>
                <p className="pl-2">Google</p>
              </button>

              <button className="border-2 rounded-lg p-2 text-h5 font-semibold flex flex-row md:px-6 lg:hidden">
                <Image
                  src="/fb-logo.svg"
                  width={12}
                  height={12}
                  className=""
                  alt="audease logo"
                ></Image>
                <p className="pl-2">Facebook</p>
              </button>
            </div>

            {/* Line break  */}
            <div className="py-4">
              <hr className="text-borderColor h-2" />
            </div>

            {/* Footer copywright */}
            <div>
              <h6 className="font-inter font-normal text-tgrey1 text-h6">
                Protected by reCAPTCHA and subject to the Rhombus{" "}
                <span className="text-link1">Privacy Policy</span> and{" "}
                <span className="text-link1">Terms of Service.</span>
              </h6>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
