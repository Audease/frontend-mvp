export interface lazerLearner {
  lazer_status?: string;
  page: number;
  searchQuery?: string;
}

export const useLazerLearners = () => {
  const fetchLazerLearnersData = async ({lazer_status, page, searchQuery}: lazerLearner) => {
    let url;

    if (!lazer_status && searchQuery) {
      url = `/api/Lazer/getLazerLearner?page=${page}&limit=${10}&search=${searchQuery}`;
    }
    if (lazer_status && !searchQuery) {
      url = `/api/Lazer/getLazerLearner?lazer_status=${lazer_status}&page=${page}&limit=${10}`;
    }
    // if (lazer_status !== "" && searchQuery !== "") {
    //   url = `/api/Lazer/getLazerLearner?lazer_status=${lazer_status}&page=${page}&limit=${10}&search=${searchQuery}`;
    // }
    if (!lazer_status && !searchQuery) {
      url = `/api/Lazer/getLazerLearner?page=${page}&limit=${10}`;
    }

    try {
      const response = await fetch(
        url,
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
    fetchLazerLearnersData,
  };
};
