import React from "react";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js"; // Dont remove this even if unused. It is required for one prop
import "tippy.js/dist/tippy.css"; // If we customize the style, the change this and import our own style

export const Tooltip = (settings) => {
    return (
        <Tippy {...settings} className="xola-tooltip text-white" plugins={[followCursor]}>
            <span>{settings.children}</span>
        </Tippy>
    );
};
