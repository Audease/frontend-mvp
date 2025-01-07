export default function convertDate(dateString: string) {
    const convertedDate = new Date(dateString);
  
    if (isNaN(convertedDate.getTime())) {
      throw new Error("Invalid date");
    }
  
    const newDate = convertedDate.toLocaleDateString();
    const newTime = convertedDate.toLocaleTimeString();
  
    return {
      newDate,
      newTime
    };
  }