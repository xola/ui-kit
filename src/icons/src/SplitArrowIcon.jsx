import React from "react";
import { createIcon } from "./helpers/icon";

export const SplitArrowIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.25 5.0625L13.5 2.8125L15.75 5.0625"
                stroke="currentColor"
                strokeWidth={1.29}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.25 5.0625L4.5 2.8125L6.75 5.0625"
                stroke="currentColor"
                strokeWidth={1.29}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 16.3125L9 12.9375L13.5 8.4375L13.5 2.8125"
                stroke="currentColor"
                strokeWidth={1.29}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 12.9375L4.5 8.4375L4.5 2.8125"
                stroke="currentColor"
                strokeWidth={1.29}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
