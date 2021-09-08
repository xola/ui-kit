import React from "react";
import { createIcon } from "../helpers/icon";

export const ChipIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.095 2.714V1M7.666 2.714V1M10.237 2.714V1M5.095 13v-1.714M7.666 13v-1.714M10.237 13v-1.714M11.952 4.429h1.714M11.952 7h1.714M11.952 9.571h1.714M1.666 4.429H3.38M1.666 7H3.38M1.666 9.571H3.38M10.238 2.714H5.095c-.947 0-1.715.768-1.715 1.715V9.57c0 .947.768 1.715 1.715 1.715h5.143c.946 0 1.714-.768 1.714-1.715V4.43c0-.947-.768-1.715-1.714-1.715z" />
                <path d="M8.695 5.4H6.723a.657.657 0 00-.657.657V8.03c0 .363.294.657.657.657h1.972a.657.657 0 00.657-.657V6.057a.657.657 0 00-.657-.657z" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
