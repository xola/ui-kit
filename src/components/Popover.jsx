import clsx from "clsx";
import React from "react";
import Tippy from "@tippyjs/react";
import PropTypes from "prop-types";
import { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/border.css";
import styles from "./Popover.module.css";

export const Popover = ({ className, children, ...rest }) => {
    return (
        <Tippy
            interactive
            className={clsx(className, styles.main, "!border-gray-light !rounded-lg")}
            plugins={[followCursor]}
            {...rest}
        >
            <span>{children}</span>
        </Tippy>
    );
};

Popover.Content = ({ className, children }) => {
    // TODO: Should we add padding by default?
    // Use case: https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/Xola---Design-System-(Desktop-App)?node-id=374%3A774
    return <div className={clsx(className, "max-w-lg px-3 py-3")}>{children}</div>;
};

Popover.Content.displayName = "Popover.Content";

Popover.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Popover.Content.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
