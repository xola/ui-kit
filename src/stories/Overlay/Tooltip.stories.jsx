import React, { useState } from "react";
import { expect, fn, spyOn, waitFor } from "storybook/test";
import { Button, Tooltip, UserIcon } from "../..";

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
        content: getArgument("My tooltip text", "text", null, "The text of the tooltip"),
        placement: getArgument(
            "right",
            "inline-radio",
            ["top", "bottom", "left", "right", "auto"],
            `Where to place the tooltip; "top-start", "left-end" and similar align it. [More in the docs](${documentationUrl})`,
        ),
        delay: getArgument(0, "number", null, "Delay in ms once the pointer enters before the tooltip shows"),
        maxWidth: getArgument(
            350,
            "number",
            null,
            "Specifies the maximum width of the tooltip. Useful to prevent it from being too horizontally wide to read",
        ),
        skidding: getArgument(0, "number", null, "Shifts the tooltip along its aligned edge, in pixels"),
        distance: getArgument(10, "number", null, "Gap between the tooltip and its target, in pixels"),
    },
};

function getArgument(defaultValue, type, options, description, summary = null) {
    return {
        type: { required: false },
        description,
        options,
        control: { type },
        table: {
            type: { summary },
            defaultValue: { summary: defaultValue },
        },
    };
}

const BUBBLE_SELECTOR = ".ui-tooltip";

const queryBubble = (canvasElement, text) => {
    const bubbles = canvasElement.ownerDocument.querySelectorAll(BUBBLE_SELECTOR);

    return [...bubbles].find((bubble) => bubble.textContent.includes(text));
};

const findBubble = (canvasElement, text) => {
    return waitFor(() => {
        const bubble = queryBubble(canvasElement, text);
        expect(bubble).toBeInstanceOf(HTMLElement);

        return bubble;
    });
};

const expectNoBubble = (canvasElement, text) => {
    return waitFor(() => expect(queryBubble(canvasElement, text)).toBeUndefined());
};

/**
 * Proving a tooltip did not open needs a point in time when it would have. With no delay, Tippy opens on the hover
 * event and Radix one timer tick later, so 100ms leaves a wide margin.
 */
const waitForOpenWindow = () => new Promise((resolve) => setTimeout(resolve, 100));

const getTarget = (canvas, name) => canvas.getByRole("button", { name }).parentElement;

export const Default = (config) => {
    return (
        <Tooltip {...config}>
            <Button>Hello World</Button>
        </Tooltip>
    );
};

Default.play = async ({ canvas, canvasElement, userEvent }) => {
    const target = getTarget(canvas, "Hello World");
    await expect(queryBubble(canvasElement, "Hey there!")).toBeUndefined();

    await userEvent.hover(target);
    const bubble = await findBubble(canvasElement, "Hey there!");
    await expect(bubble).toHaveAttribute("role", "tooltip");

    await userEvent.unhover(target);
    await expectNoBubble(canvasElement, "Hey there!");
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
    await findBubble(canvasElement, "Focus tip");

    await userEvent.tab();
    await expectNoBubble(canvasElement, "Focus tip");
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
    await findBubble(canvasElement, "Escape tip");

    await userEvent.keyboard("{Escape}");
    await expectNoBubble(canvasElement, "Escape tip");
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

    await findBubble(canvasElement, "Controlled tip");

    await userEvent.click(toggle);
    await expectNoBubble(canvasElement, "Controlled tip");

    await userEvent.hover(getTarget(canvas, "Controlled target"));
    await waitForOpenWindow();
    await expect(queryBubble(canvasElement, "Controlled tip")).toBeUndefined();

    await userEvent.click(toggle);
    await findBubble(canvasElement, "Controlled tip");
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
    const bubble = await findBubble(canvasElement, "Below, left aligned");

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
    const bubble = await findBubble(canvasElement, "Skidding and distance tip");

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
        </div>
    );
};

MaxWidth.play = async ({ canvasElement }) => {
    const defaultBubble = await findBubble(canvasElement, "Default:");
    const narrowBubble = await findBubble(canvasElement, "Narrow:");

    await waitFor(() => {
        expect(defaultBubble.getBoundingClientRect().width).toBeCloseTo(350, 0);
        expect(narrowBubble.getBoundingClientRect().width).toBeCloseTo(200, 0);
    });
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
    await expect(queryBubble(canvasElement, "Disabled tip")).toBeUndefined();
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
    await findBubble(canvasElement, "Disabled button tip");
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
    await findBubble(canvasElement, "Toggled tip");

    await userEvent.keyboard("{Enter}");
    await expectNoBubble(canvasElement, "Toggled tip");

    await userEvent.unhover(target);
    await userEvent.keyboard("{Enter}");
    await waitForOpenWindow();
    await expect(queryBubble(canvasElement, "Toggled tip")).toBeUndefined();

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
    await findBubble(canvasElement, "Focused tip");

    await userEvent.hover(getTarget(canvas, "Disabled target"));
    await userEvent.hover(getTarget(canvas, "Empty target"));
    await waitForOpenWindow();
    await expect(queryBubble(canvasElement, "Focused tip")).toHaveAttribute("data-state", "instant-open");
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
    const getBubbles = () => canvasElement.ownerDocument.querySelectorAll(BUBBLE_SELECTOR);

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
    const bubble = await findBubble(canvasElement, "Pass-through tip");

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
    await findBubble(canvasElement, "Click outside tip");

    await userEvent.click(canvas.getByRole("button", { name: "Target" }));
    await expect(onClickOutside).not.toHaveBeenCalled();

    await userEvent.click(canvas.getByRole("button", { name: "Outside" }));
    await expect(onClickOutside).toHaveBeenCalledTimes(1);
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
    await findBubble(canvasElement, "No provider tip");
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
    await expect(await findBubble(canvasElement, "First tip")).toHaveAttribute("data-state", "delayed-open");

    await userEvent.hover(getTarget(canvas, "Second"));
    await expect(await findBubble(canvasElement, "Second tip")).toHaveAttribute("data-state", "instant-open");
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

RemovedPropWarns.play = async () => {
    const message = "UI Kit Tooltip: 'visible' was removed in 3.8, use 'open'";
    const warnings = warnSpy.mock.calls.filter(([text]) => text === message);

    await expect(warnings).toHaveLength(1);
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
