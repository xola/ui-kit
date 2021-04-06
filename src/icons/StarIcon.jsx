import React from "react";

export const StarIcon = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14" {...props}>
            <g clipPath="url(#clip0)">
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.389 1.239l1.785 3.535 3.434.34a.437.437 0 01.367.283.426.426 0 01-.102.45l-2.83 2.8 1.049 3.807a.427.427 0 01-.144.446.437.437 0 01-.47.053L7 11.231l-3.478 1.724a.438.438 0 01-.608-.255.426.426 0 01-.005-.244l1.048-3.808-2.83-2.803a.429.429 0 01.265-.733l3.434-.34 1.785-3.535A.432.432 0 017.001 1a.438.438 0 01.388.239z"
                ></path>
            </g>
            <defs>
                <clipPath id="clip0">
                    <path fill="currentColor" d="M0 0H14V14H0z"></path>
                </clipPath>
            </defs>
        </svg>
    );
};
