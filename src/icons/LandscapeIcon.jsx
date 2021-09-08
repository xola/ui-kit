import React from "react";
import { createIcon } from "../helpers/icon";

export const LandscapeIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.534 10.153L8.069 2.95v-.006A.667.667 0 019.13 2.94l4.535 7.203-10.132.011z" />
                <path d="M3.534 10.153H1.666l1.868-2.935h-.006a.71.71 0 01.534-.272l-.006-.005c.208.005.4.101.534.261l.347.694M5.91 6.377l1.25 1.057-.005-.005a.534.534 0 00.72-.032l.342-.347h-.005a.527.527 0 01.752-.006l.342.342a.533.533 0 00.72.027l1.227-1.04" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
