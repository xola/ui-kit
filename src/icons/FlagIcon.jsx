import React from "react";
import { createIcon } from "../helpers/icon";

export const FlagIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M3 11.667V2.333M3 9.368l1.308-.403a3.986 3.986 0 013.262.415 3.988 3.988 0 003.185.44l1.24-.354a.467.467 0 00.338-.448V4.153a.468.468 0 00-.595-.449l-.983.281a3.989 3.989 0 01-3.185-.438 3.986 3.986 0 00-3.262-.415l-1.309.402"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
