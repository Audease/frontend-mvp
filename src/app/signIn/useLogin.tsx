import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios, { AxiosError } from "axios";
import {
  setUserEmail,
  setUserId,
  setUserPackage,
  setUserPermissions,
  setUserName,
  setpasswordChangeStatus
} from "../../redux/features/login/auth-slice";
import { AppDispatch } from "../../redux/store";
import { encodeId } from "../admin/learners/utils/id-encoded";

type Permission = {
  label: string;
  route: string;
};

type LoginResponse = {
  user_id: string;
  learner_id: string;
  userEmail: string;
  userName: string;
  permissions: string[];
  message?: string;
  requires_password_change: boolean;
};

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const getRedirectRoute = useCallback((permissions: string[], learner_id: string): string => {
    if (permissions.length > 3) return "/admin";

    const permissionsMap: Permission[] = [
      { label: "Add student", route: "/recruiter-dashboard" },
      { label: "Send Application", route: "/bksd-dashboard" },
      { label: "Approve/reject application", route: "/accessor-dashboard" },
      { label: "Induction", route: "/induction-dashboard" },
      { label: "Learning Platform", route: "/lazer-dashboard" },
      { label: "Audit", route: "/auditor-dashboard" },
      { label: "Certificate", route: "/certificate-dashboard" },
      { label: "Student/Learner", route: learner_id ? `/learner-dashboard/${encodeId(learner_id)}` : "/" },
    ];

    const matchedPermission = permissionsMap.find(p => permissions.includes(p.label));
    return matchedPermission?.route ?? "/";
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post<LoginResponse>("/api/login", 
        { username: email, password },
        { headers: { "Content-Type": "application/json" }}
      );

      const {  permissions, learner_id, user_id, userEmail, userName, requires_password_change } = response.data;


      dispatch(setUserEmail(userEmail));
      dispatch(setUserName(userName));
      dispatch(setUserId(learner_id));
      dispatch(setUserPackage("Free"));
      dispatch(setUserPermissions(permissions));
      dispatch(setpasswordChangeStatus(requires_password_change))

      router.push(getRedirectRoute(permissions,learner_id ));
    } catch (err) {
      const error = err as AxiosError<LoginResponse>;
      setError(error.response?.data?.message ?? "Invalid email or password");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}