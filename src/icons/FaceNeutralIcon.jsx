import React from "react";
import { createIcon } from "../helpers/icon";

export const FaceNeutralIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.666.875a6.125 6.125 0 100 12.25 6.125 6.125 0 000-12.25v0z" />
                <path d="M5.802 4.736h-.005c.069-.005.133.059.133.128a.14.14 0 01-.133.133c-.075 0-.134-.064-.139-.133a.132.132 0 01.128-.138M9.53 4.736h-.005a.132.132 0 00-.133.134c0 .069.058.133.133.127.07-.005.133-.064.128-.138a.135.135 0 00-.133-.133M4.204 8.864h6.924" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
