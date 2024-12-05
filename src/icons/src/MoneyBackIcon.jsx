import React from "react";
import { createIcon } from "./helpers/icon";

export const MoneyBackIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 15 15" width={15} height={15} fill="none" {...props}>
            <path
                d="M6.674 9.972A.972.972 0 107.647 9a.972.972 0 11.972-.972M7.647 6.083v.973M7.647 10.944v.973"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.51 8.72a5.28 5.28 0 105.281-5.281h-.406"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.113 1.458l-1.98 1.98 1.98 1.98"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

MoneyBackIcon.tags = ["refund", "return", "money", "payment"];
