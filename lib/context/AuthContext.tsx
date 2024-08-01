"use client";

import React, { createContext, useState, useEffect, useMemo } from "react";
import { LoginPayload, UserIdentity, UserRole } from "../types/common";
import gatewayService from "../services/GatewayService";
import { useRouter } from "next/navigation";

type AuthContextType = {
  userIdentity: UserIdentity | null;
  userRole: UserRole;
  login: (loginInfo: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [userIdentity, setUserIdentity] = useState<UserIdentity | null>(null);

  const userRole = useMemo(() => {
    return userIdentity?.user?.roles[0].role.name as UserRole;
  }, [userIdentity]);

  useEffect(() => {
    const storedUserIdentity = localStorage.getItem("userIdentity");
    if (storedUserIdentity) {
      setUserIdentity(JSON.parse(storedUserIdentity));
    }
  }, []);

  useEffect(() => {
    if (!userIdentity?.access_token) {
      router.push("/auth/user/login");
    }
  }, [userIdentity]);

  const login = async (loginInfo: LoginPayload) => {
    const identity = await gatewayService.login(loginInfo);
    setUserIdentity(identity);
    localStorage.setItem("userIdentity", JSON.stringify(identity));
  };

  const logout = async () => {
    // TODO: implement logout
    // await gatewayService.logout();
    setUserIdentity(null);
    localStorage.removeItem("userIdentity");
  };

  return (
    <AuthContext.Provider value={{ userIdentity, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
