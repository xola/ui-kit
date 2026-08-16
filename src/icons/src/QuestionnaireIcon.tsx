import React from "react";
import { createIcon } from "./helpers/icon";

export const QuestionnaireIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.13 1.875H2.87a.87.87 0 00-.87.87v8.26c0 .48.39.87.87.87h8.26c.48 0 .87-.39.87-.87v-8.26a.87.87 0 00-.87-.87z"
                stroke="currentColor"
                strokeWidth={0.976}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.957 5.287l.652.652L8.35 4.2M5.957 8.639l.652.652 1.74-1.74"
                stroke="currentColor"
                strokeWidth={0.976}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
