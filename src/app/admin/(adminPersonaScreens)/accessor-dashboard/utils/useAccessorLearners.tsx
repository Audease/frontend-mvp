export const useAccessorLearners = () => {
    const fetchAccessorLearnersData = async (page: number) => {
      try {
        const response = await fetch(
          `/api/getAccessorLearner?page=${page}&limit=${10}`
        );
        const data = await response.json();
        if (response.ok) {
          const totalPages = data.lastPage;
          const totalItems = data.total;
          const allLearners = data.data;
  
          return { totalPages, totalItems, allLearners };
        } else {
          console.error("Failed to fetch staff data:", data);
        }
      } catch (error) {     
        console.error("Error fetching data:", error);
      }
    };
  
    return {
      fetchAccessorLearnersData,
    };
  };
  