import React from "react";
import { createIcon } from "./helpers/icon";

export const DropdownIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path d="M8.358 6.66L7 8.02 5.643 6.66" fill="currentColor" />
            <path
                d="M8.358 6.66L7 8.02 5.643 6.66h2.715z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.444 1.5H4.556A3.056 3.056 0 001.5 4.556v4.888A3.056 3.056 0 004.556 12.5h4.888A3.056 3.056 0 0012.5 9.444V4.556A3.056 3.056 0 009.444 1.5z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

DropdownIcon.tags = ["dropdown", "forms", "questionnaire"];
