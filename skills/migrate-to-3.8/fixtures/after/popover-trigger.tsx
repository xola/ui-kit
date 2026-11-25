import { Popover } from "@xola/ui-kit";

export const PopoverTriggers = () => (
    <>
        <Popover openOn="click" distance={18}>
            <button type="button">Filters</button>
            <Popover.Content>Pick a filter</Popover.Content>
        </Popover>
        <Popover placement="bottom">
            <span>Hover for details</span>
            <Popover.Content>Details</Popover.Content>
        </Popover>
    </>
);
