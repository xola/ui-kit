import PropTypes from "prop-types";
import React, { useState } from "react";
import { expect, fn, spyOn, waitFor } from "storybook/test";
import { Button, Drawer, Modal, Tooltip } from "../..";
import { UserIcon } from "../../icons";
import {
    arg,
    expectNoLayer,
    expectWarnings,
    findLayer,
    getPortalCanvas,
    getTarget,
    PLACEMENTS,
    TOOLTIP_SELECTOR,
    queryLayer,
    wait,
} from "../helpers";
import { getRealUserEvent, restoreKeyboardFocusVisible } from "../realInput";

// More props in docs
const documentationUrl = "https://www.radix-ui.com/primitives/docs/components/tooltip";

const TooltipStories = {
    title: "Overlay/Tooltip",
    component: Tooltip,
    args: {
        content: "Hey there!",
        placement: "right",
        delay: 0,
        maxWidth: 350,
        skidding: 0,
        distance: 10,
        onOpenChange: fn(),
        onClickOutside: fn(),
    },
    parameters: {
        design: {
            name: "Figma",
            type: "figma",
            url: "https://www.figma.com/file/tL2vrxuBIzujkDfYvVjUhs/%E2%9A%99%EF%B8%8F-01---DS-Core?node-id=7683%3A478826&viewport=7035%2C-4414%2C0.57",
        },
    },
    argTypes: {
        content: arg("My tooltip text", "text", null, "The text of the tooltip"),
        placement: arg(
            "right",
            "inline-radio",
            PLACEMENTS,
            `Where to place the tooltip; "top-start", "left-end" and similar align it. [More in the docs](${documentationUrl})`,
        ),
        delay: arg(0, "number", null, "Delay in ms once the pointer enters before the tooltip shows"),
        maxWidth: arg(
            350,
            "number",
            null,
            "Specifies the maximum width of the tooltip. Useful to prevent it from being too horizontally wide to read",
        ),
        skidding: arg(0, "number", null, "Shifts the tooltip along its aligned edge, in pixels"),
        distance: arg(10, "number", null, "Gap between the tooltip and its target, in pixels"),
    },
};

/**
 * Proving a tooltip did not open needs a point in time when it would have. With no delay, Tippy opens on the hover
 * event and Radix one timer tick later, so 100ms leaves a wide margin.
 */
const waitForOpenWindow = () => wait(100);

/** A closing bubble stays in the DOM through its fade-out with `data-state="closed"`, so presence alone is not open. */
const findOpenBubble = (canvasElement, text) => {
    return waitFor(() => {
        const bubble = queryLayer(canvasElement, TOOLTIP_SELECTOR, text);
        expect(bubble).toHaveAttribute("data-state", expect.stringMatching(/-open$/));

        return bubble;
    });
};

const tap = (userEvent, target) => userEvent.pointer({ keys: "[TouchA]", target });

export const Default = (config) => {
    return (
        <Tooltip {...config}>
            <Button>Hello World</Button>
        </Tooltip>
    );
};

Default.play = async ({ canvas, canvasElement, userEvent }) => {
    const target = getTarget(canvas, "Hello World");
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Hey there!")).toBeUndefined();

    await userEvent.hover(target);
    const bubble = await findLayer(canvasElement, TOOLTIP_SELECTOR, "Hey there!");
    await expect(bubble).toHaveAttribute("role", "tooltip");

    await userEvent.unhover(target);
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Hey there!");
};

export const FocusOpens = () => {
    return (
        <Tooltip content="Focus tip">
            <Button>Target</Button>
        </Tooltip>
    );
};

FocusOpens.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Target" })).toHaveFocus();
    await findLayer(canvasElement, TOOLTIP_SELECTOR, "Focus tip");

    await userEvent.tab();
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Focus tip");
};

export const EscapeCloses = () => {
    return (
        <Tooltip content="Escape tip">
            <Button>Target</Button>
        </Tooltip>
    );
};

EscapeCloses.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(getTarget(canvas, "Target"));
    await findLayer(canvasElement, TOOLTIP_SELECTOR, "Escape tip");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Escape tip");
};

export const Controlled = () => {
    const [isOpen, setIsOpen] = useState(true);
    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <div className="flex flex-col items-start gap-10">
            <Button onClick={handleToggle}>Toggle</Button>
            <Tooltip open={isOpen} content="Controlled tip">
                <Button>Controlled target</Button>
            </Tooltip>
        </div>
    );
};

Controlled.play = async ({ canvas, canvasElement, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle" });

    await findLayer(canvasElement, TOOLTIP_SELECTOR, "Controlled tip");

    await userEvent.click(toggle);
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Controlled tip");

    await userEvent.hover(getTarget(canvas, "Controlled target"));
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Controlled tip")).toBeUndefined();

    await userEvent.click(toggle);
    await findLayer(canvasElement, TOOLTIP_SELECTOR, "Controlled tip");
};

export const BottomStart = () => {
    return (
        <div className="p-10">
            <Tooltip placement="bottom-start" content="Below, left aligned">
                <Button>Target</Button>
            </Tooltip>
        </div>
    );
};

BottomStart.play = async ({ canvas, canvasElement, userEvent }) => {
    const target = getTarget(canvas, "Target");

    await userEvent.hover(target);
    const bubble = await findLayer(canvasElement, TOOLTIP_SELECTOR, "Below, left aligned");

    await waitFor(() => {
        const targetRect = target.getBoundingClientRect();
        const bubbleRect = bubble.getBoundingClientRect();

        expect(bubbleRect.top - targetRect.bottom).toBeCloseTo(10, 0);
        expect(bubbleRect.left).toBeCloseTo(targetRect.left, 0);
    });
    await expect(getComputedStyle(bubble.parentElement).zIndex).toBe("9999");
};

export const SkiddingAndDistance = () => {
    return (
        <div className="p-10">
            <Tooltip placement="bottom-start" skidding={20} distance={30} content="Skidding and distance tip">
                <Button>Target</Button>
            </Tooltip>
        </div>
    );
};

SkiddingAndDistance.play = async ({ canvas, canvasElement, userEvent }) => {
    const target = getTarget(canvas, "Target");

    await userEvent.hover(target);
    const bubble = await findLayer(canvasElement, TOOLTIP_SELECTOR, "Skidding and distance tip");

    await waitFor(() => {
        const targetRect = target.getBoundingClientRect();
        const bubbleRect = bubble.getBoundingClientRect();

        expect(bubbleRect.top - targetRect.bottom).toBeCloseTo(30, 0);
        expect(bubbleRect.left - targetRect.left).toBeCloseTo(20, 0);
    });
};

const longContent =
    "A long tooltip that wraps onto several lines because it is far wider than any maximum width the tooltip allows";

export const MaxWidth = () => {
    return (
        <div className="flex flex-col items-start gap-40">
            <Tooltip open placement="bottom-start" content={`Default: ${longContent}`}>
                <Button>Default width</Button>
            </Tooltip>
            <Tooltip open placement="bottom-start" maxWidth={200} content={`Narrow: ${longContent}`}>
                <Button>Narrow width</Button>
            </Tooltip>
            <Tooltip open placement="bottom-start" maxWidth="calc(150px + 50px)" content={`Calc: ${longContent}`}>
                <Button>Calc width</Button>
            </Tooltip>
        </div>
    );
};

MaxWidth.play = async ({ canvasElement }) => {
    const defaultBubble = await findLayer(canvasElement, TOOLTIP_SELECTOR, "Default:");
    const narrowBubble = await findLayer(canvasElement, TOOLTIP_SELECTOR, "Narrow:");
    const calcBubble = await findLayer(canvasElement, TOOLTIP_SELECTOR, "Calc:");

    await waitFor(() => {
        expect(defaultBubble.getBoundingClientRect().width).toBeCloseTo(350, 0);
        expect(narrowBubble.getBoundingClientRect().width).toBeCloseTo(200, 0);
        expect(calcBubble.getBoundingClientRect().width).toBeCloseTo(200, 0);
    });
};

/** Tippy capped its root at the viewport width less 10px, so a 350px bubble never overflowed a 320px phone. */
export const ViewportMaxWidth = () => {
    return (
        <Tooltip open placement="bottom-start" maxWidth={5000} content={"Wide tip ".repeat(200)}>
            <Button>Wide target</Button>
        </Tooltip>
    );
};

ViewportMaxWidth.play = async ({ canvasElement }) => {
    const bubble = await findLayer(canvasElement, TOOLTIP_SELECTOR, "Wide tip");
    const { innerWidth } = canvasElement.ownerDocument.defaultView;

    await waitFor(() => expect(bubble.getBoundingClientRect().width).toBeCloseTo(innerWidth - 10, 0));
};

export const Disabled = () => {
    return (
        <div className="flex flex-col items-start gap-10">
            <Tooltip disabled content="Disabled tip">
                <Button>Disabled target</Button>
            </Tooltip>
        </div>
    );
};

Disabled.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(getTarget(canvas, "Disabled target"));
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Disabled tip")).toBeUndefined();
};

export const DisabledButton = () => {
    return (
        <Tooltip content="Disabled button tip">
            <Button disabled>Disabled button</Button>
        </Tooltip>
    );
};

DisabledButton.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(canvas.getByRole("button", { name: "Disabled button" }));
    await findLayer(canvasElement, TOOLTIP_SELECTOR, "Disabled button tip");
};

let controlWarnSpy;
let controlErrorSpy;

export const DisabledWhileHovered = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const handleToggle = () => setIsDisabled(!isDisabled);

    return (
        <div className="flex flex-col items-start gap-10">
            <Button onClick={handleToggle}>Toggle disabled</Button>
            <Tooltip disabled={isDisabled} content="Toggled tip">
                <Button>Target</Button>
            </Tooltip>
        </div>
    );
};

DisabledWhileHovered.beforeEach = () => {
    controlWarnSpy = spyOn(console, "warn");
    controlErrorSpy = spyOn(console, "error");
};

/** The keyboard toggles `disabled` so the pointer stays on, then leaves, the target in between. */
DisabledWhileHovered.play = async ({ canvas, canvasElement, userEvent }) => {
    const target = getTarget(canvas, "Target");
    canvas.getByRole("button", { name: "Toggle disabled" }).focus();

    await userEvent.hover(target);
    await findLayer(canvasElement, TOOLTIP_SELECTOR, "Toggled tip");

    await userEvent.keyboard("{Enter}");
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Toggled tip");

    await userEvent.unhover(target);
    await userEvent.keyboard("{Enter}");
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Toggled tip")).toBeUndefined();

    const calls = [...controlWarnSpy.mock.calls, ...controlErrorSpy.mock.calls];
    const modeSwitches = calls.filter((args) => args.some((arg) => String(arg).includes("changing from")));
    await expect(modeSwitches).toHaveLength(0);
};

/** Radix's open path closes every other open tooltip, so a tooltip that cannot show must not start it. */
export const HiddenTooltipKeepsOthersOpen = () => {
    return (
        <div className="flex flex-col items-start gap-10">
            <Tooltip content="Focused tip">
                <Button>Focused</Button>
            </Tooltip>
            <Tooltip disabled content="Disabled tip">
                <Button>Disabled target</Button>
            </Tooltip>
            <Tooltip content="">
                <Button>Empty target</Button>
            </Tooltip>
        </div>
    );
};

HiddenTooltipKeepsOthersOpen.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.tab();
    await findLayer(canvasElement, TOOLTIP_SELECTOR, "Focused tip");

    await userEvent.hover(getTarget(canvas, "Disabled target"));
    await userEvent.hover(getTarget(canvas, "Empty target"));
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Focused tip")).toHaveAttribute(
        "data-state",
        "instant-open",
    );
};

export const EmptyContent = () => {
    return (
        <div className="flex flex-col items-start gap-10">
            <Tooltip content="">
                <Button>Empty string</Button>
            </Tooltip>
            <Tooltip content={null}>
                <Button>Null content</Button>
            </Tooltip>
            <Tooltip content={undefined}>
                <Button>Undefined content</Button>
            </Tooltip>
        </div>
    );
};

EmptyContent.play = async ({ canvas, canvasElement, userEvent }) => {
    const getBubbles = () => canvasElement.ownerDocument.querySelectorAll(TOOLTIP_SELECTOR);

    await userEvent.hover(getTarget(canvas, "Empty string"));
    await waitForOpenWindow();
    await expect(getBubbles()).toHaveLength(0);

    await userEvent.hover(getTarget(canvas, "Null content"));
    await waitForOpenWindow();
    await expect(getBubbles()).toHaveLength(0);

    await userEvent.hover(getTarget(canvas, "Undefined content"));
    await waitForOpenWindow();
    await expect(getBubbles()).toHaveLength(0);
};

export const PassThroughProps = () => {
    return (
        <Tooltip open role="note" data-testid="tooltip-pass-through" content="Pass-through tip">
            <Button>Target</Button>
        </Tooltip>
    );
};

PassThroughProps.play = async ({ canvasElement }) => {
    const bubble = await findLayer(canvasElement, TOOLTIP_SELECTOR, "Pass-through tip");

    await expect(bubble).toHaveAttribute("role", "note");
    await expect(canvasElement.ownerDocument.querySelector("[data-testid='tooltip-pass-through']")).toBeNull();
};

const onClickOutside = fn();

export const ClickOutside = () => {
    return (
        <div className="flex flex-col items-start gap-10">
            <Tooltip open content="Click outside tip" onClickOutside={onClickOutside}>
                <Button>Target</Button>
            </Tooltip>
            <Button>Outside</Button>
        </div>
    );
};

ClickOutside.play = async ({ canvas, canvasElement, userEvent }) => {
    onClickOutside.mockClear();
    await findLayer(canvasElement, TOOLTIP_SELECTOR, "Click outside tip");

    await userEvent.click(canvas.getByRole("button", { name: "Target" }));
    await expect(onClickOutside).not.toHaveBeenCalled();

    await userEvent.click(canvas.getByRole("button", { name: "Outside" }));
    await expect(onClickOutside).toHaveBeenCalledTimes(1);
};

/** Held open like seller's ErrorTooltip: `open` plus an `onClickOutside` that toggles it, and no `onOpenChange`. */
export const ToggleOutside = () => {
    const [isOpen, setIsOpen] = useState(true);
    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <div className="flex flex-col items-start gap-10">
            <Tooltip open={isOpen} content="Toggle tip" onClickOutside={handleToggle}>
                <Button>Toggle target</Button>
            </Tooltip>
            <Button>Outside</Button>
        </div>
    );
};

ToggleOutside.play = async ({ canvas, canvasElement, userEvent }) => {
    const outside = canvas.getByRole("button", { name: "Outside" });
    await findLayer(canvasElement, TOOLTIP_SELECTOR, "Toggle tip");

    // The second press lands during the fade-out, which must not reach the toggle and reopen the tooltip
    await userEvent.click(outside);
    await userEvent.click(outside);
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Toggle tip");
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Toggle tip")).toBeUndefined();
};

export const FocusAfterModalCloses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    return (
        <div className="flex flex-col items-start gap-10">
            <Tooltip content="Opener tip">
                <Button onClick={handleOpen}>Open dialog</Button>
            </Tooltip>
            <Button>After opener</Button>
            <Modal isOpen={isModalOpen} onClose={handleClose}>
                <Modal.Header>Opened dialog</Modal.Header>
                <Modal.Footer>
                    <Button onClick={handleClose}>Done</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

FocusAfterModalCloses.beforeEach = () => restoreKeyboardFocusVisible;

/** Real mouse and keyboard: only trusted input sets the `:focus-visible` state the tooltip reads. */
FocusAfterModalCloses.play = async ({ canvas, canvasElement }) => {
    const realUserEvent = await getRealUserEvent();
    if (!realUserEvent) {
        return;
    }

    const body = getPortalCanvas(canvasElement);
    const opener = canvas.getByRole("button", { name: "Open dialog" });

    // Headless UI gives focus back to the opener from script, which is not keyboard focus after a mouse click
    await realUserEvent.click(opener);
    await realUserEvent.click(await body.findByRole("button", { name: "Done" }));
    await waitFor(() => expect(body.queryByText("Opened dialog")).toBeNull());
    await waitFor(() => expect(opener).toHaveFocus());
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Opener tip")).toBeUndefined();

    await realUserEvent.keyboard("{Tab}");
    await expect(canvas.getByRole("button", { name: "After opener" })).toHaveFocus();
    await realUserEvent.keyboard("{Shift>}{Tab}{/Shift}");
    await expect(opener).toHaveFocus();
    await findOpenBubble(canvasElement, "Opener tip");
};

/** A left Drawer puts its close button after the content, so the first focusable control is the tooltip target. */
export const DrawerInitialFocus = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleOpen = () => setIsDrawerOpen(true);
    const handleClose = () => setIsDrawerOpen(false);

    const content = (
        <Tooltip content="First control tip">
            <Button>First control</Button>
        </Tooltip>
    );

    return (
        <>
            <Button onClick={handleOpen}>Open drawer</Button>
            <Drawer
                isOpen={isDrawerOpen}
                position="left"
                title="Drawer with a tooltip"
                content={content}
                onClose={handleClose}
            />
        </>
    );
};

DrawerInitialFocus.beforeEach = () => restoreKeyboardFocusVisible;

/** Real mouse: only trusted input sets the `:focus-visible` state the tooltip reads. */
DrawerInitialFocus.play = async ({ canvas, canvasElement }) => {
    const realUserEvent = await getRealUserEvent();
    if (!realUserEvent) {
        return;
    }

    const body = getPortalCanvas(canvasElement);

    // Headless UI focuses the first control from script, which is not keyboard focus after a mouse click
    await realUserEvent.click(canvas.getByRole("button", { name: "Open drawer" }));
    const firstControl = await body.findByRole("button", { name: "First control" });
    await waitFor(() => expect(firstControl).toHaveFocus());
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "First control tip")).toBeUndefined();
};

export const TouchTapToggles = ({ onOpenChange, onTargetClick }) => {
    return (
        <div className="flex flex-col items-start gap-10">
            <Tooltip content="Tap tip" onOpenChange={onOpenChange}>
                <Button onClick={onTargetClick}>Tap target</Button>
            </Tooltip>
            <Tooltip disabled content="Disabled tap tip">
                <Button>Disabled tap target</Button>
            </Tooltip>
            <Button>Outside</Button>
        </div>
    );
};

TouchTapToggles.args = { onTargetClick: fn() };

TouchTapToggles.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const target = canvas.getByRole("button", { name: "Tap target" });
    const outside = canvas.getByRole("button", { name: "Outside" });
    args.onOpenChange.mockClear();

    await tap(userEvent, target);
    await findOpenBubble(canvasElement, "Tap tip");
    await waitForOpenWindow();
    await findOpenBubble(canvasElement, "Tap tip");
    await expect(args.onOpenChange.mock.calls).toEqual([[true]]);

    await tap(userEvent, outside);
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Tap tip");

    await tap(userEvent, target);
    await findOpenBubble(canvasElement, "Tap tip");
    await tap(userEvent, target);
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Tap tip");
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Tap tip")).toBeUndefined();

    // Every tap still reaches the wrapped button, once
    await expect(args.onTargetClick).toHaveBeenCalledTimes(3);

    await tap(userEvent, canvas.getByRole("button", { name: "Disabled tap target" }));
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Disabled tap tip")).toBeUndefined();
};

export const CancelledTouchPress = () => {
    return (
        <Tooltip content="Cancelled tip">
            <Button>Cancel target</Button>
        </Tooltip>
    );
};

CancelledTouchPress.play = async ({ canvas, canvasElement }) => {
    const button = canvas.getByRole("button", { name: "Cancel target" });
    const finger = { bubbles: true, cancelable: true, pointerId: 2, pointerType: "touch", isPrimary: true };

    // A scroll that starts on the target cancels the press, so no click follows it
    button.dispatchEvent(new PointerEvent("pointerdown", { ...finger, button: 0, buttons: 1 }));
    button.dispatchEvent(new PointerEvent("pointercancel", finger));

    // A click with no pointerdown of its own, as from the keyboard, must not read the cancelled touch press
    button.click();
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Cancelled tip")).toBeUndefined();
};

const OPEN_DELAY = 500;

const DelayedTooltip = ({ onOpenChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const handleToggle = () => setIsDisabled(!isDisabled);

    const handleOpenChange = (nextOpen) => {
        setIsOpen(nextOpen);
        onOpenChange(nextOpen);
    };

    return (
        <div className="flex flex-col items-start gap-10">
            <Button onClick={handleToggle}>Toggle disabled</Button>
            <Tooltip
                open={isOpen}
                disabled={isDisabled}
                delay={OPEN_DELAY}
                content="Delayed tip"
                onOpenChange={handleOpenChange}
            >
                <Button>Delayed target</Button>
            </Tooltip>
        </div>
    );
};

DelayedTooltip.propTypes = { onOpenChange: PropTypes.func.isRequired };

export const DelayedOpenWhileDisabled = ({ onOpenChange }) => <DelayedTooltip onOpenChange={onOpenChange} />;

/** The keyboard toggles `disabled` so the pointer stays on, then leaves, the target in between. */
DelayedOpenWhileDisabled.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const target = getTarget(canvas, "Delayed target");
    canvas.getByRole("button", { name: "Toggle disabled" }).focus();
    args.onOpenChange.mockClear();

    await userEvent.hover(target);
    await wait(100);
    await userEvent.keyboard("{Enter}");
    await wait(OPEN_DELAY);
    await expect(args.onOpenChange).not.toHaveBeenCalledWith(true);

    await userEvent.unhover(target);
    await userEvent.keyboard("{Enter}");
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Delayed tip")).toBeUndefined();
};

export const DelayedOpenReenabled = ({ onOpenChange }) => <DelayedTooltip onOpenChange={onOpenChange} />;

/** A delayed open started before `disabled` does not fire after re-enabling, even with the pointer still there. */
DelayedOpenReenabled.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const target = getTarget(canvas, "Delayed target");
    canvas.getByRole("button", { name: "Toggle disabled" }).focus();
    args.onOpenChange.mockClear();

    await userEvent.hover(target);
    await wait(100);
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{Enter}");
    await wait(OPEN_DELAY);
    await expect(args.onOpenChange).not.toHaveBeenCalledWith(true);
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Delayed tip")).toBeUndefined();
};

export const ReleasedAfterHeldClosed = () => {
    const [isHeldClosed, setIsHeldClosed] = useState(false);
    const handleToggle = () => setIsHeldClosed(!isHeldClosed);

    return (
        <div className="flex flex-col items-start gap-10">
            <Button onClick={handleToggle}>{isHeldClosed ? "Release" : "Hold closed"}</Button>
            <Tooltip open={isHeldClosed ? false : undefined} content="Held tip">
                <Button>Held target</Button>
            </Tooltip>
        </div>
    );
};

/** A tooltip held closed while the pointer leaves, then released, stays closed until the next hover. */
ReleasedAfterHeldClosed.play = async ({ canvas, canvasElement, userEvent }) => {
    const target = getTarget(canvas, "Held target");
    canvas.getByRole("button", { name: "Hold closed" }).focus();

    await userEvent.hover(target);
    await findLayer(canvasElement, TOOLTIP_SELECTOR, "Held tip");

    await userEvent.keyboard("{Enter}");
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Held tip");

    await userEvent.unhover(target);
    await userEvent.keyboard("{Enter}");
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Held tip")).toBeUndefined();

    await userEvent.hover(target);
    await findOpenBubble(canvasElement, "Held tip");
};

/** Renders its Modal inside the tooltip target, so the modal's focus and pointer events bubble up to the target. */
const ModalLauncher = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    return (
        <span className="flex items-center gap-2">
            Payouts
            <Button size="small" onClick={handleOpen}>
                Edit payouts
            </Button>
            <Modal isOpen={isModalOpen} onClose={handleClose}>
                <Modal.Header>Payouts modal</Modal.Header>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close payouts</Button>
                </Modal.Footer>
            </Modal>
        </span>
    );
};

export const TargetOpensModal = () => {
    return (
        <Tooltip content="Payouts tip">
            <ModalLauncher />
        </Tooltip>
    );
};

TargetOpensModal.play = async ({ canvas, canvasElement, userEvent }) => {
    const body = getPortalCanvas(canvasElement);

    await userEvent.hover(getTarget(canvas, "Edit payouts"));
    await findLayer(canvasElement, TOOLTIP_SELECTOR, "Payouts tip");

    await userEvent.click(canvas.getByRole("button", { name: "Edit payouts" }));
    await body.findByText("Payouts modal");
    await userEvent.hover(body.getByRole("button", { name: "Close payouts" }));
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Payouts tip");
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Payouts tip")).toBeUndefined();
};

export const TargetOpensModalFromKeyboard = () => {
    return (
        <Tooltip content="Keyboard payouts tip">
            <ModalLauncher />
        </Tooltip>
    );
};

TargetOpensModalFromKeyboard.play = async ({ canvas, canvasElement, userEvent }) => {
    const body = getPortalCanvas(canvasElement);

    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Edit payouts" })).toHaveFocus();
    await findLayer(canvasElement, TOOLTIP_SELECTOR, "Keyboard payouts tip");

    await userEvent.keyboard("{Enter}");
    await body.findByText("Payouts modal");
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Keyboard payouts tip");
    await waitForOpenWindow();
    await expect(queryLayer(canvasElement, TOOLTIP_SELECTOR, "Keyboard payouts tip")).toBeUndefined();
};

export const WithoutProvider = () => {
    return (
        <Tooltip content="No provider tip">
            <Button>Target</Button>
        </Tooltip>
    );
};

WithoutProvider.parameters = { hasProvider: false };

WithoutProvider.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(getTarget(canvas, "Target"));
    await findLayer(canvasElement, TOOLTIP_SELECTOR, "No provider tip");
};

/**
 * Radix skips the open delay for a tooltip opened right after another closed, but only when both share one
 * TooltipProvider. "instant-open" on the second shows ui-kit's Provider supplies it and Tooltip does not wrap itself
 * again.
 */
export const SharedProvider = () => {
    return (
        <div className="flex flex-col items-start gap-10">
            <Tooltip content="First tip">
                <Button>First</Button>
            </Tooltip>
            <Tooltip content="Second tip">
                <Button>Second</Button>
            </Tooltip>
        </div>
    );
};

SharedProvider.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(getTarget(canvas, "First"));
    await expect(await findLayer(canvasElement, TOOLTIP_SELECTOR, "First tip")).toHaveAttribute(
        "data-state",
        "delayed-open",
    );

    await userEvent.hover(getTarget(canvas, "Second"));
    await expect(await findLayer(canvasElement, TOOLTIP_SELECTOR, "Second tip")).toHaveAttribute(
        "data-state",
        "instant-open",
    );
};

let warnSpy;

/** The only story that passes a removed prop: warnings fire once per page, so any earlier use would hide this one. */
export const RemovedPropWarns = () => {
    return (
        <Tooltip visible content="Removed prop tip">
            <Button>Target</Button>
        </Tooltip>
    );
};

RemovedPropWarns.beforeEach = () => {
    warnSpy = spyOn(console, "warn");
};

RemovedPropWarns.play = () => {
    expectWarnings(warnSpy, ["UI Kit Tooltip: 'visible' was removed in 3.8, use 'open'"]);
};

export const WithHTMLContent = () => {
    return (
        <>
            <p className="mb-3">
                Since React escapes all HTML passed into props, pass a React element to the{" "}
                <code className="bg-gray-lighter px-1">content</code> prop to show HTML content.
            </p>
            <Tooltip
                placement="right"
                content={
                    <span className="grid grid-cols-2 gap-1">
                        <span>
                            This is <b>bold</b>
                        </span>
                        <span>in a grid</span>
                        <span>in two rows</span>
                        <span>you now have a table!</span>
                    </span>
                }
            >
                <Button>Hello World</Button>
            </Tooltip>
        </>
    );
};

export const OnAnIcon = (config) => {
    return (
        <Tooltip {...config}>
            <Button color="secondary" variant="outline" size="medium">
                <UserIcon size="medium" />
            </Button>
        </Tooltip>
    );
};

export default TooltipStories;
