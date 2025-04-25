import axios from "axios";
import { rolesRevalidation, staffRevalidation } from "../../../action";

export interface GetStaffDataProps {
  page: number;
  search?: string;
  status?: string;
}

export const useStaff = () => {
  const fetchStaffData = async ({
    page,
    search,
    status,
  }: GetStaffDataProps) => {
    // Always construct a base URL
    let url = `/api/listStaff?page=${page}&limit=${10}`;
    
    // Add search parameter if it exists
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    
    // Add status parameter if it exists
    if (status) {
      url += `&status=${encodeURIComponent(status)}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        const totalPages = data.totalPages || 1;
        const totalItems = data.total || 0;
        const result = data.result || [];

        return { totalPages, totalItems, result };
      } else {
        console.error("Failed to fetch staff data:", data);
        // Return default values to prevent destructuring errors
        return { totalPages: 1, totalItems: 0, result: [] };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Return default values to prevent destructuring errors
      return { totalPages: 1, totalItems: 0, result: [] };
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
      
      await staffRevalidation();
      await rolesRevalidation();
      return response.data;
    } catch (error) {
      console.error("Error assigning role:", error);
      throw error;
    }
  };

  return {
    fetchStaffData,
    assignStaffRole,
  };
};