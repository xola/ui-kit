import { Dot } from "./Dot";
import { range } from "lodash";
import PropTypes from "prop-types";
import React from "react";

export const DotProgress = ({ current, total }) => {
    if (total <= 1) {
        return null;
    }

    return (
        <div className="w-full space-x-2 text-center">
            {range(0, total).map((index) => {
                const currentValue = current <= 0 ? 0 : current >= total ? current - 1 : current;
                const color = index === currentValue ? "primary" : "secondary";
                return <Dot key={index} color={color} size="medium" />;
            })}
        </div>
    );
};

DotProgress.propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
};
