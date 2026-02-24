import React from "react";
import { createIcon } from "./helpers/icon";

export const XolaBotIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 18 18" width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M9 16.882a5.5 5.5 0 100-11 5.5 5.5 0 000 11z" stroke="currentColor" />
            <mask
                id="prefix__a"
                style={{
                    maskType: "alpha",
                }}
                maskUnits="userSpaceOnUse"
                x={3}
                y={5}
                width={12}
                height={13}
            >
                <path d="M9 16.882a5.5 5.5 0 100-11 5.5 5.5 0 000 11z" fill="#fff" stroke="#fff" />
            </mask>
            <g mask="url(#prefix__a)" stroke="currentColor">
                <path d="M4 13l1.5-2 2 2M14 13.5l-3.5-4-5 6.5" />
            </g>
            <rect x={4.5} y={1.5} width={9} height={3} rx={0.5} stroke="currentColor" />
            <circle cx={7.5} cy={3} r={0.5} fill="currentColor" />
            <circle cx={10.5} cy={3} r={0.5} fill="currentColor" />
        </svg>
    );
});
