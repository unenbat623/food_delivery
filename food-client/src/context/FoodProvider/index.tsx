"use client";

import instanceAxios from "@/utils/axios";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const FoodContext = createContext({} as object);

const createReq = async (url: string, foodItem: any) => {
  const token = localStorage.getItem("token");
  const { data } = (await instanceAxios.post(url, foodItem, {
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
      const token = localStorage.getItem("token");
      const { data } = (await instanceAxios.get("/foods", {
        headers: { Authorization: `Bearer ${token}` },
      })) as {
        data: any;
      };
      console.log("FOOD-RES", data);
      setBasket(data?.foods);
      //   toast.success(data.message);
    } catch (error: any) {
      console.log(error);
      if (error.response?.data?.message) {
        error.message = error.response.data.message;
      }
      toast.error(error.message || "Хоол татахад алдаа гарлаа");
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
