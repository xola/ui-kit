import React from "react";
import { createIcon } from "../helpers/icon";

export const FaceSadIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.52.729a6.271 6.271 0 100 12.542A6.271 6.271 0 007.52.73v0z" />
                <path d="M4.52 5.773h-.005c.071-.005.137.06.137.13 0 .072-.066.137-.137.137-.076 0-.136-.065-.141-.136a.135.135 0 01.13-.142M10.52 5.773h-.006a.135.135 0 00-.137.136c0 .071.06.137.137.131.07-.005.136-.065.13-.142a.138.138 0 00-.136-.136M5.066 10.817a2.45 2.45 0 114.902-.01" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
