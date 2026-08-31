export interface ICategory {
  _id: string;
  name: string;
  image?: string;
  description?: string;
}

export interface IFood {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  isSale?: boolean;
  discountPercent?: number;
  description: string;
  ingredients: string;
  image: string;
  category?: string | ICategory;
  rating?: number;
  portion?: string;
  prepTime?: string;
  createdAt?: string;
}

export interface IBasketItem {
  food: IFood;
  count: number;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  role?: string;
  avatar?: string;
}

export interface IOrder {
  _id: string;
  orderNumber?: string;
  items: IBasketItem[];
  totalAmount: number;
  deliveryFee: number;
  district: string;
  khoroo: string;
  addressDetail: string;
  phone: string;
  paymentMethod: "cash" | "card" | "qpay";
  paymentStatus: "paid" | "pending";
  orderStatus: "Бэлтгэгдэж буй" | "Хүргэлтэнд гарсан" | "Хүргэгдсэн" | "Цуцлагдсан";
  createdAt: string;
  notes?: string;
}
