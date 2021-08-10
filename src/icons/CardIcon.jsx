import React from "react";
import { createIcon } from "../helpers/icon";

export const CardIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12.32 3H3.018a.98.98 0 00-.98.98v5.874c0 .54.44.98.98.98h9.302a.98.98 0 00.98-.98V3.98A.98.98 0 0012.32 3z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path fill="currentColor" d="M2.266 4.5h11V6h-11z" />
        </svg>
    );
});
