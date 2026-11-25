import { Popover } from "@xola/ui-kit";
import type { PopoverProps } from "@xola/ui-kit";
import React from "react";
import type { Except } from "type-fest";

interface HelpPopoverProps extends Except<PopoverProps, "children"> {
    label: string;
}

export const HelpPopover = ({ label, ...rest }: HelpPopoverProps) => (
    <Popover {...rest}>
        <span>{label}</span>
    </Popover>
);
