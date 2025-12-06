import React from "react";
import { createIcon } from "./helpers/icon";

export const EditNoteIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.214 6.88a.987.987 0 111.396 1.395l-3.312 3.31a.573.573 0 01-.405.168H7.737v-1.156c0-.152.06-.298.168-.406l3.31-3.312v0zM4.295 4.868h4.59M4.295 7.163h2.868M11.879 9.01l-1.4-1.4M11.179 4.868v-1.72c0-.635-.514-1.148-1.148-1.148H3.147C2.513 2 2 2.513 2 3.147v7.458c0 .634.513 1.147 1.147 1.147h2.295"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

EditNoteIcon.tags = ["pencil"];
