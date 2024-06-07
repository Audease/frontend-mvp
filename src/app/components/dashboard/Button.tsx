"use client";

export default function Button({ buttonText, className }) {
  return (
    <div>
      <button
        className={`${className} p-2 rounded-md bg-dashboardButtonsBg font-semibold focus:ring focus:ring-tgrey1`}
        type="submit"
      >
        <span className="font-inter font-medium text-sm text-dashboardButtons">{buttonText}</span>
        <span className="text-dashboardButtons pl-10 pr-2"> &gt; </span>
      </button>
    </div>
  );
}