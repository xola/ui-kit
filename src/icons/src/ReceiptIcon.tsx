import React from "react";
import { createIcon } from "./helpers/icon";

export const ReceiptIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.703 12.176c0 .167-.143.31-.31.31a.314.314 0 01-.204-.081L9.53 10.98l-2.29 1.715v-.006a.316.316 0 01-.371 0l-2.29-1.721-1.66 1.417v-.006a.32.32 0 01-.52-.241V1.875a.613.613 0 01.613-.625h8.047-.006a.612.612 0 01.619.613l.03 10.313zM4.015 4.287H7.05M4.015 6.311h5.06M4.015 8.335h5.06"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
