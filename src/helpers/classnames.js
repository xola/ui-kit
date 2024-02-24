import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/**
 * Utility function to efficiently merge Tailwind CSS classes without conflicts
 * For example:
 *  twMerge('px-2 py-1 bg-red hover:bg-red-darker', 'p-3 bg-[#B91C1C]')
 *  // Will return → 'hover:bg-red-darker p-3 bg-[#B91C1C]'
 *  //                It will eliminate the extra `bg-red` `px-2` py-1` because the second arg overrides them
 */
export const cn = (...classes) => {
    return twMerge(clsx(classes));
};
