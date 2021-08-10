import React from "react";
import { createIcon } from "../helpers/icon";

export const AddSquareIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M13.065 2.356a.455.455 0 00-.456-.456H4.391c-.255 0-.456.2-.456.456v8.214c0 .25.2.451.456.451h8.213-.004a.458.458 0 00.456-.456l.01-8.209zM8.515 3.212v6.125M11.578 6.275H5.453"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.94 3.725h-.918c-.255 0-.456.2-.456.456v7.757-.004a.45.45 0 00.452.456h7.757-.005c.251 0 .456-.205.456-.456v-.913"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
