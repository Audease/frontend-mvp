import { logOut } from "@/redux/features/login/auth-slice";
import { persistor } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // console.log("Logging out...");
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        await persistor.purge();
        localStorage.removeItem("persist:root");

        dispatch(logOut());

        router.push("/signIn");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return handleLogout();
};

export default Logout;