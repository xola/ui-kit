import React from "react";
import { createIcon } from "../helpers/icon";

export const CardAltIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12.419 3h-9.5a1 1 0 00-1 1v6a1 1 0 001 1h9.5a1 1 0 001-1V4a1 1 0 00-1-1zM1.916 5h11.5M11.916 7h-1.5M7.416 7h-4"
                stroke="currentColor"
                strokeWidth={0.912}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
