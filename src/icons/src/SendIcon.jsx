import React from "react";
import { createIcon } from "./helpers/icon";

export const SendIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M1.682 6.815a.707.707 0 01-.032-1.35l9.549-3.114a.358.358 0 01.451.448l-3.112 9.55a.707.707 0 01-1.352-.032L6.118 7.879 1.682 6.815zM11.563 2.437L6.117 7.879"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

SendIcon.tags = ["message", "email"];
