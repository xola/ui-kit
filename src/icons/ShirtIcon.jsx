import React from "react";
import { createIcon } from "../helpers/icon";

export const ShirtIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13.65 5.302L11.609 3.34l-.005-.005a2.624 2.624 0 00-1.816-.733H5.607c-.68 0-1.33.262-1.816.733l-2.04 1.962h-.006a.257.257 0 00-.005.366l1.214 1.214-.005-.005c.094.094.246.1.35.016l1.492-1.162v6.018c0 .14.115.256.261.256h5.233-.005c.141 0 .261-.12.261-.262V5.721l1.492 1.155c.1.084.256.079.35-.02l1.214-1.22h-.005c.1-.105.1-.272-.005-.372l-.005-.005.068.043zM6.14 2.612a1.567 1.567 0 103.134-.01" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
