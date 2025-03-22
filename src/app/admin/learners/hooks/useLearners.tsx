
export const useLearners = () => {

  const fetchLearnersData = async (page: number, limit: number = 10, funding = '', chosen_course = '', search = '') => {
   
      try {
        const response = await fetch(`/api/getLearnersB?funding=${funding}&chosen_course=${chosen_course}&search=${search}&page=${page}&limit=${limit}`);
        const data = await response.json();
        if (response.ok) {
          const totalPages = 10;
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
    fetchLearnersData
  }
};
