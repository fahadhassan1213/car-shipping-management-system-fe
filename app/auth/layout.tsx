"use client";

import { AuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext?.userIdentity?.access_token) {
      router.push("/cars");
    }
  }, [authContext]);

  return <div>{children}</div>;
};

export default AuthLayout;
