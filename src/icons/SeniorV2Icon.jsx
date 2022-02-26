import React from "react";
import { createIcon } from "../helpers/icon";

export const SeniorV2Icon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.8 5.8a.8.8 0 00.8-.8V3.8a1.2 1.2 0 012.4 0v7.6h1.6V3.8a2.8 2.8 0 10-5.6 0V5a.8.8 0 00.8.8zM10 13H7.6l.4-1.6h1.6L10 13z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

SeniorV2Icon.tags = ["old"];