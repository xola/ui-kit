import React from "react";
import { createIcon } from "./helpers/icon";

export const LabelIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M7 12V2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});
