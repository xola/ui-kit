import React from "react";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js"; // Dont remove this even if unused. It is required for one prop
import "tippy.js/dist/tippy.css"; // If we customize the style, the change this and import our own style

export const Tooltip = ({ children, ...rest }) => {
    return (
        <Tippy {...rest} className="text-white xola-tooltip" plugins={[followCursor]}>
            {/* Needs a fragment otherwise causes problem when you wrap another component like Badge */}
            <>{children}</>
        </Tippy>
    );
};
