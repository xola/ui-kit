import React from "react";
import { createIcon } from "../helpers/icon";

export const ArrowRightIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.714 2.714L13 7l-4.286 4.286M13 7.003H1"
                stroke="currentColor"
                strokeWidth={0.912}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
