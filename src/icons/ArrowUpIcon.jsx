import React from "react";
import { createIcon } from "../helpers/icon";

export const ArrowUpIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.715 5.286L7 1l4.285 4.286M7.003 1v12"
                stroke="currentColor"
                strokeWidth={0.912}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
