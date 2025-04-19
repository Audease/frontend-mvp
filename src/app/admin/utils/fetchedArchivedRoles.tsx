export const fetchArchivedRoles = async () => {
    try {
        const response = await fetch("/api/getArchivedRoles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Failed to fetch archived roles: ", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error fetching archived roles: ", error);
        return null;
    }
}