import React from "react";
import { createIcon } from "../helpers/icon";

export const InvoiceIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.124 12.022a.479.479 0 01-.477.478H3.478A.48.48 0 013 12.018v0V1.986a.474.474 0 01.473-.487h4.58-.004a.461.461 0 01.339.139l2.584 2.589-.005-.005c.086.086.138.21.138.334l.02 7.465z"
                stroke="currentColor"
                strokeWidth={0.917}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.259 1.558v2.345c0 .262.21.473.477.473h2.346"
                stroke="currentColor"
                strokeWidth={0.917}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.906 5.625V5M7.843 5.625H6.568a.839.839 0 00-.843.838.84.84 0 00.525.774l1.29.513-.007-.006a.834.834 0 01.463 1.087.852.852 0 01-.781.525H5.937M6.906 10v-.625"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
