import React from "react";
import { createIcon } from "../helpers/icon";

export const ChecklistIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.666 4.638l.983.983L6.269 3M2.666 10.638l.983.983L6.269 9M8.235 4h3.931M8.235 10h3.931"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
