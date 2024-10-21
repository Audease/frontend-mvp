import { useState, useEffect } from 'react';
import { GetPersonaStaff } from './action';


export const usePersonaStaff = (personaPermission = "Send Application") => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStaffList = async () => {
    setLoading(true);
    try {
      let success = await GetPersonaStaff({ personaPermission });
      setStaffList(success);
    } catch (err) {
      setError(err.message || "Failed to fetch staff list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStaffList();
  }, [personaPermission]);  
  return {
    staffList,
    loading,
    error,
    refetch: getStaffList  
  };
};
