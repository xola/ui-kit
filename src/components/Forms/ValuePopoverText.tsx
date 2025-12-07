import React from "react";
import { Tooltip } from "../..";
import { WarningDiamondIcon } from "../../icons";

export interface ValuePopoverTextProps {
    value?: React.ReactNode;
    error?: React.ReactNode | null;
}

export const ValuePopoverText = ({ value, error }: ValuePopoverTextProps) => {
    return (
        <span>
            {error ? (
                <Tooltip content={error} className="">
                    <span>
                        <WarningDiamondIcon className="mr-1 text-danger" />
                    </span>
                </Tooltip>
            ) : null}

            {value}
        </span>
    );
};
