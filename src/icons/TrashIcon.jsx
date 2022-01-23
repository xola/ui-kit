import React from "react";
import { createIcon } from "../helpers/icon";

export const TrashIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.495 3.324h10.321M8.761 1.85H6.55v0a.737.737 0 00-.738.737v.737H9.5v-.737 0a.737.737 0 00-.738-.737v0zM6.55 9.591V5.905M8.761 9.591V5.905M11.03 11.495v0a.737.737 0 01-.735.677H5.017v0a.737.737 0 01-.735-.677L3.6 3.325h8.11l-.68 8.17z" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(1.757 1.113)" d="M0 0h11.796v11.796H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
