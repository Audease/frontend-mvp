import { Spinner } from "flowbite-react";

export default function LoadingSpinner() {
  return (
    <div className="relative inset-0 flex items-center justify-center bg-white bg-opacity-75">
      <Spinner aria-label="Loading..." size="xl" color="warning" />
    </div>
  );
}

export function LoadingSpinner2() {
  return (
    <div className="absolute bg-white bg-opacity-75 flex justify-center items-center">
      <Spinner aria-label="Loading..." size="xl" color="warning" />
    </div>
  );
}
