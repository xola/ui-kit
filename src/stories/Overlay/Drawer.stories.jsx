import React, { useState } from "react";
import { expect, fn, spyOn, waitFor, within } from "storybook/test";
import { Button, Drawer } from "../..";
import { expectFocusInside, getPortalCanvas, waitForClosed } from "../helpers";

const DrawerStories = {
    title: "Overlay/Drawers",
    component: Drawer,
    parameters: {
        docs: {
            description: {
                component: "The Drawer component is a dynamic sidebar that is used to show data on the right side",
            },
        },
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/YCbs6YcoYUNYGq9VhrEFQ0/13-Admin?node-id=960%3A27700&viewport=1028%2C673%2C0.38",
        },
    },
    argTypes: {
        isOpen: {
            description: "Open or close the sidebar",
            type: { required: true },
            control: { type: "boolean" },
        },
        title: {
            description: "The title of the Drawer",
            type: { required: true },
            control: { type: "text" },
        },
        content: {
            description: "The body of the Drawer",
            control: { type: "text" },
        },
        size: {
            description: "The width of the drawer when it opens",
            options: ["small", "medium", "large"],
            control: { type: "select" },
        },
        onClose: {
            description: "Function to callback to close the Drawer",
            control: { type: "function" },
        },
    },
};

export const Drawers = ({ title = "Hello World", size, content = "Lorem Ipsum. Click the X to close", onClose }) => {
    const [open, setOpen] = useState(false);

    const handleClose = (value) => {
        onClose(value);
        setOpen(false);
    };

    return (
        <div>
            <Button size="large" onClick={() => setOpen(true)}>
                Click Me to open the Drawer
            </Button>
            <Drawer title={title} content={content} size={size} isOpen={open} onClose={handleClose} />
        </div>
    );
};

Drawers.args = {
    onClose: fn(),
};

/**
 * Reads the panel offset before the first animation frame advances its enter keyframes.
 * MutationObserver microtasks run before that frame, however slow the test runner is.
 */
const observePanelStartOffset = (ownerDocument) => {
    return new Promise((resolve) => {
        const observer = new MutationObserver(() => {
            const container = ownerDocument.querySelector(".ui-drawer-container");
            if (!container) {
                return;
            }

            observer.disconnect();
            const { right: panelRight } = container.firstElementChild.getBoundingClientRect();
            const { right: containerRight } = container.getBoundingClientRect();
            resolve(panelRight - containerRight);
        });

        observer.observe(ownerDocument.body, { childList: true, subtree: true });
    });
};

Drawers.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const { ownerDocument } = canvasElement;
    const body = getPortalCanvas(canvasElement);
    const launcher = canvas.getByRole("button", { name: "Click Me to open the Drawer" });
    await expect(body.queryByText("Hello World")).not.toBeInTheDocument();

    const panelStartOffset = observePanelStartOffset(ownerDocument);
    await userEvent.click(launcher);
    const dialog = await body.findByRole("dialog");

    // The panel starts translated past the right edge and slides in until it sits flush with its container
    const container = dialog.closest(".ui-drawer").querySelector(".ui-drawer-container");
    const panel = container.firstElementChild;
    await expect(container).toHaveStyle({ right: "0px" });
    await expect(await panelStartOffset).toBeGreaterThan(0);
    await waitFor(
        () => expect(panel.getBoundingClientRect().right).toBeCloseTo(container.getBoundingClientRect().right, 0),
        { timeout: 2000 },
    );

    await expect(body.getByText("Hello World")).toBeInTheDocument();
    await expect(body.getByText("Lorem Ipsum. Click the X to close")).toBeInTheDocument();

    // Opening focuses the first focusable element inside, not the dialog container itself
    await expectFocusInside(dialog, ownerDocument);

    for (let press = 0; press < 3; press++) {
        await userEvent.tab();
        await expectFocusInside(dialog, ownerDocument);
    }

    await userEvent.keyboard("{Escape}");
    await waitForClosed(body.queryByText("Hello World"));
    await expect(args.onClose).toHaveBeenCalledExactlyOnceWith(false);
    await waitFor(() => expect(launcher).toHaveFocus());

    await userEvent.click(launcher);
    await body.findByText("Hello World");
    await userEvent.click(ownerDocument.querySelector(".ui-drawer-overlay"));
    await waitForClosed(body.queryByText("Hello World"));
    await expect(args.onClose).toHaveBeenCalledTimes(2);
    await expect(args.onClose).toHaveBeenLastCalledWith(false);
    await waitFor(() => expect(launcher).toHaveFocus());

    await userEvent.click(launcher);
    const reopened = await body.findByRole("dialog");
    await userEvent.click(within(reopened).getByRole("button"));
    await waitForClosed(body.queryByText("Hello World"));
    await expect(args.onClose).toHaveBeenCalledTimes(3);
    await expect(args.onClose).toHaveBeenLastCalledWith(expect.objectContaining({ type: "click" }));
    await waitFor(() => expect(launcher).toHaveFocus());
};

const handleOpenDrawerClose = () => {};

const OpenDrawer = ({ size = "medium", position = "right" }) => {
    return (
        <Drawer
            isOpen
            size={size}
            position={position}
            title="Open drawer"
            content="Open drawer body"
            onClose={handleOpenDrawerClose}
        />
    );
};

const expectOpenDrawer = async ({ canvasElement }) => {
    const body = getPortalCanvas(canvasElement);
    const dialog = await body.findByRole("dialog");
    const drawer = dialog.closest(".ui-drawer");

    await waitFor(() => {
        expect(dialog).toBeVisible();
        expect(drawer.getAnimations({ subtree: true })).toHaveLength(0);
    });
};

export const OpenSmall = () => <OpenDrawer size="small" />;
OpenSmall.play = expectOpenDrawer;

export const OpenMedium = () => <OpenDrawer />;
OpenMedium.play = expectOpenDrawer;

export const OpenLarge = () => <OpenDrawer size="large" />;
OpenLarge.play = expectOpenDrawer;

export const OpenExtraLarge = () => <OpenDrawer size="xl" />;
OpenExtraLarge.play = expectOpenDrawer;

export const OpenDoubleExtraLarge = () => <OpenDrawer size="2xl" />;
OpenDoubleExtraLarge.play = expectOpenDrawer;

export const OpenLeft = () => <OpenDrawer position="left" />;
OpenLeft.play = expectOpenDrawer;

export const IosHeight = () => <OpenDrawer />;

IosHeight.beforeEach = () => {
    spyOn(Navigator.prototype, "userAgent", "get").mockReturnValue("iPhone WebKit");
    spyOn(window, "innerHeight", "get").mockReturnValue(640);
};

IosHeight.play = async (context) => {
    await expectOpenDrawer(context);

    const panel = getPortalCanvas(context.canvasElement).getByText("Open drawer body").closest(".w-85");
    await expect(panel.closest(".ui-drawer").firstElementChild).toHaveClass("h-[640px]", "max-h-[640px]");
};

export const NoOptionalProps = () => {
    return <Drawer isOpen content="Drawer body" onClose={() => {}} />;
};

NoOptionalProps.play = async ({ canvasElement }) => {
    const body = getPortalCanvas(canvasElement);
    await expect(await body.findByText("Drawer body")).toBeInTheDocument();

    const container = canvasElement.ownerDocument.body.querySelector(".ui-drawer-container");
    await expect(container.style.right).toBe("0px");
    await expect(container.style.left).toBe("");

    const panel = body.getByText("Drawer body").closest(".w-85");
    await expect(panel).not.toBeNull();
    await expect(panel.previousElementSibling).toBe(within(container).getByRole("button"));
};

export default DrawerStories;
