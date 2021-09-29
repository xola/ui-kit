import React from "react";
import { createIcon } from "../helpers/icon";

export const ClipboardIcon = createIcon((props) => {
    return (
        <svg width="14" height="17" fill="none" viewBox="0 0 14 17" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.945 2.326h1.326v0c.367 0 .663.297.663.663v12.598a.663.663 0 01-.662.663H1.662v0A.663.663 0 011 15.587v0V2.989v0c0-.366.297-.663.663-.663h1.326"
            ></path>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.294 2.326a1.326 1.326 0 00-2.653 0H4.315v1.99H9.62v-1.99H8.294z"
            ></path>
        </svg>
    );
});
