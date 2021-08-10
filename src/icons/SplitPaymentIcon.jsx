import React from "react";
import { createIcon } from "../helpers/icon";

export const SplitPaymentIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.166 7.5L9.412 9.003A5 5 0 007.666 12.8v.125"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.166 7.5L5.92 9.003A5 5 0 017.666 12.8v.125M3.566 9V7M5.666 7h-2M11.766 9V7M9.666 7h2M7.573 1.625V1M8.51 1.625H7.235a.839.839 0 00-.844.837.84.84 0 00.525.775l1.29.513-.006-.006a.834.834 0 01.462 1.087.852.852 0 01-.78.525H6.603M7.573 6v-.625"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
