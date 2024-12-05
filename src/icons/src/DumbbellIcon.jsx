import React from "react";
import { createIcon } from "./helpers/icon";

export const DumbbellIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" {...props}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.8"
                d="M9.745 2.203a.687.687 0 000 .972l2.004 2.003a.687.687 0 10.972-.972l-2.004-2.003a.688.688 0 00-.972 0z"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.8"
                d="M7.801 2.202a.687.687 0 000 .973l3.949 3.948a.687.687 0 10.972-.974L8.775 2.202a.688.688 0 00-.974 0zM2.812 9.137a.688.688 0 01.972 0l2.004 2.003a.688.688 0 01-.973.972L2.812 10.11a.687.687 0 010-.972z"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.8"
                d="M2.812 7.192a.688.688 0 01.972 0l3.948 3.948a.688.688 0 11-.973.973L2.812 8.166a.688.688 0 010-.974z"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.8"
                d="M9.289 4.663L5.27 8.68l.973.972 4.017-4.017-.972-.972z"
            />
        </svg>
    );
});

DumbbellIcon.tags = ["weight", "exercise", "gym"];
