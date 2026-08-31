"use client";

import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import instanceAxios from "@/utils/axios";
import { ICategory, IFood } from "@/types/food";
import { MOCK_CATEGORIES, MOCK_FOODS } from "./mockFoods";

interface IFoodContext {
  foods: IFood[];
  categories: ICategory[];
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
  selectedFoodForModal: IFood | null;
  isModalOpen: boolean;
  openFoodModal: (food: IFood) => void;
  closeFoodModal: () => void;
  getFoods: () => Promise<void>;
}

export const FoodContext = createContext<IFoodContext>({
  foods: MOCK_FOODS,
  categories: MOCK_CATEGORIES,
  selectedCategory: "cat_all",
  setSelectedCategory: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  isLoading: false,
  selectedFoodForModal: null,
  isModalOpen: false,
  openFoodModal: () => {},
  closeFoodModal: () => {},
  getFoods: async () => {},
});

export const FoodProvider = ({ children }: PropsWithChildren) => {
  const [foods, setFoods] = useState<IFood[]>(MOCK_FOODS);
  const [categories, setCategories] = useState<ICategory[]>(MOCK_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>("cat_all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFoodForModal, setSelectedFoodForModal] = useState<IFood | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openFoodModal = (food: IFood) => {
    setSelectedFoodForModal(food);
    setIsModalOpen(true);
  };

  const closeFoodModal = () => {
    setIsModalOpen(false);
    setSelectedFoodForModal(null);
  };

  const getFoods = async () => {
    setIsLoading(true);
    try {
      const { data } = await instanceAxios.get("/foods");
      if (data && data.foods && Array.isArray(data.foods) && data.foods.length > 0) {
        // Map backend foods if available
        const mappedFoods: IFood[] = data.foods.map((item: any) => ({
          _id: item._id,
          name: item.name,
          price: item.price || 0,
          discountPrice: item.discountPrice || (item.isSale ? item.price * 0.8 : undefined),
          isSale: item.isSale || false,
          discountPercent: item.discountPercent || (item.isSale ? 20 : undefined),
          description: item.description || "",
          ingredients: item.ingredients || item.ingredient || "Үхрийн мах, ногоо, амтлагч",
          image: item.image && item.image !== "no-food-photo" ? item.image : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
          category: typeof item.category === "object" ? item.category?._id : item.category,
          rating: 4.8,
        }));
        setFoods(mappedFoods);
      }
    } catch (error) {
      // Gracefully fallback to rich mock data
      console.log("Using internal food catalogue.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <FoodContext.Provider
      value={{
        foods,
        categories,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isLoading,
        selectedFoodForModal,
        isModalOpen,
        openFoodModal,
        closeFoodModal,
        getFoods,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => useContext(FoodContext);
