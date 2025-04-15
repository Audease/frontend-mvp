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
    let url;
    if (!search && !status) {
      url = `/api/listStaff?page=${page}&limit=${10}`;
    }

    try {
      const response = await fetch(url);
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
    // console.log(formattedStaffArray)
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
      // alert("Role(s) assigned successfully");
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
