import React from "react";
import { createIcon } from "./helpers/icon";

export const AccountIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M12.37 9.667A5.993 5.993 0 017 13a5.993 5.993 0 01-5.368-3.333M12.37 4.333A5.993 5.993 0 007 1a5.993 5.993 0 00-5.368 3.333M5.667 7H1M4.335 5.667L5.668 7 4.335 8.333M8.334 7h4.667M9.667 8.333L8.334 7l1.333-1.333"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
