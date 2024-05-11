"use client";

export default function Button({ buttonText, className}) {
  const handleClick = () => {
    console.log("Button Clicked");
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`${className} py-2 text-white text-h2 border rounded-md bg-gold1 w-full font-semibold`}
      >
        {buttonText}
      </button>
    </div>
  );
}


