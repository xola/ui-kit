import clsx from "clsx";
import React from "react";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";

export const Handle = ({ position, value, tooltipLabel, isActive, ...props }) => (
    <Tippy content={`${value}${tooltipLabel}`} visible={true} className="text-white"  plugins={[followCursor]}>
        <div
            className={clsx("ui-range-slider-handle", isActive ? "ui-range-slider-handle-active" : "")}
            style={{ left: `${position}%` }}
            draggable="false"
            {...props}
        ></div>
    </Tippy>
);
