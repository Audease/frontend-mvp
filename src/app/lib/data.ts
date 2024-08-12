import axios from "axios";

export async function fetchDropdownOptions() {
  try {
    const response = await axios.get("/api/roleDropdownOptions");
    if (response.status === 200) {
      console.log(response);
      return response.data; // Return the data if needed
    } else {
      console.error(
        "Failed to fetch dropdown options:",
        response.data.message
      );
    }
  } catch (error) {
    console.error("Error fetching dropdown options:", error);
  }
}
