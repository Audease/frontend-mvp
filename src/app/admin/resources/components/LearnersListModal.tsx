import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import FilterDropdown from "./FilterLearners";
import LearnerModalTable from "./LearnerModalTable";
import { useLearners } from "../../learners/hooks/useLearners";

type Props = {
  show: boolean;
  onClose: () => void;
};

const LearnersListModal = ({ show, onClose }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    console.log("Selected option:", option);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };


   const [allLearners, setallLearners] = useState([]);
    const [originalLearners, setOriginalLearners] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLearnersData = async (page: number) => {
        try {
          const response = await fetch(`/api/getLearners?page=${page}&limit=${8}`);
          const data = await response.json();
          if (response.ok) {
            setTotalPages(data.totalPages);
            setTotalItems(data.total);
            setallLearners(data.result);
    
            return { totalPages, totalItems, allLearners };
          } else {
            console.error("Failed to fetch staff data:", data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    

  useEffect(() => {
    fetchLearnersData(currentPage)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <Modal show={show} onClose={onClose} className="modal" size="2xl">
      <div className="flex flex-col space-y-4 mx-4">
        <div className="grid grid-cols-3 items-center py-4">
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

        <div className="flex  flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-center">
          <div className="flex flex-row space-x-4">
            <p className="text-sm text-tgrey3">
              Showing {(currentPage - 1) * 10 + 1}-
              {Math.min(currentPage * 10, 1000)} of {totalItems} learners
            </p>
          </div>

          <div className="flex flex-row justify-center items-center space-x-4">
            <p className="text-sm text-tgrey3">Sort by:</p>
            <FilterDropdown
              options={["Funding", "Course", "Awarding"]}
              onSelect={handleSelect}
            />
          </div>

          <div className="flex flex-row space-x-4">
            <button
              className={`text-sm ${
                currentPage === 1
                  ? "text-gray-400"
                  : "text-tgrey3 hover:text-gray-700"
              }`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              Previous
            </button>
            <button
              className={`text-sm ${
                currentPage === totalPages
                  ? "text-gray-400"
                  : "text-tgrey3 hover:text-gray-700"
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <LearnerModalTable
            checkedItems={() => console.log("checked items")}
            handleCheckboxChange={undefined}
            isEditing={undefined}
            loading={undefined}
            allLearners={ allLearners }
            handleInputChange={undefined}
          />
        </div>
      </div>
    </Modal>
  );
};

export default LearnersListModal;
