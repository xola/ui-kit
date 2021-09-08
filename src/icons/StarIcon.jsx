import React from "react";
import { createIcon } from "../helpers/icon";

export const StarIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)">
                <path
                    d="M8.055 1.239L9.84 4.774l3.434.34a.437.437 0 01.367.283.427.427 0 01-.102.45l-2.83 2.8 1.049 3.807a.428.428 0 01-.144.446.438.438 0 01-.47.053L7.666 11.23l-3.478 1.725a.438.438 0 01-.608-.255.426.426 0 01-.005-.244l1.048-3.808-2.83-2.804a.429.429 0 01.265-.732l3.434-.34 1.785-3.535A.432.432 0 017.667 1a.438.438 0 01.388.239z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
