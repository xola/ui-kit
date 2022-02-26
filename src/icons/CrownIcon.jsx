import React from "react";
import { createIcon } from "../helpers/icon";

export const CrownIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.175 2.826c2.3 2.3 2.3 6.048 0 8.348a5.912 5.912 0 01-8.349 0 5.912 5.912 0 010-8.348c2.301-2.301 5.982-2.301 8.349 0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.926 9.005H4.009c-.197 0-.328-.131-.328-.328V5.718c0-.263.328-.46.526-.263L5.52 6.507l1.184-1.249a.318.318 0 01.46 0l1.183 1.25 1.315-1.053c.197-.197.526 0 .526.263v2.959c.066.197-.066.328-.263.328z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

CrownIcon.tags = ["organizer", "membership"];
