"use client";

import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IBasketItem, IFood } from "@/types/food";

interface IBasketContext {
  basket: IBasketItem[];
  totalPrice: number;
  totalCount: number;
  addFoodToBasket: (food: IFood, count?: number) => void;
  updateFoodToBasket: (foodId: string, count: number) => void;
  deleteFoodFromBasket: (foodId: string) => void;
  clearBasket: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

export const BasketContext = createContext<IBasketContext>({
  basket: [],
  totalPrice: 0,
  totalCount: 0,
  addFoodToBasket: () => {},
  updateFoodToBasket: () => {},
  deleteFoodFromBasket: () => {},
  clearBasket: () => {},
  isDrawerOpen: false,
  setIsDrawerOpen: () => {},
});

const STORAGE_KEY = "pinecone_food_basket";

export const BasketProvider = ({ children }: PropsWithChildren) => {
  const [basket, setBasket] = useState<IBasketItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load basket from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setBasket(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to parse basket from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  // Save basket to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(basket));
    }
  }, [basket, isLoaded]);

  const addFoodToBasket = (food: IFood, count: number = 1) => {
    if (count <= 0) return;
    setBasket((prev) => {
      const index = prev.findIndex((item) => item.food._id === food._id);
      if (index > -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          count: updated[index].count + count,
        };
        return updated;
      } else {
        return [...prev, { food, count }];
      }
    });

    toast.success(`"${food.name}" амжилттай сагсанд нэмэгдлээ! 🛒`, {
      position: "top-right",
      autoClose: 2500,
    });
  };

  const updateFoodToBasket = (foodId: string, count: number) => {
    setBasket((prev) => {
      if (count <= 0) {
        return prev.filter((item) => item.food._id !== foodId);
      }
      return prev.map((item) =>
        item.food._id === foodId ? { ...item, count } : item
      );
    });
  };

  const deleteFoodFromBasket = (foodId: string) => {
    setBasket((prev) => {
      const itemToDelete = prev.find((item) => item.food._id === foodId);
      if (itemToDelete) {
        toast.info(`"${itemToDelete.food.name}" сагснаас хасагдлаа.`, {
          position: "top-right",
          autoClose: 2000,
        });
      }
      return prev.filter((item) => item.food._id !== foodId);
    });
  };

  const clearBasket = () => {
    setBasket([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const totalPrice = basket.reduce((sum, item) => {
    const unitPrice = item.food.isSale && item.food.discountPrice ? item.food.discountPrice : item.food.price;
    return sum + unitPrice * item.count;
  }, 0);

  const totalCount = basket.reduce((sum, item) => sum + item.count, 0);

  return (
    <BasketContext.Provider
      value={{
        basket,
        totalPrice,
        totalCount,
        addFoodToBasket,
        updateFoodToBasket,
        deleteFoodFromBasket,
        clearBasket,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
