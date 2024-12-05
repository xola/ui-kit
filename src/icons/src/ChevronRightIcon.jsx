import React from "react";
import { createIcon } from "./helpers/icon";

export const ChevronRightIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path d="M4.5 1.5L10 7l-5.5 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});

ChevronRightIcon.tags = ["arrow"];
