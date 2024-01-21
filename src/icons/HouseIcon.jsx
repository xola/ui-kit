import React from "react";
import { createIcon } from "./helpers/icon";

export const HouseIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M1.949 5.634L7 1.5l5.051 4.134c.284.231.448.579.448.945v4.699c0 .675-.547 1.222-1.222 1.222H2.722A1.222 1.222 0 011.5 11.278V6.58c0-.367.164-.715.449-.946v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.722 12V8.333c0-.675-.547-1.222-1.222-1.222H6.278c-.675 0-1.222.547-1.222 1.222V12"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

HouseIcon.tags = ["house", "pick-up", "pickup", "location"];
