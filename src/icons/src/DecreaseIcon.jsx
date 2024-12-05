import React from "react";
import { createIcon } from "./helpers/icon";

export const DecreaseIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path d="M12.25 10.375v2.25H10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M12.25 12.625L9.725 10.1a1.126 1.126 0 00-1.118-.282l-2.857.763a1.125 1.125 0 01-1.086-.291L1.75 7.373M2.574 5.87A3.75 3.75 0 118.5 8.127"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 3.627H5.983a.671.671 0 00-.25 1.294l1.032.412a.671.671 0 01-.25 1.294H5.5M6.25 3.627v-.375M6.25 7.002v-.375"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

DecreaseIcon.tags = ["money", "refund", "return payment", "dollar"];
