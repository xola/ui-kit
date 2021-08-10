import React from "react";
import { createIcon } from "../helpers/icon";

export const PrintIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#prefix__clip0)" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6.517 11.34H8.8M6.516 9.627h2.285M4.333 9.348H2.762A1.047 1.047 0 011.72 8.303V5.168c0-.579.464-1.043 1.043-1.043h9.913c.574 0 1.038.464 1.038 1.043v3.13h-.005a1.047 1.047 0 01-1.049 1.039h-1.565M4.332 3.573V1h5.002c.135 0 .266.052.365.151l1.257 1.26-.005-.005c.094.093.151.23.151.365v.802" />
                <path d="M11.115 12.478a.523.523 0 01-.522.522H4.85a.524.524 0 01-.522-.527v0-4.696h6.783l.005 4.701z" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
