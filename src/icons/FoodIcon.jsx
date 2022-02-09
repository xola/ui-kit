import React from "react";
import { createIcon } from "../helpers/icon";

export const FoodIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2 7.86h.277a.85.85 0 00.59-.235.86.86 0 011.18 0 .86.86 0 001.18 0 .86.86 0 011.18 0 .86.86 0 001.18 0 .86.86 0 011.18 0 .86.86 0 001.18 0 .86.86 0 011.18 0 .85.85 0 00.59.234h.278M7.022 5.75H3.02a.897.897 0 01-.633-.263 1.25 1.25 0 01.102-1.86l.09-.071a7.09 7.09 0 018.862 0l.09.071a1.25 1.25 0 01.103 1.86.895.895 0 01-.634.263H6.998M2 10.125c0-.345.28-.625.625-.625h8.747c.345 0 .625.28.625.625 0 .41-.096.816-.28 1.184A1.251 1.251 0 0110.6 12H3.397a1.25 1.25 0 01-1.118-.69A2.65 2.65 0 012 10.124v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
