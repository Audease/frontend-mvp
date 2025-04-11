export const useInductionLearners = () => {
  const fetchInductionLearnersData = async (
    inductor_status: string,
    page: number,
    limit: number,
    searchQuery: string
  ) => {
    try {
      const response = await fetch(
        `/api/induction/getInductionLearners?inductor_status=${inductor_status}&page=${page}&limit=${limit}&search=${searchQuery}`
      );
      const data = await response.json();
      if (response.ok) {
        const totalPages = 12;
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
    fetchInductionLearnersData,
  };
};
