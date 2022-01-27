import React from "react";
import { createIcon } from "../helpers/icon";

export const PauseCircleIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" fill="none" viewBox="0 0 19 18" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
                d="M11.158 11.38V6.62M7.983 11.38V6.62M16.714 9a7.143 7.143 0 01-7.143 7.143A7.143 7.143 0 012.428 9 7.143 7.143 0 019.57 1.857 7.143 7.143 0 0116.714 9z"
            />
        </svg>
    );
});
