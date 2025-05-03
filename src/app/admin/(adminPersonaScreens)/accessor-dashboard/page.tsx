'use client'

import { useState } from "react";
import Accessor from "./accessorScreen";
import AccessorApproval from "./accessorApproval";

export default function AccessorDashboard({showHeader=true}) {
  const [view, setView] = useState("dashboard");
  const [selectedLearner, setSelectedLearner] = useState(null);

  const handleViewChange = (learner) => {
    setSelectedLearner(learner);
    setView("approval");
  };

  const handleBackToDashboard = () => {
    setView("dashboard");
  };

  return (
    <div className="">
      {view === "dashboard" ? (
        <Accessor onViewChange={handleViewChange} {...{showHeader}} />
      ) : (
        <AccessorApproval learner={selectedLearner} onBack={handleBackToDashboard} />
      )}
    </div>
  );
}
