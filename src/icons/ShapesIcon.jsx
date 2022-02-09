import React from "react";
import { createIcon } from "../helpers/icon";

export const ShapesIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g
                clipPath="url(#prefix__clip0_887_27435)"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M11.635 8.902a1.961 1.961 0 11-2.774 2.774 1.961 1.961 0 012.774-2.774M12.397 4.173l-1.69 1.69a.653.653 0 01-.925 0l-1.69-1.69a.654.654 0 010-.924l1.69-1.691a.653.653 0 01.925 0l1.69 1.69a.655.655 0 010 .925v0zM2.52 5.56h2.39a.654.654 0 00.654-.655v-2.39a.654.654 0 00-.654-.654H2.52a.654.654 0 00-.655.654v2.39c0 .361.293.654.654.654v0zM3.13 8.841l-1.45 2.32a.69.69 0 00.585 1.054h2.898a.69.69 0 00.585-1.055l-1.45-2.318A.69.69 0 003.13 8.84v0z" />
            </g>
            <defs>
                <clipPath id="prefix__clip0_887_27435">
                    <path fill="#fff" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
