/**
 * Wrapper for fetch that automatically handles 401 responses
 * Triggers logout when refresh token fails
 */
export const fetchWithAuth = async (
  url: string,
  options?: RequestInit
): Promise<Response> => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  // If we get a 401, check if it's due to refresh token failure
  if (response.status === 401) {
    try {
      // Try to check/refresh session
      const sessionCheck = await fetch("/api/auth/check-session", {
        method: "GET",
        credentials: "include",
      });

      if (!sessionCheck.ok) {
        // Session is invalid, trigger logout
        window.location.href = "/signIn";
      }
    } catch (error) {
      console.error("Error checking session after 401:", error);
    }
  }

  return response;
};
