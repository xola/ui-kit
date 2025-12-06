import React from "react";
import { Tooltip, WarningDiamondIcon } from "../..";

export interface ValuePopoverTextProps {
    readonly value?: React.ReactNode;
    readonly error?: React.ReactNode | null;
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
