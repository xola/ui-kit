import React from "react";
import { createIcon } from "../helpers/icon";

export const UserSubtractIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={15} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M9.917 13.333a2.917 2.917 0 100-5.833 2.917 2.917 0 000 5.833zM8.167 10.417h3.5M1.167 9.833c0-.578.138-1.148.4-1.658.263-.51.643-.943 1.105-1.262a3.224 3.224 0 013.162-.3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.667 6.333a2.333 2.333 0 100-4.666 2.333 2.333 0 000 4.666z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

UserSubtractIcon.tags = ["minus", "remove"];