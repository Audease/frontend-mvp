"use client";

export default function Button({ buttonText }) {
  const handleClick = () => {
    console.log("Button Clicked");
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="mt-4 py-2 text-white text-h2 border rounded-md bg-gold1 w-full font-semibold"
      >
        {buttonText}
      </button>
    </div>
  );
}
