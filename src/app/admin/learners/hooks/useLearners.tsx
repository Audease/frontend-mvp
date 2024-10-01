
export const useLearners = () => {

  const fetchLearnersData = async (page: number) => {
    try {
      const response = await fetch(`/api/getLearners?page=${page}&limit=${10}`);
      const data = await response.json();
      if (response.ok) {
        const totalPages = data.totalPages;
        const totalItems = data.total;
        const allLearners = data.result;

        return { totalPages, totalItems, allLearners };
      } else {
        console.error("Failed to fetch staff data:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    fetchLearnersData
  }
};
