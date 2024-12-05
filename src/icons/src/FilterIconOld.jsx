import React from "react";
import { createIcon } from "./helpers/icon";

// This icon is not used and not exported, but just keeping it around for backup incase someone changes their minds
export const FilterIconOld = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M8.563 7.938l3.254-3.255A.624.624 0 0012 4.241V2.625A.625.625 0 0011.375 2h-8.75A.625.625 0 002 2.625v1.616c0 .166.066.325.183.442l3.255 3.255M5.438 7.938v3.905c0 .508.477.881.97.758l1.563-.39a.782.782 0 00.591-.758V7.938"
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

FilterIconOld.tags = ["filter"];
