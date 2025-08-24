export const useLearners = () => {
  const fetchLearnersData = async (page: number, limit: number = 10, funding = '', chosen_course = '', search = '', sort = '') => {
    try {
      // Add cache-busting timestamp
      const timestamp = new Date().getTime();
      
      // Add sort parameter to the URL
      const response = await fetch(
        `/api/getAdminLearners?page=${page}&limit=${limit}&search=${search}&timestamp=${timestamp}`,
        {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
          }
        }
      );
      
      const data = await response.json();
      if (response.ok) {
        const totalPages = data.totalPages || 10;
        const totalItems = data.total;
        const allLearners = data.result;
  
        return { totalPages, totalItems, allLearners };
      } else {
        console.error("Failed to fetch learners data:", data);
        return { totalPages: 0, totalItems: 0, allLearners: [] };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return { totalPages: 0, totalItems: 0, allLearners: [] };
    }
  };

  return {
    fetchLearnersData
  }
};