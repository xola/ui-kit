import React from "react";
import { createIcon } from "../helpers/icon";

export const DurationIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M3.398 3.044C3.734 4.983 4.915 6.311 7 6.984c2.086-.673 3.266-2.001 3.602-3.94A.906.906 0 009.702 2H4.298a.906.906 0 00-.9 1.044v0zM4.299 11.969a.905.905 0 01-.9-1.044C3.733 8.987 4.914 7.66 7 6.985c2.086.674 3.266 2.002 3.602 3.94a.905.905 0 01-.9 1.044H4.298z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
