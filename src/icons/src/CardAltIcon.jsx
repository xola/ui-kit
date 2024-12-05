import React from "react";
import { createIcon } from "./helpers/icon";

export const CardAltIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M1.3 5.055h11.5M5.497 7.611H3.855M10.883 11.444H3.216A1.917 1.917 0 011.3 9.528V4.417c0-1.059.858-1.917 1.916-1.917h7.667c1.059 0 1.917.858 1.917 1.917v5.11a1.917 1.917 0 01-1.917 1.917z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

CardAltIcon.tags = ["credit card", "cc"];
