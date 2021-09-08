import React from "react";
import { createIcon } from "../helpers/icon";

export const InvoiceIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.79 12.022a.479.479 0 01-.477.478H4.144a.48.48 0 01-.478-.482v0V1.986A.474.474 0 014.14 1.5h4.58-.004a.461.461 0 01.339.139l2.584 2.589-.005-.005c.086.086.138.21.138.334l.02 7.465z"
                stroke="currentColor"
                strokeWidth={0.917}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.925 1.558v2.345c0 .262.21.473.478.473h2.345"
                stroke="currentColor"
                strokeWidth={0.917}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.573 5.625V5M8.51 5.625H7.235a.839.839 0 00-.844.838.84.84 0 00.525.774l1.29.513-.006-.006a.834.834 0 01.462 1.087.852.852 0 01-.78.525H6.603M7.573 10v-.625"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
