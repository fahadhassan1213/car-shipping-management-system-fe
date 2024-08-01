"use client";

import { FC, ReactElement, useContext, useState, useEffect } from "react";

import Navigate from "@/components/shared/navigate";
import { AuthContext } from "@/lib/context/AuthContext";

interface RequireAuthProps {
  children: ReactElement | null;
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the authContext is initialized
    if (typeof authContext?.userIdentity?.access_token !== "undefined") {
      setIsLoading(false);
    }
  }, [authContext]);

  if (isLoading) {
    // Render a fallback or loading component
    return <></>;
  }

  if (authContext?.userIdentity?.access_token) {
    return children;
  }

  return <Navigate to="/auth/user/login" />;
};

export default RequireAuth;
