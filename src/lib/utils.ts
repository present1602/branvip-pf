import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildTexts(first?: string | null, second?: string | null) {
  if (!first && !second) return "";
  if (second && !first) return second;
  if (first && !second) return first;
  return `${first}, ${second}`;
}

export const serviceMap = {
  ALL: "올인원 서비스",
  DESIGN: "로고 디자인",
  APPLICATION: "상표출원",
};
