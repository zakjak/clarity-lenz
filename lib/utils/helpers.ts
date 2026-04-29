export const formatted = (text?: string) => {
  return text?.split("\n") ?? [];
};

import moment from "moment";
import { ReplyProps } from "../types/article";

export const calculateTime = (date?: string) => {
  if (!date) return "";

  const cleanDate = date.split(".")[0];

  const now = moment();
  const then = moment.utc(cleanDate, "YYYY-MM-DD HH:mm:ss").local();

  const diff = now.diff(then);
  const duration = moment.duration(diff);

  if (duration.asSeconds() < 60)
    return `${Math.floor(duration.asSeconds())} seconds ago`;
  if (duration.asMinutes() < 60)
    return `${Math.floor(duration.asMinutes())} minutes ago`;
  if (duration.asHours() < 24)
    return `${Math.floor(duration.asHours())} hours ago`;
  if (duration.asDays() < 30)
    return `${Math.floor(duration.asDays())} days ago`;

  return then.format("D MMM YYYY");
};

export const nameFallback = (name: string) => {
  const nameArray = name?.split(" ");
  return nameArray[0]?.slice(0, 1) + nameArray[1]?.slice(0, 1);
};

export const slugify = (username: string) => {
  return username.toLowerCase().trim().replace(/\s+/g, "-");
};

// PAGINATION
export function getPaginationRange(
  current: number,
  totalPages: number,
  delta: number = 1,
) {
  const range: (number | string)[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(totalPages - 1, current + delta);

  range.push(1);

  if (left > 2) {
    range.push("...");
  } else if (left === 2) {
    range.push(2);
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) {
    range.push("...");
  } else if (right === totalPages - 1) {
    range.push(totalPages - 1);
  }

  if (totalPages > 1) {
    range.push(totalPages);
  }

  return Array.from(new Set(range));
}

export const groupByParent = (list: ReplyProps[]) => {
  const map: Record<number, ReplyProps[]> = {};
  list.forEach((reply) => {
    const pid = reply.comment.parentId;
    if (!map[pid]) map[pid] = [];
    map[pid] = [...map[pid], reply];
  });
  return map;
};

export const groupNumbers = (num: number) => {
  if (num < 1000) {
    return `${num}`;
  } else if (num < 1_000_000) {
    return `${Math.floor(num / 1000)}k`;
  } else if (num < 1_000_000_000) {
    return `${Math.floor(num / 1_000_000)}`;
  } else {
    return `${Math.floor(num / 1_000_000_000)}B`;
  }
};

export const groupTotalNumbers = (num: number) => {
  return num?.toLocaleString("en-US");
};
