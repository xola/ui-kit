import React from "react";
import { createIcon } from "../helpers/icon";

export const ReceptionBellIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14" {...props}>
            <path
                d="M7.071 2.5v2.714M6.093 2.5h1.956M2.37 10.642a.68.68 0 01-.672-.775 5.428 5.428 0 0110.745 0 .68.68 0 01-.67.776l-9.403-.001z"
                stroke="#222324"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
