import Tippy from "@tippyjs/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { followCursor } from "tippy.js";
import "tippy.js/dist/border.css";
import "tippy.js/dist/tippy.css";
import styles from "./Popover.module.css";

// Padding for various sizes
const sizes = {
    small: "p-6",
    medium: "p-5",
    large: "p-4",
};

export const Popover = ({ className, children, ...rest }) => {
    delete rest.size; // size is not a valid prop for tippy.js Without this tippy will throw a massive console error
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

Popover.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Popover.Content = ({ className, size = "large", children }) => {
    return <div className={clsx("popover-content", sizes[size], className)}>{children}</div>;
};

Popover.Content.displayName = "Popover.Content";

Popover.Content.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(Object.keys(sizes)),
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
