export const useInductionLearners = () => {
  const fetchInductionLearnersData = async (
    inductor_status: string,
    page: number,
    limit: number,
    searchQuery: string
  ) => {
    try {
      const timestamp = new Date().getTime(); // Add timestamp to prevent caching
      const response = await fetch(
        `/api/induction/getInductionLearners?inductor_status=${inductor_status}&page=${page}&limit=${limit}&search=${searchQuery}&t=${timestamp}`,
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
        const totalPages = data.totalPages;
        const totalItems = data.total;
        const allLearners = data.data;

        return { totalPages, totalItems, allLearners };
      } else {
        console.error("Failed to fetch staff data:", data);
        return { totalPages: 0, totalItems: 0, allLearners: [] };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return { totalPages: 0, totalItems: 0, allLearners: [] };
    }
  };

  return {
    fetchInductionLearnersData,
  };
};