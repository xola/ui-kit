import { Popover } from "@xola/ui-kit";

const handleClickOutside = () => undefined;

export const HoverPopover = () => (
    <Popover placement="bottom" distance={12} onClickOutside={handleClickOutside}>
        <span>Hover for details</span>
        <Popover.Content>Details</Popover.Content>
    </Popover>
);
