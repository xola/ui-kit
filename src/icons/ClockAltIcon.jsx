import React from "react";
import { createIcon } from "../helpers/icon";

export const ClockAltIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.541 12.25a5.375 5.375 0 100-10.75 5.375 5.375 0 000 10.75z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.541 4.304v2.571l2.805 2.57"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
