import React from "react";
import { createIcon } from "../helpers/icon";

export const StackIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M11.518 8.4H3.915a.249.249 0 00-.249.249v2.203c0 .137.111.248.249.248h7.602a.248.248 0 00.249-.248V8.649a.249.249 0 00-.248-.249zM12.418 5.7H4.815a.249.249 0 00-.249.249v2.203c0 .137.111.248.249.248h7.603a.249.249 0 00.248-.248V5.949a.249.249 0 00-.248-.249zM11.518 3H3.915a.249.249 0 00-.249.249V5.45c0 .138.111.249.249.249h7.602a.249.249 0 00.249-.249V3.25A.249.249 0 0011.518 3z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});
