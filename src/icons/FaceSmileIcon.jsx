import React from "react";
import { createIcon } from "../helpers/icon";

export const FaceSmileIcon = createIcon((props) => {
    return (
        <svg viewBox="0 0 14 14" width={15} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.736 5.92h-.005c.069-.005.133.06.133.131a.14.14 0 01-.133.136c-.075 0-.133-.065-.139-.136a.134.134 0 01.128-.141M10.595 5.92h-.005a.133.133 0 00-.133.137c0 .07.059.135.133.13.07-.005.133-.065.128-.141a.137.137 0 00-.133-.136M4.47 9.046l-.005-.005c.735 1.799 2.76 2.652 4.527 1.902a3.51 3.51 0 001.864-1.902" />
                <path d="M7.666.893c-.804 0-1.6.162-2.344.476a6.118 6.118 0 00-1.987 1.355 6.26 6.26 0 00-1.328 2.028 6.362 6.362 0 000 4.784 6.261 6.261 0 001.328 2.027 6.118 6.118 0 001.987 1.355 6.017 6.017 0 004.688 0 6.117 6.117 0 001.987-1.354 6.26 6.26 0 001.328-2.028 6.362 6.362 0 000-4.784 6.26 6.26 0 00-1.328-2.028 6.117 6.117 0 00-1.987-1.355A6.019 6.019 0 007.666.893v0z" />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" transform="translate(.666)" d="M0 0h14v14H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
