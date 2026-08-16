import React from "react";
import { createIcon } from "./helpers/icon";

export const EyeIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.393 5.6a1.97 1.97 0 010 2.782 1.97 1.97 0 01-2.783 0 1.967 1.967 0 112.783-2.783z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.1 6.989c0-.432.1-.86.293-1.254C2.386 3.705 4.581 2.4 7.001 2.4c2.42 0 4.614 1.305 5.607 3.335.193.394.293.822.293 1.254 0 .432-.1.86-.293 1.253-.993 2.03-3.188 3.336-5.607 3.336-2.42 0-4.615-1.305-5.608-3.336a2.85 2.85 0 01-.292-1.253z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

EyeIcon.tags = ["view", "visible"];
