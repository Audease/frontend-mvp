import { rolesRevalidation } from "@/app/action";

export const fetchRoles = async (sort = "") => {
    rolesRevalidation()
    try {
        const queryParam = sort ? `?sort=${sort}` : "";
        const response = await fetch(`/api/getRoles${queryParam}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Failed to fetch roles: ", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error fetching roles: ", error);
        return null;
    }
}