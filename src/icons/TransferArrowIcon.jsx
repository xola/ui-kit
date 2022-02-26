import React from "react";
import { createIcon } from "../helpers/icon";

export const TransferArrowIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M9.5 7L12 9.5 9.5 12M12 9.502H2M4.5 7L2 4.5 4.5 2M12 4.502H2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

TransferArrowIcon.tags = ["store credit", "refund", "return", "payment"];
