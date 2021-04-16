import clsx from "clsx";
import React from "react";
import Tippy, { followCursor } from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // If we customize the style, the change this and import our own style
import "tippy.js/dist/border.css";
import "./Popover.module.css";

export const Popover = (settings) => {
    const config = Object.assign({}, settings, { allowHTML: true, interactive: true });
    return (
        <Tippy {...config} content={settings.content}>
            <span>{config.children}</span>
        </Tippy>
    );
};

Popover.Content = ({ className, children }) => {
    const classes = clsx(className, "popover max-w-xs px-3 py-1");

    return (
        <div className={classes}>
            {children}
        </div>
    );
};
