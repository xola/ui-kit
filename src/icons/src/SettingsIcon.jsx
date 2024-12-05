import React from "react";
import { createIcon } from "./helpers/icon";

export const SettingsIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M7 7.233V1M7 12v-1.833M7 7.233a1.467 1.467 0 100 2.934 1.467 1.467 0 000-2.934zM2.967 6.5V12M2.967 1v2.567M2.967 3.567a1.467 1.467 0 100 2.933 1.467 1.467 0 000-2.933v0zM11.033 6.5V12M11.033 1v2.567M11.033 3.567a1.467 1.467 0 100 2.933 1.467 1.467 0 000-2.933v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
