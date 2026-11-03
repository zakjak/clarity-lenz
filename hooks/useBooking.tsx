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

export type DateProp = {
  expiredAt: string | undefined;
};

type DateAction = {
  changeDate: (expiredAt: DateProp["expiredAt"]) => void;
};

export const useDateStore = create<DateProp & DateAction>((set) => ({
  expiredAt: "",
  changeDate: (expiredAt) =>
    set(() => ({
      expiredAt: expiredAt,
    })),
}));

export type TimeProp = {
  time: string;
};

type TimeAction = {
  changeTime: (time: TimeProp["time"]) => void;
};

export const useSelectTimeStore = create<TimeProp & TimeAction>((set) => ({
  time: "",
  changeTime: (time) => set(() => ({ time: time })),
}));

export type TimezoneProp = {
  date: string;
  time: string;
  timezone: string;
};

type TimezoneAction = {
  addAll: (date: TimezoneProp["date"], time: TimezoneProp["time"]) => void;
};

export const useTimezoneStore = create<TimezoneProp & TimezoneAction>(
  (set) => ({
    date: "",
    time: "",
    timezone: "",
    addAll: (date, time) => set(() => ({ timezone: `${time} ${date} ` })),
  }),
);
