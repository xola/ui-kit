import React from "react";
import { createIcon } from "../helpers/icon";

export const SettingsIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.666 7.233V1M7.666 12v-1.833M7.666 7.233a1.467 1.467 0 100 2.934 1.467 1.467 0 000-2.934zM3.633 6.5V12M3.633 1v2.567M3.633 3.567a1.467 1.467 0 100 2.933 1.467 1.467 0 000-2.933v0zM11.7 6.5V12M11.7 1v2.567M11.7 3.567a1.467 1.467 0 100 2.933 1.467 1.467 0 000-2.933v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
