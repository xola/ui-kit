import React from "react";
import { createIcon } from "./helpers/icon";

export const AppIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" {...props}>
            <path
                d="M9 5.25H3.75c-.825 0-1.5.675-1.5 1.5v7.5c0 .825.675 1.5 1.5 1.5h7.5c.825 0 1.5-.675 1.5-1.5V9"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.375 9A3.361 3.361 0 019 5.625C9 3.75 10.5 2.25 12.375 2.25s3.375 1.5 3.375 3.375S14.25 9 12.375 9zM16.5 9.75l-1.725-1.725"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
