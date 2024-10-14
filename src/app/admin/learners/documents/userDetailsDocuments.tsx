import { useState } from "react";
import DocDefault from "./docDefault";
import DocView from "./docView";

export default function UserDetailsDocuments() {
  const [renderComponent, setRenderComponent] = useState<"default" | "view">("default");

  // Switch back to DocDefault
  const onBackClick = () => {
    setRenderComponent("default");
  };

  // Switch to DocView
  const onViewClick = () => {
    setRenderComponent("view");
  };

  return (
    <div className="">
      {renderComponent === "default" ? (
        <DocDefault onViewClick={onViewClick} />
      ) : (
        <DocView onBackClick={onBackClick} />
      )}
    </div>
  );
}
