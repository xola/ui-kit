import React from "react";
import { createIcon } from "./helpers/icon";

export const AddNoteIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                d="M4.014 4.642H9.04M4.014 7.155h3.141M11.083 9.167V13M9.167 11.083H13M11.553 6.976v-4.22c0-.694-.562-1.256-1.257-1.256h-7.54c-.694 0-1.256.562-1.256 1.257v8.168c0 .694.562 1.256 1.257 1.256h4.22"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
