import React from "react";
import { createIcon } from "../helpers/icon";

export const UserAddIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M10.583 12.833a2.917 2.917 0 100-5.833 2.917 2.917 0 000 5.833zM10.583 8.167v3.5M8.833 9.917h3.5M1.833 9.333c0-.578.138-1.148.4-1.658.263-.51.642-.943 1.105-1.262a3.224 3.224 0 013.162-.3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.333 5.833a2.333 2.333 0 100-4.666 2.333 2.333 0 000 4.666z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
