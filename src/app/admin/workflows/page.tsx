"use client";

import { useState } from "react";
import SetUpAccount from "../roles/components/SetUpAccount";
import Staff from "../roles/components/Staff";
import Workflow from "./Workflow";
import { useRouter } from "next/navigation";

export default function Role() {
  const [currentComponent, setCurrentComponent] = useState("Default");
  const route = useRouter();

  const onBackClick = () => {
    route.push("/admin");
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "Staff":
        return <Staff onClick={onBackClick} />;
      case "SetUpAccount":
        return <SetUpAccount onClick={onBackClick} />;
      default:
        return <Workflow onClick={onBackClick} />;
    }
  };

  return (
    <div>
      {/* left side  */}
      <div className="flex flex-row space-x-12">
        <div className="w-full">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
