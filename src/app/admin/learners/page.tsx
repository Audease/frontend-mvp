"use client";

import { useEffect, useState } from "react";
import LearnersDefault from "./components/LearnersDefault/learnersDefault";
import UserDetails from "./components/UserDetails/userDetails";
import { useLearners } from "./hooks/useLearners";
import DocView from "./components/documents/DocView";

export default function Learners() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentLearnersComponent, setCurrentLearnersComponent] =
    useState("LearnersDefault");
  const [allLearners, setallLearners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalpages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [loading, setLoading] = useState(true);

  const showUserDetailsPage = (e, userId) => {
    e.preventDefault();
    setSelectedUserId(userId);
    setCurrentLearnersComponent("UserDetails");
    console.log("User details shown for user ID:", userId);
  };

  const onBackClick = () => {
    setCurrentLearnersComponent("LearnersDefault");
    setSelectedUserId(null);
  };

  const { fetchLearnersData } = useLearners();

  const handleFetchLearnersData = async (page) => {
    setLoading(true);
    const { totalPages, totalItems, allLearners } = await fetchLearnersData(
      page
    );
    setTotalpages(totalPages);
    setTotalItems(totalItems);
    setallLearners(allLearners);
    setLoading(false);
  };

  useEffect(() => {
    handleFetchLearnersData(currentPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    handleFetchLearnersData(page);
  };

  return (
    <div className="font-inter">
      {currentLearnersComponent === "LearnersDefault" && (
        <LearnersDefault
          {...{
            showUserDetailsPage,
            allLearners,
            currentPage,
            totalPages,
            totalItems,
            loading,
            handlePageChange,
          }}
        />
      )}
      {currentLearnersComponent === "UserDetails" && selectedUserId && (
        <UserDetails
          userId={allLearners.find((user) => user.id === selectedUserId)}
          onBackClick={onBackClick}
        />
      )}
    </div>
  );
}
