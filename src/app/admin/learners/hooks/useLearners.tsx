import { useEffect, useState } from "react";

export const useLearners = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [allLearners, setAllLearners] = useState([]);


  const onPageIncrease = (page) => {
    setCurrentPage (currentPage + 1)
   };

   const onPageDecrease = (page) => {
    setCurrentPage (currentPage - 1)
   };

  const fetchData = async (page = currentPage) => {
    try {
      const response = await fetch(`/api/getLearners?page=${page}&limit=${10}`);
      const data = await response.json();
      if (response.ok) {
        // console.log(data.result)
        setAllLearners(data.result)
      } else {
        console.error("Failed to fetch staff data:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);


  return {
    onPageDecrease,
    onPageIncrease,
    allLearners,
  }
};
