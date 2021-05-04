import React from "react";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js"; // Dont remove this even if unused. It is required for one prop
import "tippy.js/dist/tippy.css"; // If we customize the style, the change this and import our own style

export const Tooltip = ({ children, ...rest }) => {
    return (
        <Tippy {...rest} className="text-white xola-tooltip" plugins={[followCursor]}>
            {/* If you put a Badge inside the Tooltip it will cause a layout issue. To be fixed */}
            <span>{children}</span>
        </Tippy>
    );
};
