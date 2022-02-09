import React from "react";
import { createIcon } from "../helpers/icon";

export const CommentAltIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M8.852 10.448h2.037A1.11 1.11 0 0012 9.338V3.41a1.11 1.11 0 00-1.111-1.11H3.11A1.11 1.11 0 002 3.41v5.926a1.11 1.11 0 001.111 1.111h2.037L7 12.3l1.852-1.852z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
