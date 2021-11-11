import React from "react";
import { createIcon } from "../helpers/icon";

export const FoodIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.666 10.61v.724a.678.678 0 00.689.666h7.289a.678.678 0 00.689-.666v-.725M2.666 5.394A.998.998 0 103.958 6.6 2.273 2.273 0 007 6.874 2.273 2.273 0 0010.04 6.6a.998.998 0 101.293-1.207"
                stroke="currentColor"
                strokeWidth={0.9}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 2H6a3.333 3.333 0 00-3.334 3.333v.061h8.667v-.06A3.334 3.334 0 007.999 2v0zM7.333 10.667H3a1 1 0 01-1-1v0a1 1 0 011-1h8a1 1 0 011 1v0a1 1 0 01-1 1h-.333M11.745 7c.165.183.256.42.255.666v0a1 1 0 01-1 1H3a1 1 0 01-1-1v0c0-.246.09-.483.255-.666"
                stroke="currentColor"
                strokeWidth={0.9}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.999 8.667l3.333 2 1.333-2M4.832 3.666a.167.167 0 110 .334.167.167 0 010-.334M6.831 3.333a.167.167 0 110 .334.167.167 0 010-.334M8.834 3.666a.167.167 0 110 .334.167.167 0 010-.334"
                stroke="currentColor"
                strokeWidth={0.9}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
