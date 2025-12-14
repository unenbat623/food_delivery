"use client";

import { PropsWithChildren, createContext, useState } from "react";
import instanceAxios from "@/utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Add IOrder interface
export interface IOrder {
  _id: string;
  createdAt: string;
  totalAmount: number;
  payment?: {
    paymentAmount: number;
    paymentStatus: string;
  };
}

interface IUser {
  name: string;
  email: string;
  address: string;
  password?: string;
  orders?: IOrder[];
}

interface IUserContext {
  user: IUser;
  login: (name: string, password: string) => void;
  signup: (
    name: string,
    email: string,
    address: string,
    password: string,
    repassword: string
  ) => void;
}

export const UserContext = createContext<IUserContext>({
  user: {
    name: "",
    email: "",
    address: "",
  },
  login: () => { },
  signup: () => { },
});

export const UserProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const login = async (email: string, password: string) => {
    console.log("LOGIN", email);
    try {
      const {
        data: { user, token },
      } = (await instanceAxios.post("/auth/login", {
        userEmail: email,
        userPassword: password,
      })) as {
        data: { user: IUser; token: string };
      };

      localStorage.setItem("token", token);
      setUser(user);
      router.push("/");
      // console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Нэвтрэхэд алдаа гарлаа.");
    }
  };

  const signup = async (
    email: string,
    password: string,
    address: string,
    name: string,
    repassword: string
  ) => {
    console.log("signup", email, password, address, name);
    try {
      const data = await instanceAxios.post("/auth/signup", {
        name: name,
        email: email,
        address: address,
        password: password,
        repassword: repassword,
      });
      router.push("/");
      console.log(data);
    } catch (error) {
      toast.error("Email илгэээхэд алдаа гарлаа.");
    }
  };
  return (
    <UserContext.Provider value={{ user, login, signup }}>
      {children}
    </UserContext.Provider>
  );
};
