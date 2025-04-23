import { useState, useEffect, useCallback } from "react";
import { useLearners } from "../../../learners/hooks/useLearners";

interface ChangedValue {
  userId: string;
  changed: {
    [key: string]: any;
  };
}

type ChangedValuesState = {
  [id: string]: ChangedValue;
};

export const useLearnerByRecruiter = () => {
  const [allLearners, setallLearners] = useState([]);
  const [originalLearners, setOriginalLearners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalpages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [loading, setLoading] = useState(false);
  const { fetchLearnersData } = useLearners();
  const [changedValues, setChangedValues] = useState<ChangedValuesState>({});

  // Fetch learners data
  const handleFetchLearnersData = async (page: number, limit, funding, course, search, sort ) => {
    setLoading(true);
    try {
      const { totalPages, totalItems, allLearners } = await fetchLearnersData(
        page, 10, funding, course, search, sort
      );
      setTotalpages(totalPages);
      setTotalItems(totalItems);
      setallLearners(allLearners);
      setOriginalLearners(allLearners);
    } catch (error) {
      console.error("Error fetching learners data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchLearnersData(currentPage, 10, '', '', '', 'asc'); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle input changes and track modified values
const handleInputChange = (id: string, field: string, value: any) => {
  setallLearners((prevAllLearners) =>
    prevAllLearners.map((learner) =>
      learner.id === id ? { ...learner, [field]: value } : learner
    )
  );

  setChangedValues((prevChangedValues) => ({
    ...prevChangedValues,
    [id]: {
      userId: id,
      changed: {
        ...prevChangedValues[id]?.changed, 
        [field]: value,
      },
    },
  }));
};


  useEffect(() => {
    if (Object.keys(changedValues).length > 0) {
      Object.values(changedValues).forEach((value) => {});
    }
  }, [changedValues]);

  // Revert all changes to the original state
  const handleRevertChanges = () => {
    setallLearners(originalLearners);
    setChangedValues({});
  };

  return {
    allLearners,
    currentPage,
    totalPages,
    totalItems,
    loading,
    changedValues,
    setChangedValues,
    handlePageChange,
    handleRevertChanges,
    handleInputChange,
    handleFetchLearnersData,
  };
};
