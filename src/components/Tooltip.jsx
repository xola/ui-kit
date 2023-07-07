import React from "react";
import Tippy from "@tippyjs/react";
import PropTypes from "prop-types";
import { followCursor } from "tippy.js"; // Dont remove this even if unused. It is required for one prop
import "tippy.js/dist/tippy.css"; // If we customize the style, the change this and import our own style

// TODO: Implement "as='div'"
export const Tooltip = ({ children, className, content, enabled = true, ...rest }) => {
    return enabled ? (
        <Tippy content={content} {...rest} className="ui-tooltip text-white" plugins={[followCursor]}>
            <span className={className}>{children}</span>
        </Tippy>
    ) : (
        <span className={className}>{children}</span>
    );
};

Tooltip.propTypes = {
    content: PropTypes.node.isRequired, // string, an element, or an array of elements
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
