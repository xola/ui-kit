import React from "react";
import { createIcon } from "./helpers/icon";

export const ClockIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" {...props}>
            <path
                d="M7.666 1.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.666 6.214a.786.786 0 100 1.572.786.786 0 000-1.572zM7.666 6.214v-2.75M8.221 7.555l1.41 1.41"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
