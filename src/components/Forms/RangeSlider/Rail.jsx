import React from "react";

export const Rail = ({ coloredRailPositions }) => {
    let coloredRail = null;

    if (Array.isArray(coloredRailPositions) && coloredRailPositions.length === 2) {
        const [startPos, endPos] = coloredRailPositions;
        coloredRail = (
            <div className="ui-range-slider-rail-colored" style={{ left: `${startPos}%`, right: `${100 - endPos}%` }} />
        );
    }

    return <div className="ui-range-slider-rail">{coloredRail}</div>;
};
