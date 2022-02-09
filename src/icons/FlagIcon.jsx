import React from "react";
import { createIcon } from "../helpers/icon";

export const FlagIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M3.1 12V2.517M10.878 8.122V2.556M3.1 8.111s.487-.404 1.945-.404c1.458 0 2.43.96 3.889.96 1.458 0 1.944-.543 1.944-.543M3.1 2.518S3.588 2 5.046 2c1.458 0 2.43.96 3.889.96 1.458 0 1.944-.404 1.944-.404"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
