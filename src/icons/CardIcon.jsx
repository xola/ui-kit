import React from "react";
import { createIcon } from "../helpers/icon";

export const CardIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.5 3H2a1 1 0 00-1 1v6a1 1 0 001 1h9.5a1 1 0 001-1V4a1 1 0 00-1-1z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path fill="currentColor" d="M1.232 4.532h11.234v1.532H1.232z" />
        </svg>
    );
});


CardIcon.tags = ["credit card", "cc"];