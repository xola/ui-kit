import React from "react";
import { createIcon } from "../helpers/icon";

export const DecreaseIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M12.916 10.375v2.25h-2.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M12.916 12.625L10.391 10.1a1.126 1.126 0 00-1.118-.282l-2.857.763a1.124 1.124 0 01-1.086-.291L2.416 7.373M3.24 5.87a3.75 3.75 0 115.926 2.257"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.666 3.627H6.65a.671.671 0 00-.25 1.294l1.032.412a.671.671 0 01-.25 1.294H6.166M6.916 3.627v-.375M6.916 7.002v-.375"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
