import React from "react";
import { createIcon } from "./helpers/icon";

export const LogoutIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M1.41699 8.05382H1.41699C2.55128 10.7214 5.63333 11.9644 8.30094 10.8301C10.9685 9.69584 12.2115 6.61379 11.0772 3.94618C9.94295 1.27858 6.86091 0.0355801 4.1933 1.16987C2.94354 1.70128 1.94841 2.69642 1.41699 3.94618"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.47656 7.82555L8.30218 5.99993L6.47656 4.17432"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M8.30247 6H1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});

LogoutIcon.tags = ["logout"];
