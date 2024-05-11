import Image from "next/image";

export default function SignUp() {
  return (
    <div className="flex flex-col justify-center">
      {/* Logo  */}
      <div className="py-6">
        <Image
          src="/audease_logo.png"
          width={132}
          height={37}
          className=""
          alt="audease logo"
        ></Image>
      </div>
      {/* Text part */}
      <div>
        {/* Text 1  */}
        <div className="my-4">
          <h3 className="font-semibold text-h1 text-tblack">Get Your FREE </h3>
          <h3 className="font-semibold text-h1 text-tblack">
            30-Days Trial Now!
          </h3>
          <p className="font-normal text-h2 text-tblack2 py-4">
            Experience why over 2 million customers choose <br /> Audease tools
          </p>
        </div>
        {/* Text 2  */}
        <div className="my-4">
          {/* first row  */}
          <div className="flex flex-row space-x-16">
            <div>
              <Image
                src="/icon1.svg"
                width={24}
                height={24}
                className="py-2"
                alt="audease logo"
              ></Image>
              <h5 className="font-semibold text-tblack">Very affordable </h5>
              <p className="font-normal text-h2 text-tblack2">
                No hidden charges, No credit <br />
                card required
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
              <h5 className="font-semibold text-tblack"> Fast & Easy </h5>
              <p className="font-normal text-h2 text-tblack2 ">
                Get access instantly, no <br /> downloads required
              </p>
            </div>
          </div>
          {/* Second row  */}
          <div className="flex flex-row my-4 space-x-2">
            <div className="">
              <Image
                src="/icon3.png"
                width={24}
                height={24}
                className="py-2"
                alt="audease logo"
              ></Image>
              <h5 className="font-semibold text-tblack">Your Own Data</h5>
              <p className="font-normal text-h2 text-tblack2">
                Enjoy the Free Trial with your company data
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
                Unlimited Features{" "}
              </h5>
              <p className="font-normal text-h2 text-tblack2">
                Access all features all at once.
              </p>
            </div>
          </div>
          
        </div>
        {/* Text 3  */}
        <div className="mt-8 font-normal text-tblack text-h2">
          <p>Do you prefer talking to a representative?</p>
          <p>
            Call us at{" "}
            <span className="text-h2 text-link1">support@audeasse.co.uk</span>
          </p>
        </div>
      </div>
    </div>
  );
}
