import React from "react";
import { createIcon } from "../helpers/icon";

export const CopyIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.836 7.002l1.747 1.749-1.75 1.75M5.916 8.75H3.583a1.166 1.166 0 01-1.167-1.167V2.917c0-.645.522-1.167 1.167-1.167h4.666c.645 0 1.167.522 1.167 1.167V5.25" />
                <path d="M11.75 12.25H7.082a1.166 1.166 0 01-1.167-1.167V6.417c0-.645.522-1.167 1.167-1.167h4.666c.645 0 1.167.522 1.167 1.167v4.666c0 .645-.522 1.167-1.167 1.167zM5.916 8.75h4.667" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
