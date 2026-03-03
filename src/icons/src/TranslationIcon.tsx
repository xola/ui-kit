import React from "react";
import { createIcon } from "./helpers/icon";

export const TranslationIcon = createIcon((props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
            <g stroke="#222324" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} clipPath="url(#a)">
                <path d="M7.314 3.357v2.969M20.18 19.19l-3.959-8.906-3.958 8.907M13.143 17.212h6.155M3.357 14.242c4.052-.32 7.596-3.864 7.918-7.916H3.358" />
                <path d="M11.274 14.242c-2.533-.2-4.748-2.415-4.948-4.947" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M2 2h19v19H2z" />
                </clipPath>
            </defs>
        </svg>
    );
});

TranslationIcon.tags = ["translation", "i18n", "language", "locale", "localize"];
