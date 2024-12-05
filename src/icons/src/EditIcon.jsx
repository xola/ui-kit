import React from "react";
import { createIcon } from "./helpers/icon";

export const EditIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M10.268 5.813l-2.081-2.08M3.849 12H2v-1.849c0-.15.06-.295.167-.402l7.582-7.582a.568.568 0 01.804 0l1.28 1.28a.568.568 0 010 .804L4.25 11.833a.567.567 0 01-.402.167v0z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

EditIcon.tags = ["pencil"];
