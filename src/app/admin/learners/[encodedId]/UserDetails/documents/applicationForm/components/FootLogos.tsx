import Image from "next/image";
import * as React from "react";

export interface FootLogosProps {}

const logos = [
  {
    src: "/enrolmentForm/Logos/pearson.png",
    alt: "Pearson logo",
  },
  {
    src: "/enrolmentForm/Logos/ED & Skills.png",
    alt: "Education and skills logo",
  },
  {
    src: "/enrolmentForm/Logos/vtct.png",
    alt: "vtct logo",
  },
  {
    src: "/enrolmentForm/Logos/investorsInPeople.png",
    alt: "Investors in People",
  },
  {
    src: "/enrolmentForm/Logos/training_and_qualifications.png",
    alt: "training and qualifications",
  },
  {
    src: "/enrolmentForm/Logos/eu_logo.png",
    alt: "eu logo",
  },
  {
    src: "/enrolmentForm/Logos/ncfe.png",
    alt: "NCFE logo",
  },
  {
    src: "/enrolmentForm/Logos/matrix.png",
    alt: "Matrix logo",
  },
];

export default function FootLogos(props: FootLogosProps) {
  return (
    <div className="flex flex-wrap justify-center space-x-4 py-4">
      {logos.map((d, index) => (
        <div key={index} className="flex-shrink-0 m-2">
          <Image
            src={d.src}
            alt={d.alt}
            width={100}
            height={20}
            quality={100}
            layout="intrinsic"
          />
        </div>
      ))}
    </div>
  );
}