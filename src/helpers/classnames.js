import { twMerge } from 'tailwind-merge/dist/es5/bundle-cjs.js';
import clsx from "clsx";

/**
 * Utility function that uses `tailwind-merge` to efficiently merge Tailwind classes.
 * See docs: https://github.com/dcastil/tailwind-merge/blob/v2.0.0/docs/what-is-it-for.md
 */
export default function cn(...inputs) {
    return twMerge(clsx(inputs));
}
