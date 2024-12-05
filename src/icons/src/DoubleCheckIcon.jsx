import React from "react";
import { createIcon } from "./helpers/icon";

export const DoubleCheckIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={19} height={14} fill="none" {...props}>
            <path
                d="M12.166 3.5l-7.333 7.333L1.5 7.5M18.167 3.5l-7.333 7.333-1.667-1.666"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

DoubleCheckIcon.tags = ["doublecheck", "forms", "questionnaire"];
