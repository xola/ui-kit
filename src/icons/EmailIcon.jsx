import React from "react";
import { createIcon } from "../helpers/icon";

export const EmailIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12.666 2.98h-10a.833.833 0 00-.833.833v6.666c0 .46.373.834.833.834h10c.46 0 .833-.374.833-.834V3.813a.833.833 0 00-.833-.834z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.311 3.285l-4.524 3.48a1.838 1.838 0 01-2.242 0l-4.524-3.48"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
