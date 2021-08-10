import React from "react";
import { createIcon } from "../helpers/icon";

export const LockIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                clipRule="evenodd"
                d="M11.441 6.536v0a.905.905 0 00-.9-.911h-5.85 0c-.497 0-.9.408-.9.91v4.554h0c0 .503.403.911.9.911h5.85v0c.497 0 .9-.408.9-.91V6.535zM5.066 4.138h0c0-1.291 1.142-2.338 2.55-2.338s2.55 1.047 2.55 2.338v1.487h-5.1V4.138z"
                stroke="currentColor"
                strokeWidth={1.02}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
