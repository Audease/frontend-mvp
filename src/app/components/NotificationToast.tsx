import { Toast } from "flowbite-react";
import { useState, useEffect } from "react";
import { HiCheck, HiX } from "react-icons/hi";

export default function SuccessToast({text}) {
  return (
    <div>
      <div className="inline">
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal ">
            {text}
          </div>
          <Toast.Toggle />
        </Toast>
      </div>
    </div>
  );
}

export function FailureToast({text}) {
  return (
    <div>
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{text}</div>
        <Toast.Toggle />
      </Toast>
    </div>
  );
}
