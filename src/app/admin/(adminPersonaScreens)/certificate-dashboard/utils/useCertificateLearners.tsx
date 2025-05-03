export const useCertificateLearners = () => {
  const fetchCertificateLearnersData = async (
    page: number,
    searchValue: string,
    certificateStatus: string
  ) => {
    const baseUrl = '/api/Certificate/getCertificateLearners';
    const params = new URLSearchParams({
      page: page.toString(),
      limit: '10'
    });
    if (searchValue) {
      params.append('search', searchValue);
    }
    if (certificateStatus) {
      params.append('certificate_status', certificateStatus);
    }

    const url = `${baseUrl}?${params.toString()}`;
    try {
      const response = await fetch(url);
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
    fetchCertificateLearnersData,
  };
};
