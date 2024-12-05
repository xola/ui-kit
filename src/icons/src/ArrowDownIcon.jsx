import React from "react";
import { createIcon } from "./helpers/icon";

export const ArrowDownIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M11.286 8.714L7 13 2.715 8.714M6.998 13V1"
                stroke="currentColor"
                strokeWidth={0.912}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
