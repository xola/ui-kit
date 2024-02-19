import React from "react";
import { createIcon } from "./helpers/icon";

export const FlexFeeIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx={10.6} cy={9} r={2.4} fill="currentColor" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.336 10.419A2.39 2.39 0 009.8 9a2.39 2.39 0 00-.464-1.419C8.946 7.93 8.7 8.436 8.7 9c0 .564.246 1.07.636 1.419zm-.75.668A2.892 2.892 0 017.7 9c0-.82.34-1.56.886-2.087a2.4 2.4 0 100 4.174z"
                fill="currentColor"
            />
            <path
                d="M14.657 3.343A8 8 0 113.343 14.657 8 8 0 0114.657 3.343"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

FlexFeeIcon.tags = ["flex", "fee", "partnerfee", "partner"];
