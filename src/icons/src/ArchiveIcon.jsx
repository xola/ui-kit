import React from "react";
import { createIcon } from "./helpers/icon";

export const ArchiveIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.916 4.083h-10.5a.584.584 0 01-.583-.583V2.333c0-.322.261-.583.583-.583h10.5c.322 0 .583.261.583.583V3.5a.584.584 0 01-.583.583zM5.916 6.417h3.5M12.722 4.083v7c0 .645-.522 1.167-1.167 1.167H3.777a1.166 1.166 0 01-1.167-1.167v-7" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
