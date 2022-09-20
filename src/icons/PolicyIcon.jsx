import React from "react";
import { createIcon } from "../helpers/icon";

export const PolicyIcon = createIcon((props) => {
    return (
        <svg width={13} height={14} viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M11.5029 6.46253C11.5029 9.44339 9.26252 12.2313 6.25146 12.908C3.24041 12.2313 1 9.44339 1 6.46253V3.87815C1 3.34447 1.32297 2.86462 1.81595 2.66309L5.09811 1.31937C5.83726 1.0161 6.66633 1.0161 7.40416 1.31937L10.6863 2.66309C11.1806 2.86593 11.5023 3.34447 11.5023 3.87815V6.46253H11.5029Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
});

PolicyIcon.tags = ["privacy", "policy", "shield"];
