import React from "react";
import { createIcon } from "../helpers/icon";

export const CompassIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.95 12.7a5.75 5.75 0 100-11.5 5.75 5.75 0 000 11.5z"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.7 5.7l3.695-1.522v0a.25.25 0 01.327.327L8.2 8.2"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.2 8.2L5.7 5.7 4.18 9.395v0a.25.25 0 00.326.327L8.2 8.2z"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
