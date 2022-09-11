import React from "react";
import { createIcon } from "../helpers/icon";

export const CheckboxIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.556 1.5h4.888A3.055 3.055 0 0112.5 4.556v4.888A3.055 3.055 0 019.444 12.5H4.556A3.055 3.055 0 011.5 9.444V4.556A3.056 3.056 0 014.556 1.5v0zM6.541 8.375L5.166 7M8.833 6.083L6.54 8.375"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

CheckboxIcon.tags = ["checkbox", "forms", "questionnaire"];
