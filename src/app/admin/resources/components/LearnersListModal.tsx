"use client";
import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import LearnerModalTable from "./LearnerModalTable";
import { SearchComponent } from "@/app/components/dashboard/SearchBox";
import Button from "@/app/components/button";
import FilterLearner from "../../(adminPersonaScreens)/recruiter-dashboard/components/Filter";
import { useLearnerByRecruiter } from "../../(adminPersonaScreens)/recruiter-dashboard/utils/useLearnerByRecruiter";
import Pagination from "@/app/components/dashboard/Pagination";
import { PlainButton } from "@/app/components/dashboard/Button";

type Props = {
  show: boolean;
  onClose: () => void;
  checkedItems: { [key: number]: boolean };
  handleCheckboxChange: (id: number, checked: boolean) => void;
  learnersSelected: boolean;
  onAddDocClick: () => void;
  actionResponse: string;
};

const LearnersListModal = ({
  show,
  onClose,
  checkedItems,
  handleCheckboxChange,
  learnersSelected,
  onAddDocClick,
  actionResponse,
}: Props) => {
  const {
    handlePageChange,
    allLearners,
    currentPage,
    totalPages,
    totalItems,
    loading,
    handleFetchLearnersData,
  } = useLearnerByRecruiter();

  useEffect(() => {
    handleFetchLearnersData(1, 8, "", "", "", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFilterClick = (funding, course) => {
    handleFetchLearnersData(1, 8, funding, course, '', "");
  };

  const handleSearch = (searchValue: string) => {
    handleFetchLearnersData(1, 8, '', '', searchValue, "");
  };

  const resetLearners = () => {
    handleFetchLearnersData(1, 8, "", "", "", "");
  };

  return (
    <Modal show={show} onClose={onClose} className="modal" size="2xl">
      <div className="flex flex-col space-y-2 mx-4 max-h-[80vh] overflow-hidden">
        <div className="grid grid-cols-3 items-center py-2">
          <div></div>
          <h3 className="text-center font-medium text-2xl">Learners</h3>
          <div className="justify-self-end">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <IoMdClose />
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row space-x-2 items-center">
          <PlainButton text={"All"} onClick={resetLearners} ></PlainButton>
          <div
            className={`${learnersSelected ? "w-full md:w-[75%]" : "w-full"}`}
          >
            <SearchComponent searchValue={handleSearch} />
          </div>
          <div
            className={`cursor-pointer ${
              learnersSelected
                ? "block w-[90%] mx-2 md:mx-0 md:w-[25%]"
                : "hidden"
            }`}
          >
            <Button
              buttonText="Add Document"
              className="py-1 text-sm"
              buttonClick={onAddDocClick}
            />
          </div>
          <div className="flex flex-row justify-center items-center space-x-4">
            <FilterLearner onFilterClick={onFilterClick} />
          </div>
        </div>

        {actionResponse === "201" ? (
          <p className="text-center text-sm text-green-500">
            Documents assigned successfully!
          </p>
        ) : actionResponse ? (
          <p className="text-center text-sm text-red-500">
            An error occurred, try again!
          </p>
        ) : null}

        <div className="flex-grow overflow-y-auto">
          <LearnerModalTable
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
            allLearners={allLearners}
            loading={loading}
          />
        </div>

        <div className="py-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={10}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Modal>
  );
};

export default LearnersListModal;
