import React from "react";
import { createIcon } from "./helpers/icon";

export const ItemsIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 24 24" width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g
                clipPath="url(#clip0_14983_75633)"
                stroke="currentColor"
                strokeWidth="1.125"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M5 16H7" />
                <path d="M13 19H4C2.895 19 2 18.105 2 17V7.569C2 7.299 2.055 7.031 2.161 6.783L3.259 4.214C3.574 3.478 4.297 3 5.098 3H14.902C15.703 3 16.426 3.478 16.741 4.214L17.839 6.783C17.945 7.032 18 7.299 18 7.569V11.1" />
                <path d="M10 3V7.44" />
                <path d="M17.99 7.43994H2" />
                <path d="M20.5355 12.4645C22.4882 14.4171 22.4882 17.5829 20.5355 19.5355C18.5829 21.4882 15.4171 21.4882 13.4645 19.5355C11.5118 17.5829 11.5118 14.4171 13.4645 12.4645C15.4171 10.5118 18.5829 10.5118 20.5355 12.4645Z" />
                <path d="M17 14V18" />
                <path d="M19 16H15" />
            </g>
            <defs>
                <clipPath id="clip0_14983_75633">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
});

ItemsIcon.tags = ["merchandise", "variant", "items"];
