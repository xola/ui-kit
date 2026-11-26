import React, { useState } from "react";
import { expect, fn, waitFor, within } from "storybook/test";
import { BottomSheet, Button, Drawer, Input, Modal, Popover, Tooltip } from "../..";

const OverlayCombinationsStories = {
    title: "Overlay/Combinations",
    parameters: {
        docs: {
            description: {
                component:
                    "Modal, Drawer and BottomSheet (Headless UI) opened from each other and holding a Popover or Tooltip (Radix). The play tests measure stacking with `elementFromPoint` instead of reading z-index classes.",
            },
        },
    },
};

/** Marks the white panel of every Modal, Drawer and BottomSheet below, which none of them expose by class. */
const PANEL_CLASS = "combo-panel";

const DIALOG_SELECTOR = ".ui-modal, .ui-drawer, .ui-bottom-sheet";
const OVERLAY_SELECTOR = ".ui-modal-overlay, .ui-drawer-overlay, .ui-bottom-sheet-overlay";
const POPOVER_SELECTOR = ".ui-popover";
const TOOLTIP_SELECTOR = ".ui-tooltip";

/** Centered Modal panels, right-side Drawer panels and BottomSheet panels all leave the top-left corner to the backdrop. */
const BACKDROP_POINT = { x: 4, y: 4 };

/** Taller than the gap between each trigger below and its panel edge, so the layer has to overflow the panel. */
const TALL_CLASS = "h-60 w-48 p-4";

/** Radix fades a closing layer out over 250ms and reacts to presses within a timer tick. */
const CHANGE_WINDOW = 400;

/** Modal and BottomSheet leave in at most 300ms, Drawer in 500ms. */
const LEAVE_WINDOW = 600;

const DRAWER_CLASS_NAMES = { children: PANEL_CLASS };

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getCenter = ({ left, top, width, height }) => ({ x: left + width / 2, y: top + height / 2 });

const isOutside = ({ x, y }, { left, top, right, bottom }) => x < left || x > right || y < top || y > bottom;

/** The element a real pointer lands on. Headless UI marks everything outside the top dialog `inert`, which it skips. */
const getHitAt = (ownerDocument, { x, y }) => ownerDocument.elementFromPoint(x, y);

/**
 * The element painted on top. Inert nodes drop out of hit testing, so a lower dialog would let a point through to a
 * layer it covers; lifting `inert` for one synchronous read makes stacking, not interactivity, decide the result.
 */
const getPaintedAt = (ownerDocument, { x, y }) => {
    const inertNodes = [...ownerDocument.querySelectorAll("[inert]")];
    inertNodes.forEach((node) => node.removeAttribute("inert"));
    const element = ownerDocument.elementFromPoint(x, y);
    inertNodes.forEach((node) => node.setAttribute("inert", ""));

    return element;
};

const queryLayer = (ownerDocument, selector, text) => {
    const layers = ownerDocument.querySelectorAll(selector);

    return [...layers].find((layer) => layer.textContent.includes(text));
};

/** Radix parks content at `translate(0, -200%)` until it is placed, then fades it in; rects read before that are off. */
const findPlacedLayer = (ownerDocument, selector, text) => {
    return waitFor(() => {
        const layer = queryLayer(ownerDocument, selector, text);
        expect(layer).toBeInstanceOf(HTMLElement);

        const wrapper = layer.closest("[data-radix-popper-content-wrapper]");
        expect(wrapper.style.transform).not.toContain("-200%");
        expect(layer.getAnimations()).toHaveLength(0);

        return layer;
    });
};

const expectNoLayer = (ownerDocument, selector, text) => {
    return waitFor(() => expect(queryLayer(ownerDocument, selector, text)).toBeUndefined());
};

/** Headless UI scales and slides panels in; rects read before every transition in the portal ends are off. */
const waitForSettled = (dialog) => {
    const portal = dialog.closest("[data-headlessui-portal]");

    return waitFor(
        () => {
            expect(portal.querySelector("[data-transition], [data-closed], [data-enter]")).toBeNull();
            expect(portal.getAnimations({ subtree: true })).toHaveLength(0);
        },
        { timeout: 2000 },
    );
};

const findDialog = async (body, title) => {
    const heading = await body.findByText(title, { selector: "h2, h3" });
    const dialog = heading.closest(DIALOG_SELECTOR);
    await waitForSettled(dialog);

    return dialog;
};

const waitForClosed = (dialog) => {
    return waitFor(() => expect(dialog).not.toBeInTheDocument(), { timeout: 2000 });
};

/** A dialog that would close has started leaving, or is gone, by the end of the window. */
const expectStaysOpen = async (dialog) => {
    await wait(LEAVE_WINDOW);
    await expect(dialog).toBeInTheDocument();

    const portal = dialog.closest("[data-headlessui-portal]");
    await expect(portal.querySelector("[data-leave], [data-closed]")).toBeNull();
};

const getPanel = (dialog) => dialog.querySelector(`.${PANEL_CLASS}`);

const getPanelRect = (dialog) => getPanel(dialog).getBoundingClientRect();

const getOverlay = (dialog) => dialog.querySelector(OVERLAY_SELECTOR);

const getTarget = (body, name) => body.getByRole("button", { name }).parentElement;

/**
 * `layer` must be on top, and take the click, at its own center and at a point of it past `side` of the panel. A
 * clipping panel ancestor or a lower z-index would hide the second point.
 */
const expectOnTopPastPanel = async (ownerDocument, layer, panelRect, side) => {
    const layerRect = layer.getBoundingClientRect();
    const center = getCenter(layerRect);
    const pastPanelPoints = {
        top: { x: center.x, y: (layerRect.top + Math.min(layerRect.bottom, panelRect.top)) / 2 },
        bottom: { x: center.x, y: (Math.max(layerRect.top, panelRect.bottom) + layerRect.bottom) / 2 },
        left: { x: (layerRect.left + Math.min(layerRect.right, panelRect.left)) / 2, y: center.y },
    };
    const pastPanel = pastPanelPoints[side];

    await expect(layer).toHaveAttribute("data-side", side);
    await expect(isOutside(pastPanel, panelRect)).toBe(true);
    await expect(layer).toContainElement(getPaintedAt(ownerDocument, center));
    await expect(layer).toContainElement(getHitAt(ownerDocument, center));
    await expect(layer).toContainElement(getPaintedAt(ownerDocument, pastPanel));
    await expect(layer).toContainElement(getHitAt(ownerDocument, pastPanel));
};

const LaunchedModal = ({ shouldCloseOnOutsideClick = true, title, children, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);

    const handleClose = () => {
        onClose?.();
        setIsOpen(false);
    };

    return (
        <>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                shouldCloseOnOutsideClick={shouldCloseOnOutsideClick}
                isOpen={isOpen}
                className={PANEL_CLASS}
                onClose={handleClose}
            >
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body className="flex flex-col items-start gap-4">{children}</Modal.Body>
            </Modal>
        </>
    );
};

const LaunchedDrawer = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Button onClick={handleOpen}>Open drawer</Button>
            <Drawer
                isOpen={isOpen}
                title={title}
                size="small"
                content={content}
                classNames={DRAWER_CLASS_NAMES}
                onClose={handleClose}
            />
        </>
    );
};

const LaunchedBottomSheet = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Button onClick={handleOpen}>Open sheet</Button>
            <BottomSheet shouldCloseOnOutsideClick isOpen={isOpen} className={PANEL_CLASS} onClose={handleClose}>
                <BottomSheet.Header>{title}</BottomSheet.Header>
                <BottomSheet.Body className="flex flex-col items-start gap-4">{children}</BottomSheet.Body>
            </BottomSheet>
        </>
    );
};

const openLaunched = async ({ canvas, userEvent }, body, launcher, title) => {
    await userEvent.click(canvas.getByRole("button", { name: launcher }));

    return findDialog(body, title);
};

export const ModalWithClickPopover = () => {
    return (
        <LaunchedModal title="Modal with a click popover">
            <Input placeholder="First field" />
            <Popover openOn="click" placement="bottom">
                <Button>Click popover target</Button>
                <Popover.Content className={TALL_CLASS}>Click popover content</Popover.Content>
            </Popover>
        </LaunchedModal>
    );
};

ModalWithClickPopover.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const dialog = await openLaunched(context, body, "Open modal", "Modal with a click popover");

    await userEvent.click(body.getByRole("button", { name: "Click popover target" }));
    const box = await findPlacedLayer(ownerDocument, POPOVER_SELECTOR, "Click popover content");
    await expectOnTopPastPanel(ownerDocument, box, getPanelRect(dialog), "bottom");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(ownerDocument, POPOVER_SELECTOR, "Click popover content");
    await expectStaysOpen(dialog);

    await userEvent.click(body.getByRole("button", { name: "Click popover target" }));
    await findPlacedLayer(ownerDocument, POPOVER_SELECTOR, "Click popover content");
    const backdrop = getHitAt(ownerDocument, BACKDROP_POINT);
    await expect(backdrop).toBe(getOverlay(dialog));

    // Radix dismisses the popover on pointerdown and the click that follows still reaches the backdrop, so both close
    await userEvent.click(backdrop);
    await expectNoLayer(ownerDocument, POPOVER_SELECTOR, "Click popover content");
    await waitForClosed(dialog);
};

export const ModalWithHoverPopover = () => {
    return (
        <LaunchedModal title="Modal with a hover popover">
            <Input placeholder="First field" />
            <Popover placement="top">
                <Button>Hover popover target</Button>
                <Popover.Content className={TALL_CLASS}>Hover popover content</Popover.Content>
            </Popover>
        </LaunchedModal>
    );
};

ModalWithHoverPopover.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const dialog = await openLaunched(context, body, "Open modal", "Modal with a hover popover");
    const target = getTarget(body, "Hover popover target");

    await userEvent.hover(target);
    const box = await findPlacedLayer(ownerDocument, POPOVER_SELECTOR, "Hover popover content");
    await expectOnTopPastPanel(ownerDocument, box, getPanelRect(dialog), "top");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(ownerDocument, POPOVER_SELECTOR, "Hover popover content");
    await expectStaysOpen(dialog);

    await userEvent.unhover(target);
    await userEvent.hover(target);
    await findPlacedLayer(ownerDocument, POPOVER_SELECTOR, "Hover popover content");
    const backdrop = getHitAt(ownerDocument, BACKDROP_POINT);
    await expect(backdrop).toBe(getOverlay(dialog));

    await userEvent.click(backdrop);
    await expectNoLayer(ownerDocument, POPOVER_SELECTOR, "Hover popover content");
    await waitForClosed(dialog);
};

export const ModalDefaultDismissal = ({ onClose }) => {
    return (
        <LaunchedModal shouldCloseOnOutsideClick={false} title="Modal with default dismissal" onClose={onClose}>
            <Popover openOn="click" placement="bottom">
                <Button>Default dismissal target</Button>
                <Popover.Content className="p-4">Default dismissal content</Popover.Content>
            </Popover>
        </LaunchedModal>
    );
};

ModalDefaultDismissal.args = {
    onClose: fn(),
};

ModalDefaultDismissal.play = async (context) => {
    const { args, canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const dialog = await openLaunched(context, body, "Open modal", "Modal with default dismissal");

    await userEvent.click(body.getByRole("button", { name: "Default dismissal target" }));
    await findPlacedLayer(ownerDocument, POPOVER_SELECTOR, "Default dismissal content");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(ownerDocument, POPOVER_SELECTOR, "Default dismissal content");
    await expectStaysOpen(dialog);

    // Modal hands Headless UI's Escape close to the same gate as the backdrop, so without the flag Escape is ignored
    await userEvent.keyboard("{Escape}");
    await expectStaysOpen(dialog);

    await userEvent.click(getHitAt(ownerDocument, BACKDROP_POINT));
    await expectStaysOpen(dialog);
    await expect(args.onClose).not.toHaveBeenCalled();
};

export const ModalWithTooltip = () => {
    return (
        <LaunchedModal title="Modal with a tooltip">
            <Input placeholder="First field" />
            <Tooltip content="Modal tooltip content" placement="top" contentClassName="block h-60">
                <Button>Modal tooltip target</Button>
            </Tooltip>
        </LaunchedModal>
    );
};

ModalWithTooltip.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const dialog = await openLaunched(context, body, "Open modal", "Modal with a tooltip");

    await userEvent.hover(getTarget(body, "Modal tooltip target"));
    const bubble = await findPlacedLayer(ownerDocument, TOOLTIP_SELECTOR, "Modal tooltip content");
    await expectOnTopPastPanel(ownerDocument, bubble, getPanelRect(dialog), "top");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(ownerDocument, TOOLTIP_SELECTOR, "Modal tooltip content");
    await expectStaysOpen(dialog);

    await userEvent.keyboard("{Escape}");
    await waitForClosed(dialog);
};

export const ModalPopoverWithTooltip = () => {
    return (
        <LaunchedModal title="Modal with a tooltip in a popover">
            <Input placeholder="First field" />
            <Popover openOn="click" placement="bottom">
                <Button>Popover holding a tooltip</Button>
                <Popover.Content className="flex h-60 w-48 flex-col justify-end p-4">
                    <Tooltip content="Tooltip over the popover" placement="top">
                        <Button>Tooltip in popover</Button>
                    </Tooltip>
                </Popover.Content>
            </Popover>
        </LaunchedModal>
    );
};

ModalPopoverWithTooltip.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const dialog = await openLaunched(context, body, "Open modal", "Modal with a tooltip in a popover");

    await userEvent.click(body.getByRole("button", { name: "Popover holding a tooltip" }));
    const box = await findPlacedLayer(ownerDocument, POPOVER_SELECTOR, "Tooltip in popover");
    await userEvent.hover(getTarget(body, "Tooltip in popover"));
    const bubble = await findPlacedLayer(ownerDocument, TOOLTIP_SELECTOR, "Tooltip over the popover");

    const bubbleCenter = getCenter(bubble.getBoundingClientRect());
    await expect(isOutside(bubbleCenter, box.getBoundingClientRect())).toBe(false);
    await expect(bubble).toContainElement(getPaintedAt(ownerDocument, bubbleCenter));
    await expect(bubble).toContainElement(getHitAt(ownerDocument, bubbleCenter));

    // Each Escape dismisses only the newest Radix layer, and Headless UI ignores the ones Radix handled
    await userEvent.keyboard("{Escape}");
    await expectNoLayer(ownerDocument, TOOLTIP_SELECTOR, "Tooltip over the popover");
    await wait(CHANGE_WINDOW);
    await expect(box).toHaveAttribute("data-state", "open");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(ownerDocument, POPOVER_SELECTOR, "Tooltip in popover");
    await expectStaysOpen(dialog);

    await userEvent.keyboard("{Escape}");
    await waitForClosed(dialog);
};

const NestedModals = ({ isInnerNested }) => {
    const [isOuterOpen, setIsOuterOpen] = useState(false);
    const [isInnerOpen, setIsInnerOpen] = useState(false);
    const handleOpenOuter = () => setIsOuterOpen(true);
    const handleCloseOuter = () => setIsOuterOpen(false);
    const handleOpenInner = () => setIsInnerOpen(true);
    const handleCloseInner = () => setIsInnerOpen(false);

    const innerModal = (
        <Modal
            shouldCloseOnOutsideClick
            isOpen={isInnerOpen}
            size="small"
            className={PANEL_CLASS}
            onClose={handleCloseInner}
        >
            <Modal.Header>Inner modal</Modal.Header>
            <Modal.Body className="flex flex-col items-start gap-4">
                <Input placeholder="Inner field" />
                <Popover openOn="click" placement="bottom">
                    <Button>Inner popover target</Button>
                    <Popover.Content className={TALL_CLASS}>Inner popover content</Popover.Content>
                </Popover>
            </Modal.Body>
        </Modal>
    );

    return (
        <div>
            <Button onClick={handleOpenOuter}>Open outer modal</Button>
            <Modal shouldCloseOnOutsideClick isOpen={isOuterOpen} className={PANEL_CLASS} onClose={handleCloseOuter}>
                <Modal.Header>Outer modal</Modal.Header>
                <Modal.Body className="flex h-96 flex-col items-start justify-end gap-4">
                    <Input placeholder="Outer field" />
                    <Button onClick={handleOpenInner}>Show inner</Button>
                    {isInnerNested && innerModal}
                </Modal.Body>
            </Modal>
            {!isInnerNested && innerModal}
        </div>
    );
};

const openNestedModals = async (context, body) => {
    const { userEvent } = context;
    const outer = await openLaunched(context, body, "Open outer modal", "Outer modal");

    await userEvent.click(body.getByRole("button", { name: "Show inner" }));
    const inner = await findDialog(body, "Inner modal");

    return { outer, inner };
};

const expectInnerModalOnTop = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const { outer, inner } = await openNestedModals(context, body);

    const innerRect = getPanelRect(inner);
    const outerRect = getPanelRect(outer);
    const outerOnly = { x: getCenter(outerRect).x, y: outerRect.top + 10 };
    await expect(outer).toBeInTheDocument();
    await expect(isOutside(outerOnly, innerRect)).toBe(true);
    await expect(getPanel(inner)).toContainElement(getPaintedAt(ownerDocument, getCenter(innerRect)));
    await expect(getPaintedAt(ownerDocument, outerOnly)).toBe(getOverlay(inner));
    await waitFor(() => expect(inner).toContainElement(ownerDocument.activeElement));

    await userEvent.keyboard("{Escape}");
    await waitForClosed(inner);
    await expectStaysOpen(outer);
    await waitFor(() => expect(outer).toContainElement(ownerDocument.activeElement));

    await userEvent.keyboard("{Escape}");
    await waitForClosed(outer);
};

export const ModalOpensNestedModal = () => {
    return <NestedModals isInnerNested />;
};

ModalOpensNestedModal.play = expectInnerModalOnTop;

export const ModalOpensSiblingModal = () => {
    return <NestedModals isInnerNested={false} />;
};

ModalOpensSiblingModal.play = expectInnerModalOnTop;

export const NestedModalsOutsideClick = () => {
    return <NestedModals isInnerNested />;
};

NestedModalsOutsideClick.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const { outer, inner } = await openNestedModals(context, body);

    const innerBackdrop = getHitAt(ownerDocument, BACKDROP_POINT);
    await expect(innerBackdrop).toBe(getOverlay(inner));
    await userEvent.click(innerBackdrop);
    await waitForClosed(inner);
    await expectStaysOpen(outer);

    const outerBackdrop = getHitAt(ownerDocument, BACKDROP_POINT);
    await expect(outerBackdrop).toBe(getOverlay(outer));
    await userEvent.click(outerBackdrop);
    await waitForClosed(outer);
};

export const PopoverInNestedModal = () => {
    return <NestedModals isInnerNested />;
};

PopoverInNestedModal.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const { outer, inner } = await openNestedModals(context, body);

    await userEvent.click(body.getByRole("button", { name: "Inner popover target" }));
    const box = await findPlacedLayer(ownerDocument, POPOVER_SELECTOR, "Inner popover content");
    await expectOnTopPastPanel(ownerDocument, box, getPanelRect(inner), "bottom");

    const boxRect = box.getBoundingClientRect();
    const outerRect = getPanelRect(outer);
    const overOuterPanel = { x: getCenter(boxRect).x, y: (getPanelRect(inner).bottom + outerRect.bottom) / 2 };
    await expect(isOutside(overOuterPanel, outerRect)).toBe(false);
    await expect(box).toContainElement(getPaintedAt(ownerDocument, overOuterPanel));
};

export const DrawerWithPopover = () => {
    const content = (
        <Popover openOn="click" placement="left">
            <Button>Drawer popover target</Button>
            <Popover.Content className="w-24 p-4">Drawer popover content</Popover.Content>
        </Popover>
    );

    return <LaunchedDrawer title="Drawer with a popover" content={content} />;
};

DrawerWithPopover.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const drawer = await openLaunched(context, body, "Open drawer", "Drawer with a popover");

    await userEvent.click(body.getByRole("button", { name: "Drawer popover target" }));
    const box = await findPlacedLayer(ownerDocument, POPOVER_SELECTOR, "Drawer popover content");
    await expectOnTopPastPanel(ownerDocument, box, getPanelRect(drawer), "left");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(ownerDocument, POPOVER_SELECTOR, "Drawer popover content");
    await expectStaysOpen(drawer);

    await userEvent.click(body.getByRole("button", { name: "Drawer popover target" }));
    await findPlacedLayer(ownerDocument, POPOVER_SELECTOR, "Drawer popover content");
    const backdrop = getHitAt(ownerDocument, BACKDROP_POINT);
    await expect(backdrop).toBe(getOverlay(drawer));

    await userEvent.click(backdrop);
    await expectNoLayer(ownerDocument, POPOVER_SELECTOR, "Drawer popover content");
    await waitForClosed(drawer);
};

export const DrawerWithTooltip = () => {
    const content = (
        <Tooltip content="Drawer tooltip content" placement="left" maxWidth={100}>
            <Button>Drawer tooltip target</Button>
        </Tooltip>
    );

    return <LaunchedDrawer title="Drawer with a tooltip" content={content} />;
};

DrawerWithTooltip.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const drawer = await openLaunched(context, body, "Open drawer", "Drawer with a tooltip");

    await userEvent.hover(getTarget(body, "Drawer tooltip target"));
    const bubble = await findPlacedLayer(ownerDocument, TOOLTIP_SELECTOR, "Drawer tooltip content");
    await expectOnTopPastPanel(ownerDocument, bubble, getPanelRect(drawer), "left");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(ownerDocument, TOOLTIP_SELECTOR, "Drawer tooltip content");
    await expectStaysOpen(drawer);

    await userEvent.keyboard("{Escape}");
    await waitForClosed(drawer);
};

export const DrawerOpensModal = () => {
    const content = (
        <LaunchedModal title="Modal from a drawer">
            <Input placeholder="Modal field" />
        </LaunchedModal>
    );

    return <LaunchedDrawer title="Drawer that opens a modal" content={content} />;
};

DrawerOpensModal.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const drawer = await openLaunched(context, body, "Open drawer", "Drawer that opens a modal");

    await userEvent.click(body.getByRole("button", { name: "Open modal" }));
    const modal = await findDialog(body, "Modal from a drawer");

    const modalRect = getPanelRect(modal);
    const drawerRect = getPanelRect(drawer);
    const drawerOnly = { x: getCenter(drawerRect).x, y: drawerRect.top + 10 };
    await expect(isOutside(drawerOnly, modalRect)).toBe(true);
    await expect(getPanel(modal)).toContainElement(getPaintedAt(ownerDocument, getCenter(modalRect)));
    await expect(getPaintedAt(ownerDocument, drawerOnly)).toBe(getOverlay(modal));
    await waitFor(() => expect(modal).toContainElement(ownerDocument.activeElement));

    const backdrop = getHitAt(ownerDocument, BACKDROP_POINT);
    await expect(backdrop).toBe(getOverlay(modal));
    await userEvent.click(backdrop);
    await waitForClosed(modal);
    await expectStaysOpen(drawer);

    await userEvent.click(body.getByRole("button", { name: "Open modal" }));
    const reopened = await findDialog(body, "Modal from a drawer");
    await userEvent.keyboard("{Escape}");
    await waitForClosed(reopened);
    await expectStaysOpen(drawer);

    await userEvent.keyboard("{Escape}");
    await waitForClosed(drawer);
};

export const ModalOpensDrawer = () => {
    const content = <Input placeholder="Drawer field" />;

    return (
        <LaunchedModal title="Modal that opens a drawer">
            <LaunchedDrawer title="Drawer from a modal" content={content} />
        </LaunchedModal>
    );
};

ModalOpensDrawer.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const modal = await openLaunched(context, body, "Open modal", "Modal that opens a drawer");

    await userEvent.click(body.getByRole("button", { name: "Open drawer" }));
    const drawer = await findDialog(body, "Drawer from a modal");
    const drawerCenter = getCenter(getPanelRect(drawer));

    // Pinned, not intended: both dialogs portal to the Headless UI root, where Modal's z-30 paints over Drawer's z-10
    // whichever opened first. The Modal is inert while the Drawer is on top, so the pointer reaches the Drawer anyway
    await expect(modal).toContainElement(getPaintedAt(ownerDocument, drawerCenter));
    await expect(getPanel(drawer)).toContainElement(getHitAt(ownerDocument, drawerCenter));
    await waitFor(() => expect(drawer).toContainElement(ownerDocument.activeElement));

    await userEvent.keyboard("{Escape}");
    await waitForClosed(drawer);
    await expectStaysOpen(modal);

    await userEvent.keyboard("{Escape}");
    await waitForClosed(modal);
};

export const BottomSheetWithPopover = () => {
    return (
        <LaunchedBottomSheet title="Sheet with a popover">
            <Popover openOn="click" placement="top">
                <Button>Sheet popover target</Button>
                <Popover.Content className={TALL_CLASS}>Sheet popover content</Popover.Content>
            </Popover>
        </LaunchedBottomSheet>
    );
};

BottomSheetWithPopover.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const sheet = await openLaunched(context, body, "Open sheet", "Sheet with a popover");

    await userEvent.click(body.getByRole("button", { name: "Sheet popover target" }));
    const box = await findPlacedLayer(ownerDocument, POPOVER_SELECTOR, "Sheet popover content");
    await expectOnTopPastPanel(ownerDocument, box, getPanelRect(sheet), "top");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(ownerDocument, POPOVER_SELECTOR, "Sheet popover content");
    await expectStaysOpen(sheet);

    // BottomSheet passes a no-op to the Dialog's onClose, so Escape never closes it
    await userEvent.keyboard("{Escape}");
    await expectStaysOpen(sheet);

    await userEvent.click(body.getByRole("button", { name: "Sheet popover target" }));
    await findPlacedLayer(ownerDocument, POPOVER_SELECTOR, "Sheet popover content");
    const backdrop = getHitAt(ownerDocument, BACKDROP_POINT);
    await expect(backdrop).toBe(getOverlay(sheet));

    await userEvent.click(backdrop);
    await expectNoLayer(ownerDocument, POPOVER_SELECTOR, "Sheet popover content");
    await waitForClosed(sheet);
};

export const BottomSheetWithTooltip = () => {
    return (
        <LaunchedBottomSheet title="Sheet with a tooltip">
            <Tooltip content="Sheet tooltip content" placement="top" contentClassName="block h-60">
                <Button>Sheet tooltip target</Button>
            </Tooltip>
        </LaunchedBottomSheet>
    );
};

BottomSheetWithTooltip.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = within(ownerDocument.body);
    const sheet = await openLaunched(context, body, "Open sheet", "Sheet with a tooltip");

    await userEvent.hover(getTarget(body, "Sheet tooltip target"));
    const bubble = await findPlacedLayer(ownerDocument, TOOLTIP_SELECTOR, "Sheet tooltip content");
    await expectOnTopPastPanel(ownerDocument, bubble, getPanelRect(sheet), "top");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(ownerDocument, TOOLTIP_SELECTOR, "Sheet tooltip content");
    await expectStaysOpen(sheet);
};

export default OverlayCombinationsStories;
