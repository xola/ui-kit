import React from "react";
import { createIcon } from "../helpers/icon";

export const DepositIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M1.674 6.006v5.863M12.666 11.136a2.2 2.2 0 00-2.199-2.198H7.72a2.2 2.2 0 00-2.198-2.199H1.666v4.397h11zM5.521 8.938h2.748M11.572 1.625V1M12.51 1.625h-1.275a.839.839 0 00-.844.837.84.84 0 00.525.775l1.29.513-.006-.006a.834.834 0 01.462 1.087.852.852 0 01-.78.525h-1.278M11.572 6v-.625"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
