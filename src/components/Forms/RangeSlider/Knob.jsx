import clsx from "clsx";
import React from "react";

export const Knob = ({ position, isColored }) => {
    return (
        <div className={clsx("ui-slider-knob", isColored ? "!bg-primary" : "")} style={{ left: `${position}%` }}>
            {" "}
        </div>
    );
};
