"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

export interface UserType {
  _id: string;
  name: string;
  email: string;
  otp: string;
  role: string;
  avatarUrl: string;
  isVerified: boolean;
  address: { khoroo: string; duureg: string; buildingNo: number };
  createdAt: Date;
}

interface IAuthProps {
  user: UserType | null;
  token: string | null;
  setAuthUserAndToken: (user: UserType, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthProps>({
  user: null,
  token: null,
  setAuthUserAndToken: (user: UserType, token: string): void => {},
  logout: (): void => {},
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const authUser = () => {
    if (localStorage.getItem("auth-user")) {
      console.log("O", JSON.parse(localStorage.getItem("auth-user")!));
      setUser(() => JSON.parse(localStorage.getItem("auth-user")!));
      setToken(() => localStorage.getItem("auth-token"));
    }
  };

  useEffect(() => {
    if (!user) {
      authUser();
    }
  }, []);

  const setAuthUserAndToken = (user: UserType, token: string) => {
    localStorage.setItem("auth-token", token);
    localStorage.setItem("auth-user", JSON.stringify(user));
    setUser(user);
    setToken(token);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, setAuthUserAndToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
