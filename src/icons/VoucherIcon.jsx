import React from "react";
import { createIcon } from "../helpers/icon";

export const VoucherIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.693 4.31a1.354 1.354 0 11-1.915-1.915L8.66 1.278a.451.451 0 00-.639 0L1.32 7.98a.451.451 0 000 .638l1.117 1.117a1.354 1.354 0 011.916 1.916l1.117 1.117a.451.451 0 00.638 0l6.703-6.703a.451.451 0 000-.639L11.693 4.31z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.043 3.84l-.953.953 1.65 2.994-.033.034-2.996-1.648-.951.95 4.38 2.112L9.154 8.22l-2.11-4.38z"
                fill="currentColor"
            />
        </svg>
    );
});
