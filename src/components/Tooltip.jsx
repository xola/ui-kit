import React from "react";
import Tippy from "@tippyjs/react";
import PropTypes from "prop-types";
import { followCursor } from "tippy.js"; // Dont remove this even if unused. It is required for one prop
import "tippy.js/dist/tippy.css"; // If we customize the style, the change this and import our own style

// TODO: Implement "as='div'"
export const Tooltip = ({ children, className, content, ...rest }) => {
    return (
        <Tippy content={content} {...rest} className="text-white xola-tooltip" plugins={[followCursor]}>
            <span className={className}>{children}</span>
        </Tippy>
    );
};

Tooltip.propTypes = {
    content: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
