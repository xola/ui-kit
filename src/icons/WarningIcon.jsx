import React from "react";
import { createIcon } from "../helpers/icon";

export const WarningIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M13.345 6.857a5.81 5.81 0 01-5.734 5.823h-.005a5.648 5.648 0 01-5.73-5.562c-.005-.026-.005-.052-.005-.073l-.005-.005a5.812 5.812 0 015.73-5.834V1.2a5.639 5.639 0 015.723 5.557v.068l.026.031zM7.616 7.5V4.357"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.611 9.042v0a.128.128 0 00-.13.124c0 .068.057.125.13.125v0a.136.136 0 00.125-.136l-.005-.005-.005-.005c-.005-.073-.063-.13-.13-.13H7.59"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
