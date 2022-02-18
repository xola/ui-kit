import React from "react";
import { createIcon } from "../helpers/icon";

export const CouponIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 24 21" width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g stroke="currentColor" strokeWidth={1.286} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.844 11.35l-.906-5.435a2.085 2.085 0 00-1.714-1.714l-5.435-.906a2.085 2.085 0 00-1.816.582l-8.024 8.024a2.085 2.085 0 000 2.95l6.34 6.34a2.085 2.085 0 002.95 0l8.023-8.024a2.083 2.083 0 00.582-1.817v0z" />
                <path clipRule="evenodd" d="M14.743 11.271a1.877 1.877 0 110-3.753 1.877 1.877 0 010 3.753z" />
            </g>
        </svg>
    );
});
