import React from "react";
import { createIcon } from "../helpers/icon";

export const DisabledIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.666 12a5 5 0 100-10 5 5 0 000 10zM4.131 10.535l7.07-7.07"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
