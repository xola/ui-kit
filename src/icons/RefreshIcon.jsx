import React from "react";
import { createIcon } from "../helpers/icon";

export const RefreshIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.377 4.083a4.813 4.813 0 00-8.523 3.061v1.314M4.166 10.446a4.813 4.813 0 008.313-3.302V6.27"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.104 6.707l1.75 1.75 1.75-1.75M14.229 8.02l-1.75-1.75-1.75 1.75"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
