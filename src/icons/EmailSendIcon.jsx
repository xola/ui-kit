import React from "react";
import { createIcon } from "../helpers/icon";

export const EmailSendIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12.01 3.184V7.3M12.6 10.832H9.066M11.422 9.655l1.178 1.178-1.178 1.177M6.71 9.655H3.179C2.527 9.655 2 9.128 2 8.478V3.184"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.184 2h7.643a1.184 1.184 0 01.664 2.164L8.337 6.302a2.374 2.374 0 01-2.663 0L2.52 4.165a1.184 1.184 0 01-.52-.98v0C2 2.53 2.53 2 3.184 2z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
