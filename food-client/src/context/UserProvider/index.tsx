"use client";

import { PropsWithChildren, createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface IUser {
  name: string;
  email: string;
  address: string;
  password?: string;
}

interface IUserContext {
  user: IUser;
  login: (name: string, password: string) => void;
}

export const UserContext = createContext<IUserContext>({
  user: {
    name: "",
    email: "",
    address: "",
  },
  login: () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
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
        email: email,
        password: password,
      });
      console.log(data);
    } catch (error) {
      toast.error("Email илгэээхэд алдаа гарлаа.");
    }
  };

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
};
