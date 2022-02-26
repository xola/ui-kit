import React from "react";
import { createIcon } from "../helpers/icon";

export const SeniorIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.816 3.733a1.43 1.43 0 100-2.858 1.43 1.43 0 000 2.858zM7.815 9.45v2.858M9.45 8.633V7M4.55 9.45a.817.817 0 10-1.634 0v3.675M6.182 8.633v3.675a.817.817 0 101.633 0 .817.817 0 101.634 0V8.633a.817.817 0 101.633 0V7a2.45 2.45 0 00-2.45-2.45H7A2.45 2.45 0 004.549 7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

SeniorIcon.tags = ["old"];