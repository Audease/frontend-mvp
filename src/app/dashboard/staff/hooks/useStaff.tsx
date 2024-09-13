import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { rolesRevalidation, staffRevalidation } from "../../../action";

export const useStaff = () => {
  const [staffData, setStaffData] = useState([]);
   
  
  // Pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalpages] = useState(1);
   const [totalItems, setTotalItems] = useState(1);
   
   
   const handlePageChange = (page) => {
    setCurrentPage (currentPage + 1)
   };

   const onPageIncrease = (page) => {
    setCurrentPage (currentPage + 1)
   };

   const onPageDecrease = (page) => {
    setCurrentPage (currentPage - 1)
   };
 

  const fetchData = async (page = currentPage) => {
    try {
      const response = await fetch(`/api/listStaff?page=${page}&limit=${10}`);
      const data = await response.json();
      if (response.ok) {
        setTotalpages(data.totalPages);
        setTotalItems(data.total);
        return data.result;
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

  const assignRole = async (checkedItems, staffData, selectedRole) => {
    let selectedStaff = Object.entries(checkedItems)
      .filter(([index, isChecked]) => isChecked)
      .map(([index]) => {
        const staffItem = staffData[index];
        const role = selectedRole[index];
        return { ...staffItem, role };
      });

    try {
      for (const staffItem of selectedStaff) {
        const payload = {
          staffIds: [staffItem.id],
          role: selectedRole[Object.keys(selectedRole)[0]],
        };

        const response = await axios.post("/api/assignRole", payload, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Role assigned successfully:", response.data);
      }

      alert("Role(s) assigned successfully");
      await staffRevalidation();
      await rolesRevalidation();
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  };

  return {
    fetchData,
    assignRole,
    currentPage,
    setCurrentPage,
    handlePageChange,
    totalPages,
    totalItems,
    onPageDecrease,
    onPageIncrease
  };
};
