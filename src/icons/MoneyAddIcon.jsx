import React from "react";
import { createIcon } from "../helpers/icon";

export const MoneyAddIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.03 3H3.88v-.001c-1.03 0-1.86.83-1.86 1.85 0 .7.39 1.34 1.02 1.65l1.95.97c.91.45 1.28 1.57.82 2.48-.32.62-.96 1.02-1.66 1.02H2M3.53 11v1.5M4.53 1.5V3M9.917 9.833a2.917 2.917 0 100-5.833 2.917 2.917 0 000 5.833zM9.917 5.167v3.5M8.167 6.917h3.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

MoneyAddIcon.tags = ["plus"];