import Tippy from "@tippyjs/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { followCursor } from "tippy.js";
import "tippy.js/dist/border.css";
import "tippy.js/dist/tippy.css";
import styles from "./Popover.module.css";

export const Popover = ({ content, className, children, ...rest }) => {
    return (
        <Tippy
            interactive
            content={content}
            className={clsx("popover", styles.main, "!border-gray-light !rounded-lg", className)}
            plugins={[followCursor]}
            {...rest}
        >
            <span>{children}</span>
        </Tippy>
    );
};

Popover.propTypes = {
    content: PropTypes.object.isRequired,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node]).isRequired,
};

Popover.Content = ({ className, children }) => {
    return <div className={clsx("popover-content", className)}>{children}</div>;
};

Popover.Content.displayName = "Popover.Content";
Popover.Content.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node]).isRequired,
};
