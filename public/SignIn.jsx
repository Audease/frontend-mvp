import { Button } from 'flowbite-react';
import { Link } from "react-router-dom";

function SignIn() {

  return (

    <div className="font-switzer bg-bg-pink  m-8 h-full lg:h-screen lg:w-full lg:m-auto lg:items-center lg:flex lg:justify-center">
      <div className='flex flex-col items-center lg:flex lg:flex-row lg:items-center lg:justify-center lg:space-x-10 p-8'>
        <div className='lg:max-h-80 lg:max-w-64 lg:m-10'>
          {/* audease logo */}
          <div className="flex flex-row justify-center pt-4 md:py-8">
            <Link to="/"><img src="/audease_logo.png" alt="audease logo" /></Link>
          </div>

          {/* Welcome section  */}
          <div className="flex flex-col items-center text-center p-2 md:max-w-72">
            <h6 className="text-thead text-welcomeColor font-semibold py-2 lg:text-4xl">Welcome back to Audease</h6>
            <p className="font-normal text-tsmall p-2 text-welcomeTextColor lg:text-base">We are lorem ipsum team dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          </div>
        </div>

        {/* Form  */}
        <div className="bg-bg-white rounded-lg mb-2 my-2 mx-10 p-4  md:max-w-72 lg:max-w-72	lg:m-10 xl:max-w-sm lg:px-10">
          <div>
            <h1 className="text-base font-semibold">Sign in</h1>
            <p className="text-tdm font-normal pt-2 ">Don’t have an account? <span className="font-semibold">Sign Up</span></p>
          </div>
          <div className="my-4">
            <input type="email" className="border-2 border-borderColor border-solid rounded-lg text-tdm p-2  my-4 w-full" placeholder="Email address" />

            <div style={{ position: 'relative', display: 'inline-flex' }} className='mt-4 w-full'>
              <input type="password" className="border-2 border-borderColor border-solid rounded-lg text-tdm p-2 w-full" placeholder="Password" />
              <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}> <img src="/eye.png" alt="" /> </span>
            </div>
          </div>

          <p className='text-tdm text-pforget font-normal my-8'>Forgot password?</p>

          {/* Submit button  */}
          <Button className='bg-buttonBg border-none w-full font-semibold text-center text-bg-white text-tdm text-[#FFFFFF]'>Sign In</Button>

          {/* Separator  */}
          <div className="flex items-center py-4">
            <div className="border-t border-borderColor flex-grow"></div>
            <div className="mx-2 text-footerColor text-breaksm">or</div>
            <div className="border-t border-borderColor flex-grow"></div>
          </div>

          {/* Social links  */}
          <div className='flex flex-row justify-evenly md:justify-evenly'>
            <Button className='border-2 border-borderColor text-tdm font-semibold'> <img src="/google-logo.svg" alt="google logo" className='pr-2' /> Google</Button>
            <Button className='border-2 border-borderColor text-tdm font-semibold'> <img src="/fb-logo.svg" alt="facebook logo" className='pr-2' />Facebook</Button>
          </div>

          {/* Line break  */}
          <div className='py-4'>
            <hr className="text-borderColor h-2" />
          </div>

          {/* Footer copywright */}
          <div >
            <h6 className='font-inter font-normal text-tem text-footerColor'>Protected by reCAPTCHA and subject to the Rhombus <span className='text-pforget'>Privacy Policy</span> and <span className='text-pforget'>Terms of Service.</span></h6>
          </div>

        </div>

      </div>
    </div>

  )
}

export default SignIn
