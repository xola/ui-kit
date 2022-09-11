import React from "react";
import { createIcon } from "../helpers/icon";

export const QuestionIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M5.777 5.778A1.222 1.222 0 117 7M7 7.917V7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.5 9.444V4.556A3.056 3.056 0 014.556 1.5h4.888A3.055 3.055 0 0112.5 4.556v4.888A3.055 3.055 0 019.444 12.5H4.556A3.055 3.055 0 011.5 9.444z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 9.414a.03.03 0 100 .06.03.03 0 000-.06"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

QuestionIcon.tags = ["short text", "forms", "questionnaire"];
