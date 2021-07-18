import clsx from "clsx";
import React from "react";
import Tippy from "@tippyjs/react";
import PropTypes from "prop-types";
import { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/border.css";
import styles from "./Popover.module.css";

// Padding for various sizes
const sizes = {
    small: "p-6",
    medium: "p-5",
    large: "p-4",
};

export const Popover = ({ className, children, ...rest }) => {
    return (
        <Tippy
            interactive
            className={clsx("popover", styles.main, "p-0 !border-gray-light !rounded-lg", className)}
            plugins={[followCursor]}
            {...rest}
        >
            <span>{children}</span>
        </Tippy>
    );
};

Popover.Content = ({ className, size = "large", children }) => {
    return <div className={clsx("popover-content", sizes[size], className)}>{children}</div>;
};

Popover.Content.displayName = "Popover.Content";

Popover.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Popover.Content.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(Object.keys(sizes)),
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
