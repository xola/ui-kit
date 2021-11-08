import React from "react";
import { createIcon } from "../helpers/icon";

export const ShapesIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.3 8.902a1.961 1.961 0 11-2.773 2.774A1.961 1.961 0 0112.3 8.901M13.064 4.172l-1.69 1.691a.653.653 0 01-.926 0l-1.69-1.69a.654.654 0 010-.925l1.69-1.69a.653.653 0 01.925 0l1.69 1.69a.655.655 0 010 .924v0zM3.185 5.56h2.39a.654.654 0 00.654-.655v-2.39a.654.654 0 00-.654-.654h-2.39a.654.654 0 00-.654.654v2.39c0 .361.293.654.654.654v0zM3.795 8.84l-1.449 2.32a.69.69 0 00.585 1.055h2.898a.69.69 0 00.585-1.055l-1.45-2.319a.69.69 0 00-1.169 0v0z" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
