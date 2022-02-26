import React from "react";
import { createIcon } from "../helpers/icon";

export const DuplicateIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={14} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M3.111 9.222h-.309A.803.803 0 012 8.42V2.802C2 2.36 2.36 2 2.802 2H8.42c.444 0 .803.36.803.802v.31"
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.197 12H5.58a.803.803 0 01-.803-.802V5.58c0-.443.36-.802.803-.802h5.617c.443 0 .803.36.803.802v5.617c0 .444-.36.803-.803.803z"
                stroke="currentColor"
                strokeMiterlimit={10}
            />
            <path
                d="M8.389 7v2.778M9.778 8.389H7"
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

DuplicateIcon.tags = ["copy"];