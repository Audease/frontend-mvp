import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="font-switzer flex flex-col justify-center">
      {/* Logo  */}
      <div className="py-6">
        <Link href={"/"}>
          <Image
            src="/audease_logo.png"
            width={132}
            height={37}
            className=""
            alt="audease logo"
          ></Image>
        </Link>
      </div>
      {/* Text part */}
      <div>
        {/* Text 1  */}
        <div className="my-4">
          <h3 className="font-semibold text-h1 text-tblack">Transform Your Admissions Process with Audease </h3>
          {/* <h3 className="font-semibold text-h1 text-tblack">
            30-Days Trial Now!
          </h3> */}
          <p className="font-normal text-h2 text-tblack2 py-4">
            {/* Experience why over 2 million customers choose <br /> Audease tools */}
            Join the platform trusted by colleges across the UK:
          </p>
        </div>
        {/* Text 2  */}
        <div className="my-4">
          {/* first row  */}
          <div className="flex flex-row space-x-20">
            <div>
              <Image
                src="/icon1.svg"
                width={24}
                height={24}
                className="py-2"
                alt="audease logo"
              ></Image>
              <h5 className="font-semibold text-tblack"> Secure & Reliable </h5>
              <p className="font-normal text-h2 text-tblack2">
              Protect student data with advanced security measures
                {/* No hidden charges, No credit <br />
                card required */}
              </p>
            </div>
            <div>
              <Image
                src="/icon2.svg"
                width={24}
                height={24}
                className="py-2"
                alt="audease logo"
              ></Image>
              <h5 className="font-semibold text-tblack"> Effortless Management </h5>
              <p className="font-normal text-h2 text-tblack2 ">
                {/* Get access instantly, no <br /> downloads required */}
                Streamline student admissions and auditing processes
              </p>
            </div>
          </div>
          {/* Second row  */}
          <div className="flex flex-row my-4 space-x-28">
            <div className="">
              <Image
                src="/icon3.png"
                width={24}
                height={24}
                className="py-2"
                alt="audease logo"
              ></Image>
              <h5 className="font-semibold text-tblack">Customizable Solutions</h5>
              <p className="font-normal text-h2 text-tblack2">
              Tailor features to meet your college’s unique needs
              </p>
            </div>
            <div>
              <Image
                src="/icon4.svg"
                width={24}
                height={24}
                className="py-2"
                alt="audease logo"
              ></Image>
              <h5 className="font-semibold text-tblack">
                {" "}
                Comprehensive Support{" "}
              </h5>
              <p className="font-normal text-h2 text-tblack2">
              Access detailed documentation and support whenever you need it.
              </p>
            </div>
          </div>
        </div>
        {/* Text 3  */}
        <div className="mt-8 font-normal text-tblack text-h2">
          <p>Ready to Get Started?</p>
          <p>
          Contact us at{" "}
            <span className="text-h2 text-link1">support@audeasse.co.uk</span> for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
