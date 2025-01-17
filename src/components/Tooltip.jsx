import Tippy from "@tippyjs/react";
import PropTypes from "prop-types";
import React from "react";
import { followCursor } from "tippy.js"; // Dont remove this even if unused. It is required for one prop
import "tippy.js/dist/tippy.css"; // If we customize the style, the change this and import our own style
// Do not remove these https://atomiks.github.io/tippyjs/v6/animations/
import "tippy.js/animations/perspective.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/shift-toward.css";

// TODO: Implement "as='div'"
export const Tooltip = ({ children, className, contentClassName, content, ...rest }) => {
    const tooltipContent = contentClassName ? <span className={contentClassName}>{content}</span> : content;
    return (
        <Tippy content={tooltipContent} {...rest} className="ui-tooltip text-white" plugins={[followCursor]}>
            <span className={className}>{children}</span>
        </Tippy>
    );
};

Tooltip.propTypes = {
    content: PropTypes.node.isRequired, // string, an element, or an array of elements
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
