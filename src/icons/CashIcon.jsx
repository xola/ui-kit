import React from "react";
import { createIcon } from "./helpers/icon";

export const CashIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.798 4.6h-.006a.194.194 0 01.198.197c0 .107-.091.198-.203.198a.203.203 0 01-.203-.203.195.195 0 01.198-.203s0 0 0 0M9.6 7.4h-.005a.194.194 0 01.197.197.203.203 0 01-.405-.005.195.195 0 01.197-.203"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.6 3H1.8a.8.8 0 00-.8.8v4.8a.8.8 0 00.8.8h8.8a.8.8 0 00.8-.8V3.8a.8.8 0 00-.8-.8z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.2 4.6a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2zM13 5.4v4.8c0 .437-.362.8-.8.8H3.4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

CashIcon.tags = ["payment"];
