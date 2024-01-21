import React from "react";
import { WarningDiamondIcon, Tooltip } from "../..";

export const ValuePopoverText = ({ value, error }) => {
    return (
        <span>
            {error ? (
                <Tooltip content={error}>
                    <span>
                        <WarningDiamondIcon className="text-danger mr-1" />
                    </span>
                </Tooltip>
            ) : null}

            {value}
        </span>
    );
};
