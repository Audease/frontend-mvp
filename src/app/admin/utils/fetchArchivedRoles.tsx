// src/app/utils/fetchArchivedRoles.tsx
export const fetchArchivedRoles = async (forceRefresh = false) => {
    try {
        const url = "/api/getArchivedRoles";
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // Add cache control headers to prevent caching
            ...(forceRefresh ? { cache: "no-store" as RequestCache } : {})
        };

        const response = await fetch(url, options);

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