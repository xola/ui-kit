import React from "react";
import { createIcon } from "../helpers/icon";

export const MoneyIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M9.696 3h-2.15v-.001c-1.03 0-1.86.83-1.86 1.85 0 .7.39 1.34 1.02 1.65l1.95.97c.91.45 1.28 1.57.82 2.48-.32.62-.96 1.02-1.66 1.02h-2.15M7.196 11v1.5M8.196 1.5V3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

MoneyIcon.tags = ["dollar"];