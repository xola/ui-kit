import React from "react";
import { createIcon } from "../helpers/icon";

export const DashboardIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.91 5.436L8.425 9.891M14.649 12.474v0a10.396 10.396 0 00-12.449 0"
            ></path>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.675 3.175a7.425 7.425 0 11-10.5 10.5 7.425 7.425 0 0110.5-10.5"
            ></path>
        </svg>
    );
});
