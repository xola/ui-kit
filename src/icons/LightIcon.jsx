import React from "react";
import { createIcon } from "../helpers/icon";

export const LightIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M7 9.042A4.083 4.083 0 107 .875a4.083 4.083 0 000 8.167zM5.367 10.675h3.267M5.367 12.308h3.267M7 13.125v-.817"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7 9.042V7L5.773 5.775M7 7l1.225-1.225"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
