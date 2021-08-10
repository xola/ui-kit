import React from "react";
import { createIcon } from "../helpers/icon";

export const CompassIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)">
                <path clipRule="evenodd" d="M.666 14l14-14-14 14z" stroke="#979797" strokeWidth={0.036} />
                <path d="M.666 0l14 14" stroke="#979797" strokeWidth={0.036} />
                <path
                    d="M.666 9.042h14M.666 5.031h14M.666 7h14"
                    stroke="#979797"
                    strokeWidth={0.036}
                    strokeLinecap="square"
                />
                <path d="M9.708 14V0M5.624 14V0M7.666 14V0" stroke="#979797" strokeWidth={0.036} />
                <path
                    clipRule="evenodd"
                    d="M10.583 7a2.917 2.917 0 10-5.834 0 2.917 2.917 0 005.834 0z"
                    stroke="#979797"
                    strokeWidth={0.036}
                />
                <path
                    clipRule="evenodd"
                    d="M7.666 13.416a6.417 6.417 0 110-12.833 6.417 6.417 0 010 12.833z"
                    stroke="#979797"
                    strokeWidth={0.036}
                />
                <path
                    clipRule="evenodd"
                    d="M12.333 12.541H2.999a.878.878 0 01-.875-.875V2.333c0-.481.394-.875.875-.875h9.334c.481 0 .875.394.875.875v9.333a.878.878 0 01-.875.875z"
                    stroke="#979797"
                    strokeWidth={0.036}
                />
                <path
                    clipRule="evenodd"
                    d="M11.458 13.416H3.874A.878.878 0 013 12.541V1.458c0-.481.394-.875.875-.875h7.584c.481 0 .875.394.875.875v11.083a.878.878 0 01-.875.875z"
                    stroke="#979797"
                    strokeWidth={0.036}
                />
                <path
                    clipRule="evenodd"
                    d="M13.208 11.666H2.124a.878.878 0 01-.875-.875V3.208c0-.481.394-.875.875-.875h11.084c.481 0 .875.394.875.875v7.583a.878.878 0 01-.875.875z"
                    stroke="#979797"
                    strokeWidth={0.036}
                />
                <path
                    d="M7.616 12.7a5.75 5.75 0 100-11.5 5.75 5.75 0 000 11.5z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M6.366 5.7l3.695-1.522v0a.25.25 0 01.327.327L8.866 8.2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.866 8.2l-2.5-2.5-1.521 3.695v0a.25.25 0 00.326.326L8.866 8.2z"
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
