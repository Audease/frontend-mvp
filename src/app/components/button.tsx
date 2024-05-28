"use client";

export default function Button({ buttonText, className }) {
  return (
    <div>
      <button
        className={`${className} py-2 text-white text-h2 border rounded-md bg-gold1 w-full font-semibold focus:ring focus:ring-tgrey1`}
        type="submit"
      >
        {buttonText}
      </button>
    </div>
  );
}

export function BackButton({ buttonText, className, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`${className} py-2 px-6 text-white text-h2 border rounded-md bg-deepGrey w-full font-semibold flex justify-between items-center`}
      >
        <span>&larr;</span>
        <span>{buttonText}</span>
      </button>
    </div>
  );
}
