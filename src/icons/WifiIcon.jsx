import React from "react";
import { createIcon } from "../helpers/icon";

export const WifiIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.998 9.363a1.443 1.443 0 100 2.887 1.443 1.443 0 000-2.887zM10.198 7.554a5.284 5.284 0 00-6.409 0M12.771 4.552a9.614 9.614 0 00-11.546-.001"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

WifiIcon.tags = ["private booking"];