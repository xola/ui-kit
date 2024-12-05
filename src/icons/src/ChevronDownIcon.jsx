import React from "react";
import { createIcon } from "./helpers/icon";

export const ChevronDownIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path d="M12.75 4.25l-5.5 5.5-5.5-5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});

ChevronDownIcon.tags = ["arrow"];
