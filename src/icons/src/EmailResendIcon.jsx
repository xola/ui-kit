import React from "react";
import { createIcon } from "./helpers/icon";

export const EmailResendIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" {...props}>
            <path
                d="M15.441 4.094v5.292M16.2 13.928h-4.543M14.685 12.414l1.515 1.514-1.514 1.514M8.628 12.414H4.085A1.514 1.514 0 012.571 10.9V4.094"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.094 2.572h9.826a1.523 1.523 0 01.854 2.782l-4.056 2.749c-1.033.7-2.39.7-3.423 0L3.24 5.355a1.523 1.523 0 01-.669-1.26v0c0-.842.682-1.523 1.523-1.523z"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

EmailResendIcon.tags = ["email", "resend", "confirmation", "waiver", "receipt", "reciept"];
