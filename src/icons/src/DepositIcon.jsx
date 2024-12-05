import React from "react";
import { createIcon } from "./helpers/icon";

export const DepositIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M1.008 6.006v5.863M12 11.136a2.2 2.2 0 00-2.199-2.198H7.053a2.2 2.2 0 00-2.198-2.199H1v4.397h11zM4.855 8.938h2.749M10.906 1.625V1M11.843 1.625h-1.275a.839.839 0 00-.843.837.84.84 0 00.525.775l1.29.513-.007-.006a.834.834 0 01.463 1.087.852.852 0 01-.781.525H9.937M10.906 6v-.625"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
