import React from "react";
import { createIcon } from "./helpers/icon";

export const CircleDollarIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.001 3.067v.983M11.172 2.828a5.9 5.9 0 11-8.343 8.344 5.9 5.9 0 018.343-8.344M7.001 10.934V9.95"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.034 8.478c0 .815.66 1.475 1.475 1.475h1.077a1.381 1.381 0 00.337-2.72L6.079 6.77a1.38 1.38 0 01.336-2.721h1.078c.814 0 1.475.66 1.475 1.475"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

CircleDollarIcon.tags = ["money", "currency"];
