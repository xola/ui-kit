import React from "react";
import { createIcon } from "./helpers/icon";

export const RefundIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={15} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.97 6.26H6.724a.823.823 0 00-.307 1.588l1.267.506a.823.823 0 01-.307 1.588H6.13M7.05 6.26V5.8M7.05 10.402v-.46"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.521 1.125l-1.25 1.25 1.25 1.25-1.25-1.25M5.496 2.6a5.5 5.5 0 11-3.942 5.435"
                stroke="currentColor"
                strokeWidth={0.917}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
