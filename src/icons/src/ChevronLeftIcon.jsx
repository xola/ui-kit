import React from "react";
import { createIcon } from "./helpers/icon";

export const ChevronLeftIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path d="M9 12.5L3.5 7 9 1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});

ChevronLeftIcon.tags = ["arrow"];
