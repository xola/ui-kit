import React from "react";
import { createIcon } from "../helpers/icon";

export const CirclePauseIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 13" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.212 8.867V4.933M5.588 8.867V4.933M12.8 6.9A5.9 5.9 0 111 6.9a5.9 5.9 0 1111.8 0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
