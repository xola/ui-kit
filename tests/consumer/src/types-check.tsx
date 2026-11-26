import { CheckIcon } from "@xola/icons";
import type { IconProps } from "@xola/icons";
import { Button, formatPhoneNumber, Popover, RangeSlider, Sidebar, Tooltip } from "@xola/ui-kit";

const checkIconProps: IconProps = { size: "small" };

/**
 * Compiled with `skipLibCheck: false` so an unresolvable declaration in the published package fails here.
 * Most components are declared as `any`; Sidebar, Tooltip, Popover and RangeSlider have real prop types, so the
 * `@ts-expect-error` checks target them: a prop the components do not accept must fail type-check. Add further checks below.
 */
export const Usage = () => (
    <>
        <Button color="primary">x</Button>
        <CheckIcon {...checkIconProps} />
        <span>{formatPhoneNumber("5555555555")}</span>
        <Tooltip content="hint">
            <span>y</span>
        </Tooltip>
        <Tooltip content="x" open placement="top-start">
            <span>y</span>
        </Tooltip>
        {/* @ts-expect-error `visible` is not a prop, use `open` */}
        <Tooltip content="x" visible>
            <span>y</span>
        </Tooltip>
        {/* @ts-expect-error `appendTo` is not a prop, Radix portals to document.body */}
        <Popover appendTo={document.body}>
            <span>y</span>
        </Popover>
        {/* @ts-expect-error `tooltipCustomFormatter` is not a prop, use `formatTooltip` */}
        <RangeSlider tooltipCustomFormatter={[]} values={[1, 2]} min={0} max={10} />
        {/* @ts-expect-error `onMount` is not a prop, use `onOpenChange` */}
        <Sidebar.Menu content="x" onMount={() => {}}>
            <span>y</span>
        </Sidebar.Menu>
        {/* @ts-expect-error variant is the SidebarVariant union, "nope" is not a member */}
        <Sidebar variant="nope">z</Sidebar>
    </>
);
