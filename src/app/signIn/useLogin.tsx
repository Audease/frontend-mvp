
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserEmail, setUserPackage, setUserPermissions } from "../../redux/features/login/auth-slice";
import { AppDispatch } from "../../redux/store";


export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    const permissionsMap = [
      {
        label: "Add student",
        route: "/recruiter-dashboard"
      },
      {
        label: "Send Application",
        route: "bksd-dashboard"
      },
      {
        label: "Approve/reject application",
        route: "/accessor-dashboard"
      },
      {
        label: "Induction",
        route: "/induction-dashboard"
      },
      {
        label: "Learning Platform",
        route: "/lazer-dashboard"
      },
      {
        label: "Learning Platform",
        route: "/lazer-dashboard"
      },{
        label: "Audit",
        route: "/auditor-dashboard"
      },
      {
        label: "Certificate",
        route: "/certificate-dashboard"
      },
    ]

    if (permissions.length > 3) {
      return router.push('/dashboard')
    } else {
      for (const permission of permissionsMap) {
        if (permissions.includes(permission.label))
          return router.push(permission.route)
      }
    }
  }, [permissions, router])

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const payload = {
      username: email,
      password: password,
    };

    try {
      const response = await axios.post("/api/login", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log(response.data)
        setPermissions(response.data.permissions)

        dispatch(setUserEmail(email));
        dispatch(setUserPackage("Free"));
        dispatch(setUserPermissions("Admin"));
        
      } else {
        console.error("Login failed:", response.data);
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Invalid email or password");
      setLoading(false);
    } finally {
      setLoading(false); 
    }
  };

  return { handleLogin, loading, error };
}
