import React from "react";
import { createIcon } from "../helpers/icon";

export const BankCheckIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M5.772 7.819l-1.86.265.265-1.86L8.946 1.45H8.94c.435-.44 1.15-.44 1.59-.005.435.435.435 1.15 0 1.59L5.77 7.819z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.29 4.125H2.787a.749.749 0 00-.75.75v5.25-.005c-.005.41.335.75.745.75h9.75-.005c.41 0 .75-.34.75-.75V4.87c0-.415-.34-.75-.75-.75h-.75M11.79 9H8.04M11.79 7.125H9.54"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
