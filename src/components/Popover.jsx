import clsx from "clsx";
import React from "react";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css"; // If we customize the style, the change this and import our own style
import "tippy.js/dist/border.css";

// This used to be a CSS module, but the compiled version
// generates random class names that we can't reference here.
// It's probably a bug in Storybook or a misconfiguration.
// TODO: Make it a CSS module later if possible.
import "./Popover.css";

export const Popover = (settings) => {
    const config = Object.assign({}, settings, { allowHTML: true, interactive: true });
    return (
        <Tippy {...config} className="xola-popover" content={settings.content} plugins={[followCursor]}>
            <span>{config.children}</span>
        </Tippy>
    );
};

Popover.Content = ({ className, children }) => {
    const classes = clsx(className, "popover max-w-xs px-3 py-1");

    return <div className={classes}>{children}</div>;
};
Popover.Content.displayName = "Popover.Content";
