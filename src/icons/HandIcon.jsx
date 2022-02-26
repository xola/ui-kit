import React from "react";
import { createIcon } from "../helpers/icon";

export const HandIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M5.825 3.297V2.273a.766.766 0 111.53-.01v1.023"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.361 6.368V3.297a.766.766 0 111.53-.01v1.535"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.897 7.136V4.832a.766.766 0 111.53-.01v5.119A2.56 2.56 0 017.868 12.5h-1.71a2.574 2.574 0 01-2.165-1.193c-.885-1.392-1.976-3.675-1.976-3.675a.61.61 0 01.154-.855.607.607 0 01.742.031L4.27 8.395V3.276a.766.766 0 111.53-.01v3.071"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

HandIcon.tags = ["cap"];
