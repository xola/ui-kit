import React from "react";
import { createIcon } from "./helpers/icon";

export const ChevronUpIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M1.75 9.75l5.5-5.5 5.5 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});

ChevronUpIcon.tags = ["arrow"];
