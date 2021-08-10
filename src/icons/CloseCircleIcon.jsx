import React from "react";
import { createIcon } from "../helpers/icon";

export const CloseCircleIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.666 12.833a5.833 5.833 0 100-11.666 5.833 5.833 0 000 11.666zM5.333 9.333l4.666-4.667M10 9.333L5.332 4.666"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
