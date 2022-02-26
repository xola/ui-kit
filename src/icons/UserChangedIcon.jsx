import React from "react";
import { createIcon } from "../helpers/icon";

export const UserChangedIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.956 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2.25 11.412a2.647 2.647 0 012.647-2.647h1.52M11.417 9.217h.832v-.832M9.556 11.018h-.831v.832"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.252 10.745a1.817 1.817 0 01-.433.704 1.883 1.883 0 01-2.984-.431M12.14 9.217a1.883 1.883 0 00-2.984-.431 1.824 1.824 0 00-.434.703"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

UserChangedIcon.tags = ["guest", "change quantity"];
