import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { rolesRevalidation, staffRevalidation } from "../../../action";

export const useStaff = () => {
  const fetchStaffData = async (page: number) => {
    try {
      const response = await fetch(`/api/listStaff?page=${page}&limit=${10}`);
      const data = await response.json();
      if (response.ok) {
        const totalPages = data.totalPages;
        const totalItems = data.total;
        const result = data.result;

        return { totalPages, totalItems, result };
      } else {
        console.error("Failed to fetch staff data:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const assignStaffRole = async (checkedItems, selectedRoles) => {
    const staffArray = [...Object.values(checkedItems)];
    const formattedStaffArray = staffArray.map((staff: any) => {
      return {
        staffId: staff.id,
        roleId: selectedRoles[staff.id],
      };
    });
    
    try {
      const response = await axios.post(
        "/api/assignRole",
        {
          assignments: formattedStaffArray,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Role(s) assigned successfully");
      await staffRevalidation();
      await rolesRevalidation();
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  };

  return {
    fetchStaffData,
    assignStaffRole,
  };
};
