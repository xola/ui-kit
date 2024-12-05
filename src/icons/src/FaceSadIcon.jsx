import React from "react";
import { createIcon } from "./helpers/icon";

export const FaceSadIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M6.9 1a5.9 5.9 0 100 11.8A5.9 5.9 0 006.9 1v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.078 5.746h-.005c.067-.006.128.056.128.123a.134.134 0 01-.128.128c-.072 0-.128-.062-.133-.128a.127.127 0 01.123-.134M9.722 5.746h-.005a.127.127 0 00-.128.128c0 .067.056.128.128.123.067-.005.128-.062.123-.133a.13.13 0 00-.128-.129M4.592 10.491a2.306 2.306 0 114.612-.01"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

FaceSadIcon.tags = ["smiley", "emoji"];
