import React from "react";
import { createIcon } from "./helpers/icon";

export const PauseIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" {...props}>
            <path d="M4.666 12V2M10.666 12V2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});
