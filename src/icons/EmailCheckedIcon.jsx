import React from "react";
import { createIcon } from "../helpers/icon";

export const EmailCheckedIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.8 8.4V3.767M7.617 10.946H2.8a1.8 1.8 0 01-1.8-1.8v-5.38"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.282 6.756L1.65 4.844A1.22 1.22 0 011 3.765v-.02a1.2 1.2 0 011.2-1.2h8.38c.674 0 1.22.547 1.22 1.22v.012a1.2 1.2 0 01-.64 1.062L7.517 6.757a2.4 2.4 0 01-2.236 0zM12.21 8.739a2.715 2.715 0 010 3.83c-1.032 1.035-2.786 1.035-3.82 0a2.714 2.714 0 01.002-3.83 2.694 2.694 0 013.818 0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.351 10.137l-1.313 1.313-.787-.788"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

EmailCheckedIcon.tags = ["opt-in", "optin", "forms", "questionnaire"];
