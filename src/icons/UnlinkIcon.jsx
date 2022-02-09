import React from "react";
import { createIcon } from "../helpers/icon";

export const UnlinkIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M5.056 3.5L3.5 1.943M4.278 5.055H3.5M6.611 2.722v-.778M8.167 4.277H10.5a2.333 2.333 0 110 4.667H8.167M3.226 6.697L1.85 8.072a2.333 2.333 0 003.3 3.3l1.375-1.376"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
