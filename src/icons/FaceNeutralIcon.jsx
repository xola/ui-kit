import React from "react";
import { createIcon } from "../helpers/icon";

export const FaceNeutralIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.9 1a5.9 5.9 0 100 11.8A5.9 5.9 0 006.9 1v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.105 4.72H5.1c.066-.006.128.056.128.123a.134.134 0 01-.128.128c-.072 0-.129-.062-.134-.128a.127.127 0 01.123-.134M8.696 4.72H8.69a.127.127 0 00-.129.128c0 .066.057.128.129.123.066-.005.128-.062.123-.134a.13.13 0 00-.128-.128M3.565 8.696h6.67"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

FaceNeutralIcon.tags = ["smiley", "emoji"];
