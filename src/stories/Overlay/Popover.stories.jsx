import React, { useState } from "react";
import { createPortal } from "react-dom";
import { expect, fn, spyOn, waitFor, within } from "storybook/test";
import { Button, Drawer, Input, Modal, Popover } from "../..";
import { isDevelopment } from "../../helpers/environment";
import {
    arg,
    expectNoLayer,
    expectWarnings,
    findLayer,
    getPortalCanvas,
    getTarget,
    PLACEMENTS,
    POPOVER_SELECTOR,
    queryLayer,
    wait,
    waitForChangeWindow,
} from "../helpers";
import { getRealUserEvent, restoreKeyboardFocusVisible } from "../realInput";

// More props in docs
const documentationUrl = "https://www.radix-ui.com/primitives/docs/components/popover";

const PopoverStories = {
    id: "Popover",
    title: "Overlay/Popover",
    component: Popover,
    args: {
        openOn: "hover",
        placement: "right",
        delay: 0,
        maxWidth: 350,
        skidding: 0,
        distance: 10,
        onOpenChange: fn(),
        onClickOutside: fn(),
    },
    argTypes: {
        demoText: arg("Default", "text", null, "The value for the button", "for this demo only"),
        openOn: arg(
            "hover",
            "inline-radio",
            ["hover", "click"],
            "What opens the popover: hovering or focusing the target, or clicking it",
        ),
        placement: arg(
            "right",
            "select",
            PLACEMENTS,
            `Where to place the popover; "top-start", "left-end" and similar align it. [More in the docs](${documentationUrl})`,
        ),
        delay: arg(
            0,
            "number",
            null,
            "Delay in ms before a hover popover opens and before it closes. `[open, close]` sets them apart",
        ),
        maxWidth: arg(
            350,
            "number",
            null,
            "Specifies the maximum width of the popover. Useful to prevent it from being too horizontally wide to read",
        ),
        skidding: arg(0, "number", null, "Shifts the popover along its aligned edge, in pixels"),
        distance: arg(10, "number", null, "Gap between the popover and its target, in pixels"),
    },
};

export const Default = ({ demoText = "Hello World", ...rest }) => {
    return (
        <div className="mt-10 h-20">
            <Popover {...rest}>
                <Button>{demoText}</Button>
                <Popover.Content className="space-y-2 p-4">
                    <p className="p1 font-bold">Popover Title</p>
                    <p className="p2">And here is some amazing content and it is very engaging. Right?</p>
                    <p className="p2">Here is some more because I am crazy</p>
                </Popover.Content>
            </Popover>
        </div>
    );
};

Default.play = async ({ canvas, canvasElement, userEvent }) => {
    const target = getTarget(canvas, "Hello World");
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Popover Title")).toBeUndefined();

    await userEvent.hover(target);
    await findLayer(canvasElement, POPOVER_SELECTOR, "Popover Title");

    await userEvent.unhover(target);
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Popover Title");
};

export const NoTitle = ({ demoText = "Detailed", ...rest }) => {
    return (
        <div className="mt-10 h-20">
            <Popover {...rest}>
                <Button>{demoText}</Button>
                <Popover.Content className="p-4">
                    <dl className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <dt className="font-bold">Demo Request</dt>
                            <dd>Dec 21, 2020</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <dt className="font-bold">Join Request</dt>
                            <dd>Dec 24, 2020</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <dt className="font-bold">Account Created</dt>
                            <dd>Dec 31, 2020</dd>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <dt className="font-bold">Account Verified</dt>
                            <dd>Jan 5, 2021</dd>
                        </div>
                    </dl>
                </Popover.Content>
            </Popover>
        </div>
    );
};

export const FocusOpens = () => {
    return (
        <Popover>
            <Button>Focus target</Button>
            <Popover.Content className="p-4">Focus content</Popover.Content>
        </Popover>
    );
};

FocusOpens.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Focus target" })).toHaveFocus();
    await findLayer(canvasElement, POPOVER_SELECTOR, "Focus content");

    await userEvent.tab();
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Focus content");
};

export const ClickOpens = ({ onClickOutside }) => {
    return (
        <div className="flex flex-col items-start gap-10">
            <Button>Outside</Button>
            <Popover openOn="click" placement="right" onClickOutside={onClickOutside}>
                <Button>Click target</Button>
                <Popover.Content className="p-4">
                    <p>Click content</p>
                </Popover.Content>
            </Popover>
        </div>
    );
};

ClickOpens.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Click target" });

    await userEvent.hover(button.parentElement);
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Click content")).toBeUndefined();

    await userEvent.click(button);
    const box = await findLayer(canvasElement, POPOVER_SELECTOR, "Click content");

    await userEvent.click(within(box).getByText("Click content"));
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Click content")).toBeInstanceOf(HTMLElement);
    await expect(args.onClickOutside).not.toHaveBeenCalled();

    await userEvent.click(canvas.getByRole("button", { name: "Outside" }));
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Click content");
    await expect(args.onClickOutside).toHaveBeenCalledOnce();

    await userEvent.click(button);
    await findLayer(canvasElement, POPOVER_SELECTOR, "Click content");
    await userEvent.click(button);
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Click content");
    await expect(args.onClickOutside).toHaveBeenCalledOnce();
};

export const Controlled = () => {
    const [isOpen, setIsOpen] = useState(true);
    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <div className="flex flex-col items-start gap-10">
            <Button onClick={handleToggle}>Toggle</Button>
            <Popover open={isOpen} placement="right">
                <Button>Controlled target</Button>
                <Popover.Content className="p-4">Controlled content</Popover.Content>
            </Popover>
        </div>
    );
};

Controlled.play = async ({ canvas, canvasElement, userEvent }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle" });

    await findLayer(canvasElement, POPOVER_SELECTOR, "Controlled content");

    await userEvent.click(toggle);
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Controlled content");

    await userEvent.hover(getTarget(canvas, "Controlled target"));
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Controlled content")).toBeUndefined();

    await userEvent.click(toggle);
    await findLayer(canvasElement, POPOVER_SELECTOR, "Controlled content");
};

export const ControlledForm = ({ onOpenChange }) => {
    return (
        <Popover open placement="bottom" onOpenChange={onOpenChange}>
            <Button>Form target</Button>
            <Popover.Content className="space-y-2 p-4">
                <Input placeholder="First field" />
                <Input placeholder="Second field" />
            </Popover.Content>
        </Popover>
    );
};

ControlledForm.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const body = getPortalCanvas(canvasElement);
    const target = getTarget(canvas, "Form target");
    const first = await body.findByPlaceholderText("First field");
    const second = body.getByPlaceholderText("Second field");

    // A controlled popover with no `openOn` keeps its fields in the tab order
    await waitForChangeWindow();
    await expect(first).not.toHaveAttribute("tabindex");
    await expect(second).not.toHaveAttribute("tabindex");
    await userEvent.click(first);
    await userEvent.tab();
    await expect(second).toHaveFocus();

    // ...and has no hover handling of its own
    await userEvent.hover(target);
    await userEvent.unhover(target);
    await waitForChangeWindow();
    await expect(args.onOpenChange).not.toHaveBeenCalled();
};

export const ControlledHover = ({ onOpenChange }) => {
    return (
        <Popover open={false} openOn="hover" onOpenChange={onOpenChange}>
            <Button>Controlled hover target</Button>
            <Popover.Content className="p-4">Controlled hover content</Popover.Content>
        </Popover>
    );
};

ControlledHover.play = async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.hover(getTarget(canvas, "Controlled hover target"));
    await waitFor(() => expect(args.onOpenChange).toHaveBeenCalledWith(true));
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Controlled hover content")).toBeUndefined();
};

export const OpenSetLater = () => {
    const [isOpen, setIsOpen] = useState();
    const handleOpen = () => setIsOpen(true);

    return (
        <div className="flex flex-col items-start gap-10">
            <Button onClick={handleOpen}>Open it</Button>
            <Popover open={isOpen} placement="right">
                <Button>Later target</Button>
                <Popover.Content className="p-4">Later content</Popover.Content>
            </Popover>
        </div>
    );
};

OpenSetLater.play = async ({ canvas, canvasElement, userEvent }) => {
    const targetButton = canvas.getByRole("button", { name: "Later target" });

    await userEvent.click(canvas.getByRole("button", { name: "Open it" }));
    await findLayer(canvasElement, POPOVER_SELECTOR, "Later content");

    // `open` going from undefined to a value keeps the target mounted
    await expect(canvas.getByRole("button", { name: "Later target" })).toBe(targetButton);
};

export const SkiddingAndDistance = () => {
    return (
        <div className="p-10">
            <Popover open placement="bottom-start" skidding={20} distance={30}>
                <Button>Offset target</Button>
                <Popover.Content className="p-4">Offset content</Popover.Content>
            </Popover>
        </div>
    );
};

SkiddingAndDistance.play = async ({ canvas, canvasElement }) => {
    const target = getTarget(canvas, "Offset target");
    const box = await findLayer(canvasElement, POPOVER_SELECTOR, "Offset content");

    await waitFor(() => {
        const targetRect = target.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();

        expect(boxRect.top - targetRect.bottom).toBeCloseTo(30, 0);
        expect(boxRect.left - targetRect.left).toBeCloseTo(20, 0);
    });
    await expect(getComputedStyle(box.parentElement).zIndex).toBe("50");
};

const longContent =
    "A long popover that wraps onto several lines because it is far wider than any maximum width the popover allows";

export const MaxWidth = () => {
    return (
        <div className="flex flex-col items-start gap-40">
            <Popover open placement="bottom-start">
                <Button>Default width</Button>
                <Popover.Content>{`Default: ${longContent}`}</Popover.Content>
            </Popover>
            <Popover open placement="bottom-start" maxWidth={200}>
                <Button>Narrow width</Button>
                <Popover.Content>{`Narrow: ${longContent}`}</Popover.Content>
            </Popover>
            <Popover open placement="bottom-start" maxWidth="calc(150px + 50px)">
                <Button>Calc width</Button>
                <Popover.Content>{`Calc: ${longContent}`}</Popover.Content>
            </Popover>
        </div>
    );
};

MaxWidth.play = async ({ canvasElement }) => {
    const defaultBox = await findLayer(canvasElement, POPOVER_SELECTOR, "Default:");
    const narrowBox = await findLayer(canvasElement, POPOVER_SELECTOR, "Narrow:");
    const calcBox = await findLayer(canvasElement, POPOVER_SELECTOR, "Calc:");

    await waitFor(() => {
        expect(defaultBox.getBoundingClientRect().width).toBeCloseTo(350, 0);
        expect(narrowBox.getBoundingClientRect().width).toBeCloseTo(200, 0);
        expect(calcBox.getBoundingClientRect().width).toBeCloseTo(200, 0);
    });
};

export const ViewportMaxWidth = () => {
    return (
        <Popover open placement="bottom-start" maxWidth={5000}>
            <Button>Wide target</Button>
            <Popover.Content>
                <p className="whitespace-nowrap">{"Wide content ".repeat(200)}</p>
            </Popover.Content>
        </Popover>
    );
};

ViewportMaxWidth.play = async ({ canvasElement }) => {
    const box = await findLayer(canvasElement, POPOVER_SELECTOR, "Wide content");
    const { innerWidth } = canvasElement.ownerDocument.defaultView;

    await waitFor(() => expect(box.getBoundingClientRect().width).toBeCloseTo(innerWidth - 10, 0));
};

export const Disabled = () => {
    return (
        <Popover disabled>
            <Button>Disabled target</Button>
            <Popover.Content className="p-4">Disabled content</Popover.Content>
        </Popover>
    );
};

Disabled.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(getTarget(canvas, "Disabled target"));
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Disabled content")).toBeUndefined();
};

export const PassThroughProps = () => {
    return (
        <Popover open data-testid="popover-test-id" className="custom-box-class" placement="right">
            <Button>Pass-through target</Button>
            <Popover.Content title="Content title" className="p-4">
                Pass-through content
            </Popover.Content>
        </Popover>
    );
};

PassThroughProps.play = async ({ canvasElement }) => {
    const { ownerDocument } = canvasElement;
    const box = await findLayer(canvasElement, POPOVER_SELECTOR, "Pass-through content");

    await expect(box).toHaveClass("custom-box-class");
    await expect(box.querySelector(".ui-popover-content")).toHaveTextContent("Pass-through content");
    await expect(ownerDocument.querySelector("[data-testid='popover-test-id']")).toBeNull();
    await expect(ownerDocument.querySelector("[title='Content title']")).toBeNull();
};

export const ContentProp = () => {
    return (
        <Popover content={<span>Content prop body</span>}>
            <Button>Content prop target</Button>
        </Popover>
    );
};

ContentProp.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(getTarget(canvas, "Content prop target"));
    const box = await findLayer(canvasElement, POPOVER_SELECTOR, "Content prop body");

    await expect(box.querySelector(".ui-popover-content")).toBeNull();
};

export const EscapeCloses = () => {
    return (
        <Popover>
            <Button>Escape target</Button>
            <Popover.Content className="p-4">Escape content</Popover.Content>
        </Popover>
    );
};

EscapeCloses.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(getTarget(canvas, "Escape target"));
    await findLayer(canvasElement, POPOVER_SELECTOR, "Escape content");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Escape content");
};

export const HoverInteractiveContent = () => {
    return (
        <Popover placement="bottom">
            <Button>Hover form target</Button>
            <Popover.Content className="space-y-2 p-4">
                <p>Hover form</p>
                <Input placeholder="Type here" />
            </Popover.Content>
        </Popover>
    );
};

HoverInteractiveContent.play = async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.hover(getTarget(canvas, "Hover form target"));
    const box = await findLayer(canvasElement, POPOVER_SELECTOR, "Hover form");
    const input = within(box).getByPlaceholderText("Type here");

    await userEvent.hover(input);
    await userEvent.type(input, "Hello");
    await expect(input).toHaveValue("Hello");

    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Hover form")).toBeInstanceOf(HTMLElement);
};

export const InsideModal = ({ onClickOutside }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const handleClose = () => setIsModalOpen(false);

    return (
        <Modal shouldCloseOnOutsideClick isOpen={isModalOpen} onClose={handleClose}>
            <Modal.Header>Modal with a popover</Modal.Header>
            <Modal.Body>
                <Popover openOn="click" placement="bottom" onClickOutside={onClickOutside}>
                    <Button>Modal popover target</Button>
                    <Popover.Content className="p-4">
                        <p>Modal popover content</p>
                    </Popover.Content>
                </Popover>
            </Modal.Body>
        </Modal>
    );
};

InsideModal.play = async ({ args, canvasElement, userEvent }) => {
    const body = getPortalCanvas(canvasElement);
    const queryModal = () => body.queryByText("Modal with a popover");

    await userEvent.click(await body.findByRole("button", { name: "Modal popover target" }));
    const box = await findLayer(canvasElement, POPOVER_SELECTOR, "Modal popover content");

    await userEvent.click(within(box).getByText("Modal popover content"));
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Modal popover content")).toBeInstanceOf(HTMLElement);
    await expect(queryModal()).toBeInTheDocument();
    await expect(args.onClickOutside).not.toHaveBeenCalled();

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Modal popover content");
    await waitForChangeWindow();
    await expect(queryModal()).toBeInTheDocument();

    // With no popover open, the same key closes the modal, so the first press was kept from it
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(queryModal()).toBeNull());
};

export const ControlledInModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleToggle = () => setIsOpen(!isOpen);
    const handleClickOutside = () => setIsOpen(false);

    return (
        <Modal shouldCloseOnOutsideClick isOpen={isModalOpen} onClose={handleCloseModal}>
            <Modal.Header>Modal with a controlled popover</Modal.Header>
            <Modal.Body>
                <Popover open={isOpen} placement="bottom" onClickOutside={handleClickOutside}>
                    <Button onClick={handleToggle}>Controlled modal target</Button>
                    <Popover.Content className="p-4">Controlled modal content</Popover.Content>
                </Popover>
            </Modal.Body>
        </Modal>
    );
};

ControlledInModal.play = async ({ canvasElement, userEvent }) => {
    const body = getPortalCanvas(canvasElement);
    const queryModal = () => body.queryByText("Modal with a controlled popover");

    await userEvent.click(await body.findByRole("button", { name: "Controlled modal target" }));
    await findLayer(canvasElement, POPOVER_SELECTOR, "Controlled modal content");

    // With no onOpenChange, Escape reaches the consumer through onClickOutside
    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Controlled modal content");
    await expect(queryModal()).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(queryModal()).toBeNull());
};

export const ToggleOutside = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <div className="flex flex-col items-start gap-10">
            <Button>Outside</Button>
            <Popover open={isOpen} placement="right" onClickOutside={handleToggle}>
                <Button onClick={handleToggle}>Toggle target</Button>
                <Popover.Content className="p-4">Toggle content</Popover.Content>
            </Popover>
        </div>
    );
};

ToggleOutside.play = async ({ canvas, canvasElement, userEvent }) => {
    const outside = canvas.getByRole("button", { name: "Outside" });

    await userEvent.click(canvas.getByRole("button", { name: "Toggle target" }));
    await findLayer(canvasElement, POPOVER_SELECTOR, "Toggle content");

    // The second press lands during the fade-out, which must not reach a toggle-style onClickOutside
    await userEvent.click(outside);
    await userEvent.click(outside);
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Toggle content");
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Toggle content")).toBeUndefined();
};

export const ToggleEscapeInModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <Modal shouldCloseOnOutsideClick isOpen={isModalOpen} onClose={handleCloseModal}>
            <Modal.Header>Modal with a toggled popover</Modal.Header>
            <Modal.Body>
                <Popover open={isOpen} placement="bottom" onClickOutside={handleToggle}>
                    <Button onClick={handleToggle}>Toggled modal target</Button>
                    <Popover.Content className="p-4">Toggled modal content</Popover.Content>
                </Popover>
            </Modal.Body>
        </Modal>
    );
};

ToggleEscapeInModal.play = async ({ canvasElement, userEvent }) => {
    const body = getPortalCanvas(canvasElement);
    const queryModal = () => body.queryByText("Modal with a toggled popover");

    await userEvent.click(await body.findByRole("button", { name: "Toggled modal target" }));
    await findLayer(canvasElement, POPOVER_SELECTOR, "Toggled modal content");

    await userEvent.keyboard("{Escape}");
    await expect(queryModal()).toBeInTheDocument();

    // The closed popover must consume this Escape during its fade-out.
    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Toggled modal content");
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Toggled modal content")).toBeUndefined();
    await expect(queryModal()).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(queryModal()).toBeNull());
};

export const HoverCloseGrace = ({ onOpenChange }) => {
    return (
        <Popover placement="bottom" distance={20} onOpenChange={onOpenChange}>
            <Button>Grace target</Button>
            <Popover.Content className="p-4">Grace content</Popover.Content>
        </Popover>
    );
};

HoverCloseGrace.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const target = getTarget(canvas, "Grace target");

    await userEvent.hover(target);
    const box = await findLayer(canvasElement, POPOVER_SELECTOR, "Grace content");

    // Crossing the gap between target and content takes time; the popover must not start closing meanwhile
    await userEvent.unhover(target);
    await wait(50);
    await userEvent.hover(box);
    await waitForChangeWindow();
    await expect(box).toHaveAttribute("data-state", "open");
    await expect(args.onOpenChange).not.toHaveBeenCalledWith(false);
};

export const FocusMovesIntoContent = ({ onOpenChange }) => {
    return (
        <Popover placement="bottom" onOpenChange={onOpenChange}>
            <Button>Focus move target</Button>
            <Popover.Content className="space-y-2 p-4">
                <p>Focus move content</p>
                <Input placeholder="Focus move field" />
            </Popover.Content>
        </Popover>
    );
};

FocusMovesIntoContent.play = async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Focus move target" })).toHaveFocus();
    const box = await findLayer(canvasElement, POPOVER_SELECTOR, "Focus move content");

    // Blurring the target into its own content keeps the popover open
    const field = within(box).getByPlaceholderText("Focus move field");
    await userEvent.click(field);
    await expect(field).toHaveFocus();
    await waitForChangeWindow();
    await expect(box).toHaveAttribute("data-state", "open");
    await expect(args.onOpenChange).not.toHaveBeenCalledWith(false);
};

export const TargetClickCloses = ({ onOpenChange, onClickOutside }) => {
    return (
        <Popover placement="right" onOpenChange={onOpenChange} onClickOutside={onClickOutside}>
            <Button>Click close target</Button>
            <Popover.Content className="p-4">Click close content</Popover.Content>
        </Popover>
    );
};

TargetClickCloses.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const target = getTarget(canvas, "Click close target");

    await userEvent.hover(target);
    await findLayer(canvasElement, POPOVER_SELECTOR, "Click close content");
    args.onOpenChange.mockClear();

    // The focus the same press gives the target must not reopen it
    await userEvent.click(canvas.getByRole("button", { name: "Click close target" }));
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Click close content");
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Click close content")).toBeUndefined();
    await expect(args.onOpenChange.mock.calls).toEqual([[false]]);
    await expect(args.onClickOutside).not.toHaveBeenCalled();

    await userEvent.unhover(target);
    await userEvent.hover(target);
    await findLayer(canvasElement, POPOVER_SELECTOR, "Click close content");
};

export const ControlledHoverClickCloses = ({ onOpenChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpenChange = (nextOpen) => {
        setIsOpen(nextOpen);
        onOpenChange(nextOpen);
    };

    return (
        <Popover open={isOpen} openOn="hover" onOpenChange={handleOpenChange}>
            <Button>Controlled click close target</Button>
            <Popover.Content className="p-4">Controlled click close content</Popover.Content>
        </Popover>
    );
};

ControlledHoverClickCloses.play = async ({ args, canvas, canvasElement, userEvent }) => {
    await userEvent.hover(getTarget(canvas, "Controlled click close target"));
    await findLayer(canvasElement, POPOVER_SELECTOR, "Controlled click close content");
    args.onOpenChange.mockClear();

    await userEvent.click(canvas.getByRole("button", { name: "Controlled click close target" }));
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Controlled click close content");
    await waitForChangeWindow();
    await expect(args.onOpenChange.mock.calls).toEqual([[false]]);
};

/** Renders its Modal inside the popover target, as admin's payout and subscription badges do. */
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
        <Popover placement="bottom">
            <ModalLauncher />
            <Popover.Content className="p-4">Payouts content</Popover.Content>
        </Popover>
    );
};

TargetOpensModal.play = async ({ canvas, canvasElement, userEvent }) => {
    const { ownerDocument } = canvasElement;
    const body = getPortalCanvas(canvasElement);
    const target = getTarget(canvas, "Edit payouts");

    await userEvent.hover(target);
    await findLayer(canvasElement, POPOVER_SELECTOR, "Payouts content");

    // The modal takes focus from inside the target's React tree, which must not hold the popover open over it
    await userEvent.click(canvas.getByRole("button", { name: "Edit payouts" }));
    await body.findByText("Payouts modal");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Payouts content");
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Payouts content")).toBeUndefined();

    const closeButton = body.getByRole("button", { name: "Close payouts" });
    const { left, top, width, height } = closeButton.getBoundingClientRect();
    await expect(closeButton.contains(ownerDocument.elementFromPoint(left + width / 2, top + height / 2))).toBe(true);
    await userEvent.click(closeButton);
    await waitFor(() => expect(body.queryByText("Payouts modal")).toBeNull());

    // Focus coming back to the target as the modal closes does not reopen the popover; the next hover does
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Payouts content")).toBeUndefined();
    await userEvent.hover(target);
    await findLayer(canvasElement, POPOVER_SELECTOR, "Payouts content");
};

export const ClickPopoverIgnoresPortaledClicks = () => {
    return (
        <Popover openOn="click" placement="bottom">
            <span>
                <Button>Portal click target</Button>
                {createPortal(<input type="checkbox" aria-label="Portaled action" />, document.body)}
            </span>
            <Popover.Content className="p-4">Portal click content</Popover.Content>
        </Popover>
    );
};

ClickPopoverIgnoresPortaledClicks.play = async ({ canvas, canvasElement, userEvent }) => {
    const body = getPortalCanvas(canvasElement);

    const portaledAction = body.getByRole("checkbox", { name: "Portaled action" });
    await userEvent.click(portaledAction);
    await expect(portaledAction).toBeChecked();
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Portal click content");

    await userEvent.click(canvas.getByRole("button", { name: "Portal click target" }));
    await findLayer(canvasElement, POPOVER_SELECTOR, "Portal click content");
};

export const ClickTargetClosesAfterContentFocus = () => {
    return (
        <Popover openOn="click" placement="bottom">
            <Button>Focused content target</Button>
            <Popover.Content className="p-4">
                <p>Focused content</p>
                <Input placeholder="Focused content field" />
            </Popover.Content>
        </Popover>
    );
};

ClickTargetClosesAfterContentFocus.play = async ({ canvas, canvasElement, userEvent }) => {
    const target = canvas.getByRole("button", { name: "Focused content target" });

    await userEvent.click(target);
    const box = await findLayer(canvasElement, POPOVER_SELECTOR, "Focused content");
    const field = within(box).getByPlaceholderText("Focused content field");
    await userEvent.click(field);
    await expect(field).toHaveFocus();

    target.focus();
    await expect(target).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Focused content");
};

export const TargetOpensModalFromKeyboard = () => {
    return (
        <Popover placement="bottom">
            <ModalLauncher />
            <Popover.Content className="p-4">Keyboard payouts content</Popover.Content>
        </Popover>
    );
};

TargetOpensModalFromKeyboard.play = async ({ canvas, canvasElement, userEvent }) => {
    const body = getPortalCanvas(canvasElement);

    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: "Edit payouts" })).toHaveFocus();
    await findLayer(canvasElement, POPOVER_SELECTOR, "Keyboard payouts content");

    await userEvent.keyboard("{Enter}");
    await body.findByText("Payouts modal");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Keyboard payouts content");
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Keyboard payouts content")).toBeUndefined();
};

export const KeyboardRefocusAfterTargetClick = () => {
    return (
        <div className="flex flex-col items-start gap-10">
            <Popover placement="bottom">
                <Button>Refocus target</Button>
                <Popover.Content className="p-4">Refocus content</Popover.Content>
            </Popover>
            <Button>After target</Button>
        </div>
    );
};

KeyboardRefocusAfterTargetClick.beforeEach = () => restoreKeyboardFocusVisible;

KeyboardRefocusAfterTargetClick.play = async ({ canvas, canvasElement }) => {
    const realUserEvent = await getRealUserEvent();
    if (!realUserEvent) {
        return;
    }

    const target = canvas.getByRole("button", { name: "Refocus target" });

    await realUserEvent.hover(target);
    await findLayer(canvasElement, POPOVER_SELECTOR, "Refocus content");
    await realUserEvent.click(target);
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Refocus content");
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Refocus content")).toBeUndefined();

    await realUserEvent.keyboard("{Tab}");
    await expect(canvas.getByRole("button", { name: "After target" })).toHaveFocus();
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Refocus content");

    await realUserEvent.keyboard("{Shift>}{Tab}{/Shift}");
    await expect(target).toHaveFocus();
    await findLayer(canvasElement, POPOVER_SELECTOR, "Refocus content");
};

export const KeyboardRefocusAfterClickElsewhere = () => {
    return (
        <div className="flex flex-col items-start gap-10">
            <Popover placement="bottom">
                <Button>Elsewhere target</Button>
                <Popover.Content className="p-4">Elsewhere content</Popover.Content>
            </Popover>
            <Button>After elsewhere</Button>
        </div>
    );
};

KeyboardRefocusAfterClickElsewhere.beforeEach = () => restoreKeyboardFocusVisible;

KeyboardRefocusAfterClickElsewhere.play = async ({ canvas, canvasElement }) => {
    const realUserEvent = await getRealUserEvent();
    if (!realUserEvent) {
        return;
    }

    const target = canvas.getByRole("button", { name: "Elsewhere target" });
    const elsewhere = canvas.getByRole("button", { name: "After elsewhere" });

    await realUserEvent.hover(target);
    await findLayer(canvasElement, POPOVER_SELECTOR, "Elsewhere content");
    await realUserEvent.click(target);
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Elsewhere content");
    await realUserEvent.click(elsewhere);
    await expect(elsewhere).toHaveFocus();

    await realUserEvent.keyboard("{Shift>}{Tab}{/Shift}");
    await expect(target).toHaveFocus();
    await findLayer(canvasElement, POPOVER_SELECTOR, "Elsewhere content");
};

export const KeyboardRefocusAfterModalFocusRestoration = () => {
    return (
        <div className="flex flex-col items-start gap-10">
            <Popover placement="bottom">
                <ModalLauncher />
                <Popover.Content className="p-4">Restored focus content</Popover.Content>
            </Popover>
            <Button>After opener</Button>
        </div>
    );
};

KeyboardRefocusAfterModalFocusRestoration.beforeEach = () => restoreKeyboardFocusVisible;

KeyboardRefocusAfterModalFocusRestoration.play = async ({ canvas, canvasElement }) => {
    const realUserEvent = await getRealUserEvent();
    if (!realUserEvent) {
        return;
    }

    const body = getPortalCanvas(canvasElement);
    const target = canvas.getByRole("button", { name: "Edit payouts" });

    await realUserEvent.hover(target);
    await findLayer(canvasElement, POPOVER_SELECTOR, "Restored focus content");
    await realUserEvent.click(target);
    await body.findByText("Payouts modal");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Restored focus content");

    const closeButton = body.getByRole("button", { name: "Close payouts" });
    await realUserEvent.hover(closeButton);
    await realUserEvent.keyboard("{Tab}");
    await expect(closeButton).toHaveFocus();
    await realUserEvent.keyboard("{Enter}");
    await waitFor(() => expect(body.queryByText("Payouts modal")).toBeNull());
    await expect(target).toHaveFocus();
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Restored focus content")).toBeUndefined();

    await realUserEvent.keyboard("{Tab}");
    await expect(canvas.getByRole("button", { name: "After opener" })).toHaveFocus();
    await realUserEvent.keyboard("{Shift>}{Tab}{/Shift}");
    await expect(target).toHaveFocus();
    await findLayer(canvasElement, POPOVER_SELECTOR, "Restored focus content");
};

/** A left Drawer puts its close button after the content, so the first focusable control is the popover target. */
export const DrawerInitialFocus = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleOpen = () => setIsDrawerOpen(true);
    const handleClose = () => setIsDrawerOpen(false);

    const content = (
        <Popover placement="bottom">
            <Button>First control</Button>
            <Popover.Content className="p-4">First control content</Popover.Content>
        </Popover>
    );

    return (
        <>
            <Button onClick={handleOpen}>Open drawer</Button>
            <Drawer
                isOpen={isDrawerOpen}
                position="left"
                title="Drawer with a hover popover"
                content={content}
                onClose={handleClose}
            />
        </>
    );
};

DrawerInitialFocus.beforeEach = () => restoreKeyboardFocusVisible;

/** Real mouse: only trusted input sets the `:focus-visible` state the popover reads. */
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
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "First control content")).toBeUndefined();
};

export const TouchTapAfterKeyboardFocus = ({ onOpenChange }) => {
    return (
        <div className="flex flex-col items-start gap-10">
            <Popover placement="right" onOpenChange={onOpenChange}>
                <Button>Touch target</Button>
                <Popover.Content className="p-4">Touch content</Popover.Content>
            </Popover>
            <Button>Next</Button>
        </div>
    );
};

/** Unlike a mouse press, a tap neither closes a hover popover nor keeps the next keyboard focus from opening it. */
TouchTapAfterKeyboardFocus.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Touch target" });

    await userEvent.tab();
    await expect(button).toHaveFocus();
    const box = await findLayer(canvasElement, POPOVER_SELECTOR, "Touch content");
    args.onOpenChange.mockClear();

    await userEvent.pointer({ keys: "[TouchA]", target: button });
    await waitForChangeWindow();
    await expect(box).toHaveAttribute("data-state", "open");
    await expect(args.onOpenChange).not.toHaveBeenCalledWith(false);

    await userEvent.tab();
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Touch content");
    await userEvent.tab({ shift: true });
    await expect(button).toHaveFocus();
    await findLayer(canvasElement, POPOVER_SELECTOR, "Touch content");
};

export const ReleasedAfterHeldClosed = () => {
    const [isHeldClosed, setIsHeldClosed] = useState(false);
    const handleToggle = () => setIsHeldClosed(!isHeldClosed);

    return (
        <div className="flex flex-col items-start gap-10">
            <Button onClick={handleToggle}>{isHeldClosed ? "Release" : "Hold closed"}</Button>
            <Popover open={isHeldClosed ? false : undefined} placement="right">
                <Button>Held target</Button>
                <Popover.Content className="p-4">Held content</Popover.Content>
            </Popover>
        </div>
    );
};

/** A popover held closed while the pointer leaves, then released, stays closed until the next hover. */
ReleasedAfterHeldClosed.play = async ({ canvas, canvasElement, userEvent }) => {
    const target = getTarget(canvas, "Held target");
    canvas.getByRole("button", { name: "Hold closed" }).focus();

    await userEvent.hover(target);
    await findLayer(canvasElement, POPOVER_SELECTOR, "Held content");

    await userEvent.keyboard("{Enter}");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Held content");

    await userEvent.unhover(target);
    await waitForChangeWindow();
    await userEvent.keyboard("{Enter}");
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Held content")).toBeUndefined();

    await userEvent.hover(target);
    await findLayer(canvasElement, POPOVER_SELECTOR, "Held content");
};

let disabledWarnSpy;
let disabledErrorSpy;

export const DisabledWhileHovered = ({ onOpenChange }) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const handleToggle = () => setIsDisabled(!isDisabled);

    return (
        <div className="flex flex-col items-start gap-10">
            <Button onClick={handleToggle}>Toggle disabled</Button>
            <Popover disabled={isDisabled} onOpenChange={onOpenChange}>
                <Button>Toggled target</Button>
                <Popover.Content className="p-4">Toggled content</Popover.Content>
            </Popover>
        </div>
    );
};

DisabledWhileHovered.beforeEach = () => {
    disabledWarnSpy = spyOn(console, "warn");
    disabledErrorSpy = spyOn(console, "error");
};

DisabledWhileHovered.play = async ({ args, canvas, canvasElement, userEvent }) => {
    const target = getTarget(canvas, "Toggled target");
    const toggle = canvas.getByRole("button", { name: "Toggle disabled" });

    await userEvent.hover(target);
    await findLayer(canvasElement, POPOVER_SELECTOR, "Toggled content");

    // Toggled from the keyboard so the pointer stays on the target
    toggle.focus();
    await userEvent.keyboard("{Enter}");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Toggled content");

    args.onOpenChange.mockClear();
    await userEvent.unhover(target);
    await userEvent.hover(target);
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Toggled content")).toBeUndefined();
    await expect(args.onOpenChange).not.toHaveBeenCalled();

    await userEvent.keyboard("{Enter}");
    await waitForChangeWindow();
    await expect(queryLayer(canvasElement, POPOVER_SELECTOR, "Toggled content")).toBeUndefined();

    const messages = [...disabledWarnSpy.mock.calls, ...disabledErrorSpy.mock.calls].map(([text]) => String(text));
    await expect(messages.filter((text) => text.includes("changing from"))).toHaveLength(0);
};

let placementWarnSpy;

export const PlacementAuto = () => {
    return (
        <Popover open placement="auto">
            <Button>Auto target</Button>
            <Popover.Content className="p-4">Auto content</Popover.Content>
        </Popover>
    );
};

PlacementAuto.beforeEach = () => {
    placementWarnSpy = spyOn(console, "warn");
};

PlacementAuto.play = async ({ canvasElement }) => {
    await findLayer(canvasElement, POPOVER_SELECTOR, "Auto content");

    const uiKitWarnings = placementWarnSpy.mock.calls.filter(([text]) => String(text).startsWith("UI Kit"));
    await expect(uiKitWarnings).toHaveLength(0);
};

let removedWarnSpy;

export const RemovedPropWarns = () => {
    const handleShown = () => {};

    return (
        <Popover visible isLazy={false} trigger="click" appendTo="parent" onShown={handleShown}>
            <Button>Removed props target</Button>
            <Popover.Content className="p-4">Removed props content</Popover.Content>
        </Popover>
    );
};

RemovedPropWarns.beforeEach = () => {
    removedWarnSpy = spyOn(console, "warn");
};

RemovedPropWarns.play = async () => {
    if (!isDevelopment) {
        return;
    }

    const expected = [
        "UI Kit Popover: 'visible' was removed in 3.8, use 'open'",
        "UI Kit Popover: 'trigger' was removed in 3.8, use 'openOn' (\"hover\" or \"click\")",
        "UI Kit Popover: 'appendTo' was removed in 3.8, delete it, the popover portals to document.body",
        "UI Kit Popover: 'isLazy' was removed in 3.8, delete it, the content mounts only while the popover is open",
        "UI Kit Popover: 'onShown' was removed in 3.8, use 'onOpenChange'",
    ];
    expectWarnings(removedWarnSpy, expected);
};

export default PopoverStories;
