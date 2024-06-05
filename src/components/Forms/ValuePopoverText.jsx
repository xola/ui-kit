import React from "react";
import { Tooltip, WarningDiamondIcon } from "../..";

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
