import React from "react";
import { createIcon } from "./helpers/icon";

export const WriteIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.166 11h9M11.697 4.746l-5.709 5.708v0a.379.379 0 01-.193.104l-2.176.435v0a.38.38 0 01-.446-.447l.435-2.174v0a.383.383 0 01.104-.194L9.421 2.47v0a1.605 1.605 0 012.269 0l.007.007v0a1.606 1.606 0 010 2.27v0z"
            />
        </svg>
    );
});

WriteIcon.tags = ["pen", "waiver"];
