import { rolesRevalidation } from "@/app/action";

export const fetchRoles = async () => {
    rolesRevalidation()
    try {
        const response = await fetch("/api/getRoles", {
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