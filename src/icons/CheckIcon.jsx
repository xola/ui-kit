import React from "react";
import { createIcon } from "../helpers/icon";

export const CheckIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 12" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M12.166 3l-7.333 7.333L1.5 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});

CheckIcon.tags = ["ticket", "correct"];
