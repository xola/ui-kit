import React from "react";
import { createIcon } from "../helpers/icon";

export const CircleInfinityIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.882 7.125c-.334.367-1.352 1.39-2.296 1.39v0h-.004a1.515 1.515 0 11.001-3.03h.003v0c.944 0 1.962 1.023 2.297 1.39L7 7l-.119.125v0zM7.12 7.125c.334.367 1.352 1.39 2.296 1.39v0h.003a1.515 1.515 0 100-3.03h-.004v0c-.944 0-1.962 1.023-2.296 1.39L7.001 7l.119.125v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.172 2.828a5.9 5.9 0 11-8.343 8.344 5.9 5.9 0 018.343-8.344"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
