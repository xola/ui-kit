import React from "react";
import { createIcon } from "../helpers/icon";

export const WifiIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" fill="none" viewBox="0 0 14 12" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 8.406a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM10.326 6.526a5.49 5.49 0 00-6.66 0M13 3.406a9.991 9.991 0 00-12-.001"
            ></path>
        </svg>
    );
});
