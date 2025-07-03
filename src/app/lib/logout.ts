import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/login/auth-slice";
import { persistor } from "@/redux/store";

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        await persistor.purge();
        localStorage.removeItem("persist:root");
        localStorage.removeItem("lastActiveAt");
        localStorage.removeItem("pageHiddenAt");

        dispatch(logOut());
        router.push("/signIn");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return handleLogout;
};
