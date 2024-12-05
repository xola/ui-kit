import React from "react";
import { createIcon } from "./helpers/icon";

export const CakeIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M2.119 7.82v4.032l-.007-.006c0 .683.552 1.235 1.235 1.24h7.302a1.245 1.245 0 001.235-1.247V7.807"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.531 2.065c0 .509-.422.93-.93.93a.933.933 0 01-.931-.93V2.06A3.47 3.47 0 014.352.62h-.006A.302.302 0 014.78.57l.044.044c.335.415.57.905.682 1.433l.025.018zM10.818 2.065c0 .509-.422.93-.93.93a.933.933 0 01-.931-.93V2.06A3.47 3.47 0 019.639.62h-.006a.302.302 0 01.435-.049l.043.044c.335.415.57.905.682 1.433l.025.018zM10.508 6.27h-1.24V4.097a.307.307 0 01.304-.316h.62-.006a.306.306 0 01.31.304l.012 2.183zM5.22 6.27H3.98V4.097a.307.307 0 01.304-.316h.62-.006a.306.306 0 01.31.304l.012 2.183z"
                fill="currentColor"
            />
            <path
                d="M11.89 9.309c0 .893-.732 1.628-1.629 1.628A1.63 1.63 0 018.633 9.31c0 .893-.732 1.628-1.629 1.628A1.63 1.63 0 015.376 9.31c0 .893-.732 1.628-1.628 1.628A1.63 1.63 0 012.119 9.31v-2.42a.614.614 0 01.614-.626h8.53-.006a.613.613 0 01.62.614l.013 2.432z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

CakeIcon.tags = ["birthday", "date of birth"];
