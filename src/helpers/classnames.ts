import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
