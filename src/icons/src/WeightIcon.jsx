import React from "react";
import { createIcon } from "./helpers/icon";

export const WeightIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M1.5 4.556v4.888A3.056 3.056 0 004.556 12.5h4.888A3.056 3.056 0 0012.5 9.444V4.556A3.056 3.056 0 009.444 1.5H4.556A3.056 3.056 0 001.5 4.556z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.832 6.654H5.166a.611.611 0 01-.611-.61 2.445 2.445 0 014.889 0 .61.61 0 01-.612.61zM6.999 6.651L7.61 5.43"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

WeightIcon.tags = ["weight", "forms", "questionnaire"];
