import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

/**
 * Utility function that uses `tailwind-merge` to efficiently merge Tailwind classes.
 * See docs: https://github.com/dcastil/tailwind-merge/blob/v2.0.0/docs/what-is-it-for.md
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
