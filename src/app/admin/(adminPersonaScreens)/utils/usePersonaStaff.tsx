import { useState, useEffect } from 'react';
import { GetPersonaStaff } from './action';

export const usePersonaStaff = (personaPermission = "Send Application") => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStaffList = async () => {
    setLoading(true);
    setError(null);
    try {
      const success = await GetPersonaStaff({ personaPermission });
      // Ensure staffList is always an array
      if (Array.isArray(success)) {
        setStaffList(success);
      } else {
        console.error("Invalid staff list format:", success);
        setStaffList([]);
        setError("Invalid response format from server");
      }
    } catch (err) {
      console.error("Error fetching staff:", err);
      setStaffList([]);
      setError(err?.message || "Failed to fetch staff list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaffList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personaPermission]);  
  
  return {
    staffList,
    loading,
    error,
    refetch: getStaffList  
  };
};