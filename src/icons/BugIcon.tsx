import React from "react";
import { createIcon } from "../helpers/icon";

export const BugIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 10" width={14} height={10} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.79883 9.5C8.8699 9.5 10.5488 7.70914 10.5488 5.5C10.5488 3.29086 8.8699 1.5 6.79883 1.5C4.72776 1.5 3.04883 3.29086 3.04883 5.5C3.04883 7.70914 4.72776 9.5 6.79883 9.5Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M5.79883 1.5L4.79883 0.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.79883 1.5L8.79883 0.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M11.7988 2.5C10.4727 3.82608 8.67419 4.57107 6.79883 4.57107C4.92346 4.57107 3.12491 3.82608 1.79883 2.5"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.65576 7.67053C2.96863 8.0098 2.34142 8.45885 1.79883 9"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.7993 9C11.2567 8.45886 10.6295 8.00981 9.94238 7.67053"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M3.04883 5.75H1.29883" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.2988 5.75H10.5488" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
});

BugIcon.tags = ["bug", "problem", "issue"];
