"use client";
import React, {
  ChangeEvent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext } from "../UserProvider/index";
import axios from "axios";

interface IBasket {
  food: {
    name: string;
    _id: string;
    description: string;
    price: number;
  };
  count: number;
}

interface IBasketContext {
  loading: boolean;
  baskets: IBasket[];
  addBasket: (food: any, count: number) => Promise<void>;
  deleteBasket: (food: any) => Promise<void>;
}

export const BasketContext = createContext({} as IBasketContext);

const BasketProvider = ({ children }: PropsWithChildren) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [baskets, setBaskets] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getBaskets = async () => {
    try {
      if (user) {
        const {
          data: { basket },
        } = await axios.get("/basket/", {
          headers: { Authorization: `Bearer ${user}` },
        });
        setBaskets(basket.foods);
      }
    } catch (error: any) {
      alert("Error" + error.message);
    }
  };

  const addBasket = async (food: any, count: number) => {
    try {
      setLoading(true);
      if (user) {
        const {
          data: { basket },
        } = await axios.put("/basket", {
          userId: user,
          foodId: food._id,
          count: count,
        });
        setLoading(false);
        setRefresh(!refresh);
      }
    } catch (error: any) {
      alert("Error" + error.message);
    }
  };

  const deleteBasket = async (value: any) => {
    try {
      setLoading(true);

      if (user) {
        const {
          data: { basket },
        } = await axios.delete("/basket/" + value, {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });
        setLoading(false);
        setRefresh(!refresh);
      }
    } catch (error: any) {
      alert("Error" + error.message);
    }
  };

  useEffect(() => {
    getBaskets();
  }, [refresh, user]);

  return (
    <BasketContext.Provider
      value={{ loading, baskets, addBasket, deleteBasket }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;
