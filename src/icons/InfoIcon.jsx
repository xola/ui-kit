import React from "react";
import { createIcon } from "../helpers/icon";

export const InfoIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7.716 1.3a5.75 5.75 0 100 11.5 5.75 5.75 0 000-11.5v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.023 9.666h-.789a.525.525 0 01-.523-.528v0V5.74a.262.262 0 00-.262-.261h-.784M7.583 4.175h-.005a.13.13 0 00-.131.13c0 .069.057.131.13.126.069-.005.131-.063.126-.136a.133.133 0 00-.13-.13"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
