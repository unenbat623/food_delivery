"use client";

import { PropsWithChildren, createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IUser {
  name: string;
  email: string;
  address: string;
  password?: string;
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
  login: () => {},
  signup: () => {},
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
    console.log("LOGIN", email, password);
    try {
      const data = await axios.post("http://localhost:8080/auth/login", {
        Email: email,
        Password: password,
      });
      router.push("/");
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Email илгэээхэд алдаа гарлаа.");
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
      const data = await axios.post("http://localhost:8080/auth/signup", {
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
