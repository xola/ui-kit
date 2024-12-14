import React from "react";
import { createIcon } from "./helpers/icon";

export const MegaphoneIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2 9.904l1.18 1.776M8.521 2l4.48 6.746M12.765 8.39l-9.82 2.934-.71-1.067L8.75 2.345l4.008 6.038.007.006z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.055 9.798c.54.617.47 1.558-.148 2.098a1.497 1.497 0 01-2.225-.301l-.618-.934"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

MegaphoneIcon.tags = ["marketing", "loud speaker"];
