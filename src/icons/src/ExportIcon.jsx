import React from "react";
import { createIcon } from "./helpers/icon";

export const ExportIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0_196_67)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.14 12.48h-.006c3.017 1.217 6.455-.248 7.68-3.272A5.9 5.9 0 009.55 1.53a5.915 5.915 0 00-7.695 7.687" />
                <path d="M8.987 8.272l.003-2.903-2.903.003M8.989 5.37l-5.81 5.81" />
            </g>
            <defs>
                <clipPath id="prefix__clip0_196_67">
                    <path fill="#fff" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});

ExportIcon.tags = ["arrow"];
