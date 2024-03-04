"use client";

import axios from "axios";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const FoodContext = createContext({} as object);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const createReq = async (url: string, foodItem: any) => {
  const { data } = (await axios.post(url, foodItem, {
    headers: { Authorization: `Bearer ${token}` },
  })) as {
    data: any;
  };
  return { basket: data.basket, message: data.message };
};

export const FoodProvider = ({ children }: PropsWithChildren) => {
  const [foods, setBasket] = useState<{} | null>(null);
  const [refetch, setRefetch] = useState<boolean>(false);

  const getFoods = async () => {
    try {
      const { data } = (await axios.get("http://localhost:8080/foods", {
        headers: { Authorization: `Bearer ${token}` },
      })) as {
        data: any;
      };
      console.log("FOOD-RES", data);
      setBasket(data?.foods);
      //   toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        error.message = error.response.data.message;
      }
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <FoodContext.Provider
      value={{
        foods,
        getFoods,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
