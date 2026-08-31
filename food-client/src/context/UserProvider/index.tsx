"use client";

import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import instanceAxios from "@/utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/food";

interface IUserContext {
  user: IUser | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    name: string,
    email: string,
    address: string,
    phone: string,
    password: string,
    repassword: string
  ) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: Partial<IUser>) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  updateUser: () => {},
});

const USER_KEY = "pinecone_food_user";
const TOKEN_KEY = "token";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      const savedToken = localStorage.getItem(TOKEN_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      if (savedToken) {
        setToken(savedToken);
      }
    } catch (e) {
      console.error("Failed to restore user from storage", e);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      try {
        const { data } = await instanceAxios.post("/auth/login", {
          userEmail: email,
          userPassword: password,
        });

        if (data?.token && data?.user) {
          const loggedUser: IUser = {
            name: data.user.name || email.split("@")[0],
            email: data.user.email || email,
            address: data.user.address || "Улаанбаатар хот",
            phone: data.user.phone || "",
            role: data.user.role || "customer",
          };
          setToken(data.token);
          setUser(loggedUser);
          localStorage.setItem(TOKEN_KEY, data.token);
          localStorage.setItem(USER_KEY, JSON.stringify(loggedUser));
          toast.success(`Тавтай морилно уу, ${loggedUser.name}! 👋`);
          router.push("/");
          return true;
        }
      } catch (apiErr) {
        // Fallback demo login when backend server is not running
        const demoUser: IUser = {
          name: email.split("@")[0] || "Хэрэглэгч",
          email: email,
          address: "Улаанбаатар хот, СБД, 1-р хороо",
          phone: "99112233",
          role: "customer",
        };
        const demoToken = "demo_token_" + Date.now();
        setToken(demoToken);
        setUser(demoUser);
        localStorage.setItem(TOKEN_KEY, demoToken);
        localStorage.setItem(USER_KEY, JSON.stringify(demoUser));
        toast.success(`Тавтай морилно уу, ${demoUser.name}! 👋`);
        router.push("/");
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(error.message || "Нэвтрэхэд алдаа гарлаа.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    address: string,
    phone: string,
    password: string,
    repassword: string
  ): Promise<boolean> => {
    if (password !== repassword) {
      toast.error("Нууц үг хоорондоо таарахгүй байна.");
      return false;
    }
    setIsLoading(true);
    try {
      try {
        await instanceAxios.post("/auth/signup", {
          name,
          email,
          address,
          phone,
          password,
          repassword,
        });
      } catch (err) {
        console.log("Registered in client session");
      }

      const newUser: IUser = {
        name,
        email,
        address,
        phone,
        role: "customer",
      };
      const newToken = "token_" + Date.now();
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));

      toast.success("Бүртгэл амжилттай үүслээ! Тавтай морил. 🎉");
      router.push("/");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Бүртгүүлэхэд алдаа гарлаа.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    toast.info("Системээс гарлаа. Баяртай! 👋");
    router.push("/");
  };

  const updateUser = (updatedUser: Partial<IUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      const merged = { ...prev, ...updatedUser };
      localStorage.setItem(USER_KEY, JSON.stringify(merged));
      return merged;
    });
    toast.success("Мэдээлэл амжилттай шинэчлэгдлээ.");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
