import { Popover } from "@xola/ui-kit";

export const PopoverTriggers = () => (
    <>
        <Popover trigger="click" offset={[0, 18]} appendTo={document.body}>
            <button type="button">Filters</button>
            <Popover.Content>Pick a filter</Popover.Content>
        </Popover>
        <Popover trigger="mouseenter" placement="bottom">
            <span>Hover for details</span>
            <Popover.Content>Details</Popover.Content>
        </Popover>
    </>
);
