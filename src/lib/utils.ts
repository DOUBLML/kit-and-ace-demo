import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImagePath(
  imagePath: string,
  isProduction: boolean = true
): string {
  if (isProduction) {
    return `/kit-and-ace-demo${imagePath}`;
  }
  return imagePath;
}
