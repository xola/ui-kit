import React from "react";
import { createIcon } from "../helpers/icon";

export const DownloadIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.666 1.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.745 8.245l1.912 1.915 1.912-1.915M7.666 10V4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
