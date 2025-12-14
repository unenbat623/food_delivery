"use client";

import instanceAxios from "@/utils/axios";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const BasketContext = createContext({} as object);

const createReq = async (url: string, foodItem: any) => {
  const token = localStorage.getItem("token");
  const { data } = (await instanceAxios.post(url, foodItem, {
    headers: { Authorization: `Bearer ${token}` },
  })) as {
    data: any;
  };
  return { basket: data.basket, message: data.message };
};

export const BasketProvider = ({ children }: PropsWithChildren) => {
  const [basket, setBasket] = useState<{} | null>(null);
  const [refetch, setRefetch] = useState<boolean>(false);

  const addFoodToBasket = async (foodItem: any) => {
    console.log("Food", foodItem);
    try {
      const { basket, message } = await createReq(
        "/basket",
        foodItem
      );
      console.log("RES", basket);
      setBasket({ ...basket });
      toast.success(message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Сагсанд нэмэхэд алдаа гарлаа");
    }
  };

  const updateFoodToBasket = async (foodItem: any) => {
    console.log("Food", foodItem);
    try {
      const { basket } = await createReq(
        "/basket",
        foodItem
      );
      console.log("RES", basket);
      setBasket({ ...basket });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Сагс шинэчлэхэд алдаа гарлаа");
    }
  };

  const deleteFoodFromBasket = async (foodId: string) => {
    console.log("Food", foodId);
    try {
      const token = localStorage.getItem("token");
      const { data } = await instanceAxios.delete(
        `/basket/${foodId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("RES", data?.basket);
      setBasket({ ...data?.basket });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Сагснаас устгахад алдаа гарлаа");
    }
  };

  const getFoodBasket = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = (await instanceAxios.get("/basket", {
        headers: { Authorization: `Bearer ${token}` },
      })) as {
        data: any;
      };
      console.log("RES", data);
      setBasket({ ...data?.basket });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Сагс татахад алдаа гарлаа");
    }
  };

  useEffect(() => {
    getFoodBasket();
  }, []);

  return (
    <BasketContext.Provider
      value={{
        basket,
        addFoodToBasket,
        updateFoodToBasket,
        deleteFoodFromBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
