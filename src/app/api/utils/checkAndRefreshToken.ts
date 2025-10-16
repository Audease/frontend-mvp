import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const TokenManager = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch(`${baseUrl}/v1/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        cookies().set({
          name: "accessToken",
          value: data.token,
          secure:
            process.env.NODE_ENV === "production" ||
            (process.env.NODE_ENV as string) === "staging",
          httpOnly: true,
          maxAge: data.expires,
          path: "/",
          sameSite: "strict",
        });
        return { success: true, token: data.token };
      } else {
        console.error("Error refreshing token:", response.statusText);
        cookies().delete("accessToken");
        cookies().delete("refreshToken");
        return { success: false, token: null };
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      cookies().delete("accessToken");
      cookies().delete("refreshToken");
      return { success: false, token: null };
    }
  };

  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTimeSeconds = decoded.exp - currentTime;

    if (remainingTimeSeconds < 300) {
      const result = await refreshAccessToken(refreshToken);
      return result.token;
    }
    return accessToken;
  }
  return null;
};
