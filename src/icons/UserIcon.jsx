import React from "react";
import { createIcon } from "../helpers/icon";

export const UserIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.685 2.591h0a5.371 5.371 0 005.989 1.204"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.47 7.465A3.233 3.233 0 107.47 1a3.233 3.233 0 000 6.465zM12.276 11.649a5.315 5.315 0 00-9.61 0"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
