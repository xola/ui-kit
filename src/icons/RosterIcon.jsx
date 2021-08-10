import React from "react";
import { createIcon } from "../helpers/icon";

export const RosterIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M6.777 4.262h3.67M4.942 7.014h5.504M4.942 9.766h5.504M3.107 2.427a.909.909 0 01.908-.927h7.34-.01a.906.906 0 01.918.908v9.175a.92.92 0 01-.918.917H3.997a.922.922 0 01-.918-.927v0l.028-9.146z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
