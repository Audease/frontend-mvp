import { useState } from "react";
import DocDefault from "./docDefault";
import DocView from "./DocView";

export default function UserDetailsDocuments({ userId }) {
  const [renderComponent, setRenderComponent] = useState<"default" | "view">(
    "default"
  );

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
        <DocDefault onViewClick={onViewClick} userId={userId} />
      ) : (
        <DocView onBackClick={onBackClick} userId={userId} />
      )}
    </div>
  );
}
