import Tippy from "@tippyjs/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Children } from "react";
import { followCursor } from "tippy.js";
import "tippy.js/dist/border.css";
import "tippy.js/dist/tippy.css";
import { getChildrenByType } from "../../helpers/children";
import styles from "./Popover.module.css";
import scrollFix from "./PopoverScroll.module.css";

export const Popover = ({ className, children, skidding = 0, distance = 10, ...rest }) => {
    const content = getChildrenByType(children, Popover.Content);
    const target = Children.toArray(children).filter((child) => child.type !== Popover.Content);

    return (
        <Tippy
            interactive
            zIndex={50}
            content={content}
            className={clsx(
                "ui-popover",
                scrollFix,
                styles.main,
                "!rounded-lg !border-gray-light shadow-xl",
                className,
            )}
            plugins={[followCursor]}
            offset={[skidding ?? 0, distance ?? 10]}
            {...rest}
        >
            <span>{target}</span>
        </Tippy>
    );
};

Popover.propTypes = {
    className: PropTypes.string,
    skidding: PropTypes.number,
    distance: PropTypes.number,
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
