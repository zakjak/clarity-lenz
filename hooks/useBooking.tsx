import React from "react";
import { create } from "zustand";

export type Services = {
  id?: number;
  title: string;
  description: string;
  price: number | null;
  icon: React.ReactNode;
  color: string;
  duration: number | null;
};

type Action = {
  changeServices: (
    title: Services["title"],
    description: Services["description"],
    price: Services["price"],
    icon: Services["icon"],
    color: Services["color"],
    duration: Services["duration"],
  ) => void;
};

export const useBookingStore = create<Services & Action>((set) => ({
  title: "",
  description: "",
  price: null,
  color: "",
  icon: "",
  duration: null,
  changeServices: (title, description, price, icon, color, duration) =>
    set(() => ({
      title: title,
      description: description,
      price: price,
      icon: icon,
      color: color,
      duration: duration,
    })),
}));
