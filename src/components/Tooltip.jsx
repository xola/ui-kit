import React from "react";
import Tippy, { followCursor } from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // If we customize the style, the change this and import our own style

export const Tooltip = (settings) => {
    return (
        <Tippy {...settings}>
            <span>{settings.children}</span>
        </Tippy>
    );
};
