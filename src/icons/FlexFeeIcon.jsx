import React from "react";
import { createIcon } from "../helpers/icon";

export const FlexFeeIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M5.743 4.99l1.478-2.704a1.896 1.896 0 013.328 0l1.478 2.703c.174.319.435.58.754.754l2.702 1.478a1.896 1.896 0 010 3.328l-2.703 1.478c-.318.174-.58.436-.753.754l-1.478 2.703a1.895 1.895 0 01-3.328 0L5.743 12.78a1.896 1.896 0 00-.754-.754l-2.703-1.478a1.896 1.896 0 010-3.328L4.99 5.743c.318-.174.58-.435.754-.754z"
                stroke="currentColor"
                strokeWidth={1.371}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx={10.6} cy={9} r={2.4} fill="currentColor" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.336 10.419A2.39 2.39 0 009.8 9a2.39 2.39 0 00-.464-1.419C8.946 7.93 8.7 8.436 8.7 9c0 .564.246 1.07.636 1.419zm-.75.668A2.892 2.892 0 017.7 9c0-.82.34-1.56.886-2.087a2.4 2.4 0 100 4.174z"
                fill="currentColor"
            />
        </svg>
    );
});
