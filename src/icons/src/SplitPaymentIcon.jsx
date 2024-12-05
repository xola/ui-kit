import React from "react";
import { createIcon } from "./helpers/icon";

export const SplitPaymentIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M10.5 7.5L8.746 9.003A5 5 0 007 12.8v.125"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.5 7.5l1.754 1.503A5 5 0 017 12.8v.125M2.9 9V7M5 7H3M11.1 9V7M9 7h2M6.906 1.625V1M7.843 1.625H6.568a.839.839 0 00-.843.837.84.84 0 00.525.775l1.29.513-.007-.006a.834.834 0 01.463 1.087.852.852 0 01-.781.525H5.937M6.906 6v-.625"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
