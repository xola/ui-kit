import React from "react";
import { createIcon } from "./helpers/icon";

export const HiddenIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M9.0012 14.886C8.29149 14.886 7.58094 14.7359 6.89062 14.4688"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.4874 9.38086C14.8927 12.3301 11.9468 14.8866 9.00098 14.8866"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.9678 6.39062C15.5502 7.07252 16.0677 7.81594 16.4875 8.59223C16.6198 8.83751 16.6198 9.13504 16.4875 9.38032"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.10156 14.8863L14.9019 3.08594"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.12424 10.8636C6.08749 9.8269 6.08749 8.14536 7.12424 7.10861C8.16098 6.07187 9.84253 6.07187 10.8793 7.10861"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.2522 4.73461C11.9483 3.72568 10.4741 3.08594 9.00075 3.08594C6.05489 3.08594 3.10902 5.64239 1.51429 8.59248C1.38196 8.83775 1.38196 9.13529 1.51429 9.38057C2.31165 10.8548 3.44617 12.2303 4.74926 13.2384"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

HiddenIcon.tags = ["hidden", "hide", "visibility"];