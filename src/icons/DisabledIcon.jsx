import React from "react";
import { createIcon } from "../helpers/icon";

export const DisabledIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 12" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7 12A5 5 0 107 2a5 5 0 000 10zM3.465 10.535l7.07-7.07"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
