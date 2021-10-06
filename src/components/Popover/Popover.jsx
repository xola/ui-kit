import Tippy from "@tippyjs/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Children } from "react";
import { followCursor } from "tippy.js";
import "tippy.js/dist/border.css";
import "tippy.js/dist/tippy.css";
import styles from "./Popover.module.css";

export const Popover = ({ className, children, ...rest }) => {
    const childrenArray = Children.toArray(children);
    const items = childrenArray.filter((child) => child.type === Popover.Content);
    const innerContent = childrenArray.filter((child) => child.type !== Popover.Content);

    return (
        <Tippy
            interactive
            zIndex={10}
            content={items}
            className={clsx("ui-popover", styles.main, "!border-gray-light !rounded-lg", className)}
            plugins={[followCursor]}
            {...rest}
        >
            <span>{innerContent}</span>
        </Tippy>
    );
};

Popover.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

const Content = ({ className, children }) => {
    return <div className={clsx("ui-popover-content", className)}>{children}</div>;
};

Content.displayName = "Popover.Content";
Content.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Popover.Content = Content;
