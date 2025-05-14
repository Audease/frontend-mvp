"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { logOut } from "@/redux/features/login/auth-slice";
import { useDispatch } from "react-redux";

const NoAccess = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLoginClick = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.status === 200) {
        localStorage.removeItem("persist:root");
        dispatch(logOut());
        router.push("/signIn");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Access Denied
          </CardTitle>
          <CardDescription className="text-gray-500 mt-2">
            You don&apos;t have permission to access this page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            Please contact your administrator to request access to this
            resource.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={handleLoginClick}
              className="bg-primary hover:bg-primary/90"
            >
              Return to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoAccess;
