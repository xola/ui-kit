import PropTypes from "prop-types";
import React from "react";
import { Tooltip } from "../..";
import { WarningDiamondIcon } from "../../icons";

export const ValuePopoverText = ({ value, error }) => {
    return (
        <span>
            {error ? (
                <Tooltip content={error}>
                    <span>
                        <WarningDiamondIcon className="mr-1 text-danger" />
                    </span>
                </Tooltip>
            ) : null}

            {value}
        </span>
    );
};

ValuePopoverText.propTypes = {
    value: PropTypes.node,
    error: PropTypes.node,
};
