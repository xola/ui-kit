import React from "react";
import { createIcon } from "../helpers/icon";

export const SendIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.348 6.815a.707.707 0 01-.033-1.35l9.55-3.114a.358.358 0 01.45.448L9.205 12.35a.707.707 0 01-1.352-.033L6.783 7.879 2.348 6.815zM12.228 2.437L6.783 7.879"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
