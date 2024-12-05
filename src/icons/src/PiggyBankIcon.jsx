import React from "react";
import { createIcon } from "./helpers/icon";

export const PiggyBankIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                clipRule="evenodd"
                d="M9.684 9.636A3.713 3.713 0 0011.2 6.724c0-2.208-2.148-4-4.8-4-.523 0-1.044.073-1.548.216a2.57 2.57 0 00-1.206-.922.333.333 0 00-.442.313v1.427A3.6 3.6 0 002 5.33h-.667A.333.333 0 001 5.664v2c0 .185.15.334.333.334H2a3.972 3.972 0 001.345 1.791l-.417 1.134a.8.8 0 101.5.553l.365-.99a5.633 5.633 0 003.467-.075l.393 1.067a.8.8 0 101.5-.553l-.469-1.29z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.2 6.724c1.067 0 1.6-.534 1.6-1.334M4.168 5.664v0a.167.167 0 11-.166.167v0c0-.092.074-.167.166-.167"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

PiggyBankIcon.tags = ["purchase", "gift", "store credit"];
