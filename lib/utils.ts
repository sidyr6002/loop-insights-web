import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatAmount = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
  }).format(amount / 100);
};

export const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
  });
};


