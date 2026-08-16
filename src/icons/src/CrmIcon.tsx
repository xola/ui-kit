import React from "react";
import { createIcon } from "./helpers/icon";

export const CrmIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 20 15" width={20} height={15} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M14.9804 8.95671C16.0791 8.95671 16.9697 8.0661 16.9697 6.96748C16.9697 5.86886 16.0791 4.97825 14.9804 4.97825C13.8818 4.97825 12.9912 5.86886 12.9912 6.96748C12.9912 8.0661 13.8818 8.95671 14.9804 8.95671Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.6536 14.3996H18.9582C18.3983 12.2042 16.1648 10.8784 13.9695 11.4383C13.6113 11.5296 13.2671 11.669 12.9463 11.8525"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.7251 14.3996C10.7251 11.714 8.54809 9.53699 5.86257 9.53699C3.17704 9.53699 1 11.714 1 14.3996H10.7251Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.81279 6.74647C7.39969 6.74647 8.68613 5.46004 8.68613 3.87314C8.68613 2.28624 7.39969 0.999802 5.81279 0.999802C4.22589 0.999802 2.93945 2.28624 2.93945 3.87314C2.93945 5.46004 4.22589 6.74647 5.81279 6.74647Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

CrmIcon.tags = ["user"];
