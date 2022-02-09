import React from "react";
import { createIcon } from "../helpers/icon";

export const ClockAltIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.743 1.55a5.898 5.898 0 114.515 10.9 5.898 5.898 0 01-4.515-10.9"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M6.815 4.368v3.05l2.397 1.46" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});
