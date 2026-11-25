import { Button, Sidebar, Tooltip } from "@xola/ui-kit";

/**
 * Compiled with `skipLibCheck: false` so an unresolvable declaration in the published package fails here.
 * Most components are declared as `any`; only Sidebar has real prop types, so the `@ts-expect-error` checks
 * target it. Add further checks below.
 */
export const Usage = () => (
    <>
        <Button color="primary">x</Button>
        <Tooltip content="hint">
            <span>y</span>
        </Tooltip>
        {/* @ts-expect-error variant is the SidebarVariant union, "nope" is not a member */}
        <Sidebar variant="nope">z</Sidebar>
    </>
);
