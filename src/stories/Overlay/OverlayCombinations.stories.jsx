import React, { useState } from "react";
import { expect, fn, waitFor } from "storybook/test";
import { BottomSheet, Button, ComboBox, Drawer, Input, Modal, Popover, Sidebar, Tooltip } from "../..";
import {
    expectFocusInside,
    expectNoLayer,
    findLayer,
    getPortalCanvas,
    getTarget,
    POPOVER_SELECTOR,
    queryLayer,
    TOOLTIP_SELECTOR,
    wait,
    waitForClosed,
} from "../helpers";

const OverlayCombinationsStories = {
    title: "Overlay/Combinations",
    parameters: {
        docs: {
            description: {
                component:
                    "Modal, Drawer and BottomSheet opened from each other and holding a Popover or Tooltip. The play tests measure stacking with `elementFromPoint` instead of reading z-index classes.",
            },
        },
    },
};

/** Marks the white panel of every Modal, Drawer and BottomSheet below, which none of them expose by class. */
const PANEL_CLASS = "combo-panel";

const DIALOG_SELECTOR = ".ui-modal, .ui-drawer, .ui-bottom-sheet";
const OVERLAY_SELECTOR = ".ui-modal-overlay, .ui-drawer-overlay, .ui-bottom-sheet-overlay";
const SIDEBAR_MENU_SELECTOR = ".ui-sidebar-menu";

/** Centered Modal panels, right-side Drawer panels and BottomSheet panels all leave the top-left corner to the backdrop. */
const BACKDROP_POINT = { x: 4, y: 4 };

/** Taller than the gap between each trigger below and its panel edge, so the layer has to overflow the panel. */
const TALL_CLASS = "h-60 w-48 p-4";

/** Radix fades a closing layer out over 250ms and reacts to presses within a timer tick. */
const CHANGE_WINDOW = 400;

/** Modal and BottomSheet leave in at most 300ms, Drawer in 500ms. */
const LEAVE_WINDOW = 600;

const DRAWER_CLASS_NAMES = { children: PANEL_CLASS };

const getCenter = ({ left, top, width, height }) => ({ x: left + width / 2, y: top + height / 2 });

const isOutside = ({ x, y }, { left, top, right, bottom }) => x < left || x > right || y < top || y > bottom;

/** The element a real pointer lands on. Modal dialogs make outside content inert or pointer-disabled, which hit testing skips. */
const getHitAt = (ownerDocument, { x, y }) => ownerDocument.elementFromPoint(x, y);

/**
 * The element painted on top. Inert and pointer-disabled nodes drop out of hit testing, so a lower dialog would let a
 * point through to a layer it covers. Lift those locks for one synchronous read so stacking, not interactivity, decides.
 */
const getPaintedAt = (ownerDocument, { x, y }) => {
    const inertNodes = [...ownerDocument.querySelectorAll("[inert]")];
    const { body } = ownerDocument;
    const bodyPointerEvents = body.style.pointerEvents;
    inertNodes.forEach((node) => node.removeAttribute("inert"));
    body.style.pointerEvents = "auto";
    const element = ownerDocument.elementFromPoint(x, y);
    body.style.pointerEvents = bodyPointerEvents;
    inertNodes.forEach((node) => node.setAttribute("inert", ""));

    return element;
};

/** Radix parks content at `translate(0, -200%)` until it is placed, then fades it in; rects read before that are off. */
const findPlacedLayer = (canvasElement, selector, text) => {
    return waitFor(() => {
        const layer = queryLayer(canvasElement, selector, text);
        expect(layer).toBeInstanceOf(HTMLElement);

        const wrapper = layer.closest("[data-radix-popper-content-wrapper]");
        expect(wrapper.style.transform).not.toContain("-200%");
        expect(layer.getAnimations()).toHaveLength(0);

        return layer;
    });
};

/** Dialogs scale, slide and fade in; rects read before every animation ends are off. */
const waitForSettled = (dialog) => {
    const root = dialog.closest(DIALOG_SELECTOR);

    return waitFor(
        () => {
            expect(dialog).toBeVisible();
            expect(root.getAnimations({ subtree: true })).toHaveLength(0);
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

/** A dialog that would close has started leaving, or is gone, by the end of the window. */
const expectStaysOpen = async (dialog) => {
    await wait(LEAVE_WINDOW);
    await expect(dialog).toBeVisible();
};

const getPanel = (dialog) => dialog.querySelector(`.${PANEL_CLASS}`);

const getPanelRect = (dialog) => getPanel(dialog).getBoundingClientRect();

const getOverlay = (dialog) => dialog.querySelector(OVERLAY_SELECTOR);

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

/**
 * Radix closes an open layer on an outside press and lets the click through, so the first backdrop click must stop at
 * the layer and only the next one may close the dialog.
 */
const expectBackdropClosesLayerFirst = async ({ canvasElement, userEvent }, dialog, selector, text) => {
    const { ownerDocument } = canvasElement;
    const backdrop = getHitAt(ownerDocument, BACKDROP_POINT);
    await expect(backdrop).toBe(getOverlay(dialog));

    await userEvent.click(backdrop);
    await expectNoLayer(canvasElement, selector, text);
    await expectStaysOpen(dialog);

    await userEvent.click(backdrop);
    await waitForClosed(dialog);
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
    const body = getPortalCanvas(canvasElement);
    const dialog = await openLaunched(context, body, "Open modal", "Modal with a click popover");

    await userEvent.click(body.getByRole("button", { name: "Click popover target" }));
    const box = await findPlacedLayer(canvasElement, POPOVER_SELECTOR, "Click popover content");
    await expectOnTopPastPanel(ownerDocument, box, getPanelRect(dialog), "bottom");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Click popover content");
    await expectStaysOpen(dialog);

    await userEvent.click(body.getByRole("button", { name: "Click popover target" }));
    await findPlacedLayer(canvasElement, POPOVER_SELECTOR, "Click popover content");
    await expectBackdropClosesLayerFirst(context, dialog, POPOVER_SELECTOR, "Click popover content");
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
    const body = getPortalCanvas(canvasElement);
    const dialog = await openLaunched(context, body, "Open modal", "Modal with a hover popover");
    const target = getTarget(body, "Hover popover target");

    await userEvent.hover(target);
    const box = await findPlacedLayer(canvasElement, POPOVER_SELECTOR, "Hover popover content");
    await expectOnTopPastPanel(ownerDocument, box, getPanelRect(dialog), "top");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Hover popover content");
    await expectStaysOpen(dialog);

    // Modal dialogs disable pointer events on body, so move to the panel rather than unhovering onto body
    await userEvent.hover(getPanel(dialog));
    await userEvent.hover(target);
    await findPlacedLayer(canvasElement, POPOVER_SELECTOR, "Hover popover content");

    // Leaving the target only starts the 100ms close grace, so the popover is still open when the backdrop press lands
    await expectBackdropClosesLayerFirst(context, dialog, POPOVER_SELECTOR, "Hover popover content");
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
    const body = getPortalCanvas(canvasElement);
    const dialog = await openLaunched(context, body, "Open modal", "Modal with default dismissal");

    await userEvent.click(body.getByRole("button", { name: "Default dismissal target" }));
    await findPlacedLayer(canvasElement, POPOVER_SELECTOR, "Default dismissal content");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Default dismissal content");
    await expectStaysOpen(dialog);

    // Modal routes Escape through the same gate as the backdrop, so without the flag Escape is ignored
    await userEvent.keyboard("{Escape}");
    await expectStaysOpen(dialog);

    await userEvent.click(getHitAt(ownerDocument, BACKDROP_POINT));
    await expectStaysOpen(dialog);
    await expect(dialog).toHaveFocus();
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
    const body = getPortalCanvas(canvasElement);
    const dialog = await openLaunched(context, body, "Open modal", "Modal with a tooltip");

    await userEvent.hover(getTarget(body, "Modal tooltip target"));
    const bubble = await findPlacedLayer(canvasElement, TOOLTIP_SELECTOR, "Modal tooltip content");
    await expectOnTopPastPanel(ownerDocument, bubble, getPanelRect(dialog), "top");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Modal tooltip content");
    await expectStaysOpen(dialog);

    await userEvent.keyboard("{Escape}");
    await waitForClosed(dialog);
};

export const ModalWithSidebarMenu = () => {
    return (
        <LaunchedModal title="Modal with a sidebar menu">
            <Sidebar.Menu content={<div className="p-4">Sidebar menu content</div>}>
                <Button>Sidebar menu target</Button>
            </Sidebar.Menu>
        </LaunchedModal>
    );
};

ModalWithSidebarMenu.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const body = getPortalCanvas(canvasElement);
    const dialog = await openLaunched(context, body, "Open modal", "Modal with a sidebar menu");

    await userEvent.hover(getTarget(body, "Sidebar menu target"));
    await findLayer(canvasElement, SIDEBAR_MENU_SELECTOR, "Sidebar menu content");

    await expectBackdropClosesLayerFirst(context, dialog, SIDEBAR_MENU_SELECTOR, "Sidebar menu content");
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
    const body = getPortalCanvas(canvasElement);
    const dialog = await openLaunched(context, body, "Open modal", "Modal with a tooltip in a popover");

    await userEvent.click(body.getByRole("button", { name: "Popover holding a tooltip" }));
    const box = await findPlacedLayer(canvasElement, POPOVER_SELECTOR, "Tooltip in popover");
    await userEvent.hover(getTarget(body, "Tooltip in popover"));
    const bubble = await findPlacedLayer(canvasElement, TOOLTIP_SELECTOR, "Tooltip over the popover");

    const bubbleCenter = getCenter(bubble.getBoundingClientRect());
    await expect(isOutside(bubbleCenter, box.getBoundingClientRect())).toBe(false);
    await expect(bubble).toContainElement(getPaintedAt(ownerDocument, bubbleCenter));
    await expect(bubble).toContainElement(getHitAt(ownerDocument, bubbleCenter));

    // Each Escape dismisses only the newest layer, leaving the containing modal open until those layers are gone
    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Tooltip over the popover");
    await wait(CHANGE_WINDOW);
    await expect(box).toHaveAttribute("data-state", "open");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Tooltip in popover");
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
    const body = getPortalCanvas(canvasElement);
    const { outer, inner } = await openNestedModals(context, body);

    const innerRect = getPanelRect(inner);
    const outerRect = getPanelRect(outer);
    const outerOnly = { x: getCenter(outerRect).x, y: outerRect.top + 10 };
    await expect(outer).toBeInTheDocument();
    await expect(isOutside(outerOnly, innerRect)).toBe(true);
    await expect(getPanel(inner)).toContainElement(getPaintedAt(ownerDocument, getCenter(innerRect)));
    await expect(getPaintedAt(ownerDocument, outerOnly)).toBe(getOverlay(inner));
    await expectFocusInside(inner, ownerDocument);

    await userEvent.keyboard("{Escape}");
    await waitForClosed(inner);
    await expectStaysOpen(outer);
    await expectFocusInside(outer, ownerDocument);

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
    const body = getPortalCanvas(canvasElement);
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
    const body = getPortalCanvas(canvasElement);
    const { outer, inner } = await openNestedModals(context, body);

    await userEvent.click(body.getByRole("button", { name: "Inner popover target" }));
    const box = await findPlacedLayer(canvasElement, POPOVER_SELECTOR, "Inner popover content");
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
    const body = getPortalCanvas(canvasElement);
    const drawer = await openLaunched(context, body, "Open drawer", "Drawer with a popover");

    await userEvent.click(body.getByRole("button", { name: "Drawer popover target" }));
    const box = await findPlacedLayer(canvasElement, POPOVER_SELECTOR, "Drawer popover content");
    await expectOnTopPastPanel(ownerDocument, box, getPanelRect(drawer), "left");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Drawer popover content");
    await expectStaysOpen(drawer);

    await userEvent.click(body.getByRole("button", { name: "Drawer popover target" }));
    await findPlacedLayer(canvasElement, POPOVER_SELECTOR, "Drawer popover content");
    await expectBackdropClosesLayerFirst(context, drawer, POPOVER_SELECTOR, "Drawer popover content");
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
    const body = getPortalCanvas(canvasElement);
    const drawer = await openLaunched(context, body, "Open drawer", "Drawer with a tooltip");

    await userEvent.hover(getTarget(body, "Drawer tooltip target"));
    const bubble = await findPlacedLayer(canvasElement, TOOLTIP_SELECTOR, "Drawer tooltip content");
    await expectOnTopPastPanel(ownerDocument, bubble, getPanelRect(drawer), "left");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Drawer tooltip content");
    await expectStaysOpen(drawer);

    await userEvent.keyboard("{Escape}");
    await waitForClosed(drawer);
};

/** Held open like seller's ErrorTooltip: `open` plus an `onClickOutside` that toggles it, and no `onOpenChange`. */
const HeldOpenTooltip = () => {
    const [isVisible, setIsVisible] = useState(true);
    const handleClickOutside = () => setIsVisible(!isVisible);

    return (
        <Tooltip open={isVisible} content="Held tooltip content" placement="left" onClickOutside={handleClickOutside}>
            <Button>Held tooltip target</Button>
        </Tooltip>
    );
};

export const DrawerWithHeldOpenTooltip = () => {
    return <LaunchedDrawer title="Drawer with a held open tooltip" content={<HeldOpenTooltip />} />;
};

/** Radix takes the Escape from the Drawer, so the tooltip's only close request has to reach `onClickOutside`. */
DrawerWithHeldOpenTooltip.play = async (context) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = getPortalCanvas(canvasElement);
    const drawer = await openLaunched(context, body, "Open drawer", "Drawer with a held open tooltip");
    await findPlacedLayer(canvasElement, TOOLTIP_SELECTOR, "Held tooltip content");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Held tooltip content");
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
    const body = getPortalCanvas(canvasElement);
    const drawer = await openLaunched(context, body, "Open drawer", "Drawer that opens a modal");

    await userEvent.click(body.getByRole("button", { name: "Open modal" }));
    const modal = await findDialog(body, "Modal from a drawer");

    const modalRect = getPanelRect(modal);
    const drawerRect = getPanelRect(drawer);
    const drawerOnly = { x: getCenter(drawerRect).x, y: drawerRect.top + 10 };
    await expect(isOutside(drawerOnly, modalRect)).toBe(true);
    await expect(getPanel(modal)).toContainElement(getPaintedAt(ownerDocument, getCenter(modalRect)));
    await expect(getPaintedAt(ownerDocument, drawerOnly)).toBe(getOverlay(modal));
    await expectFocusInside(modal, ownerDocument);

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
    const body = getPortalCanvas(canvasElement);
    const modal = await openLaunched(context, body, "Open modal", "Modal that opens a drawer");

    await userEvent.click(body.getByRole("button", { name: "Open drawer" }));
    const drawer = await findDialog(body, "Drawer from a modal");

    // Both dialogs portal to body at z-30, so the one opened last paints on top
    const drawerRect = getPanelRect(drawer);
    const drawerCenter = getCenter(drawerRect);
    const modalCenter = getCenter(getPanelRect(modal));
    await expect(isOutside(modalCenter, drawerRect)).toBe(true);
    await expect(getPanel(drawer)).toContainElement(getPaintedAt(ownerDocument, drawerCenter));
    await expect(getPanel(drawer)).toContainElement(getHitAt(ownerDocument, drawerCenter));
    await expect(getPaintedAt(ownerDocument, modalCenter)).toBe(getOverlay(drawer));
    await expectFocusInside(drawer, ownerDocument);

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
    const body = getPortalCanvas(canvasElement);
    const sheet = await openLaunched(context, body, "Open sheet", "Sheet with a popover");

    await userEvent.click(body.getByRole("button", { name: "Sheet popover target" }));
    const box = await findPlacedLayer(canvasElement, POPOVER_SELECTOR, "Sheet popover content");
    await expectOnTopPastPanel(ownerDocument, box, getPanelRect(sheet), "top");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, POPOVER_SELECTOR, "Sheet popover content");
    await expectStaysOpen(sheet);

    // BottomSheet passes a no-op to the Dialog's onClose, so Escape never closes it
    await userEvent.keyboard("{Escape}");
    await expectStaysOpen(sheet);

    await userEvent.click(body.getByRole("button", { name: "Sheet popover target" }));
    await findPlacedLayer(canvasElement, POPOVER_SELECTOR, "Sheet popover content");
    await expectBackdropClosesLayerFirst(context, sheet, POPOVER_SELECTOR, "Sheet popover content");
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
    const body = getPortalCanvas(canvasElement);
    const sheet = await openLaunched(context, body, "Open sheet", "Sheet with a tooltip");

    const target = getTarget(body, "Sheet tooltip target");
    await userEvent.hover(target);
    const bubble = await findPlacedLayer(canvasElement, TOOLTIP_SELECTOR, "Sheet tooltip content");
    await expectOnTopPastPanel(ownerDocument, bubble, getPanelRect(sheet), "top");

    await userEvent.keyboard("{Escape}");
    await expectNoLayer(canvasElement, TOOLTIP_SELECTOR, "Sheet tooltip content");
    await expectStaysOpen(sheet);

    // A tooltip closes as soon as the pointer leaves its target, so only one opened by focus is open at the press
    // Move to the close button because modal dialogs disable pointer events on body, userEvent's usual unhover target
    await userEvent.hover(body.getByRole("button", { name: "Close" }));
    await userEvent.tab();
    await expect(body.getByRole("button", { name: "Sheet tooltip target" })).toHaveFocus();
    await findPlacedLayer(canvasElement, TOOLTIP_SELECTOR, "Sheet tooltip content");
    await expectBackdropClosesLayerFirst(context, sheet, TOOLTIP_SELECTOR, "Sheet tooltip content");
};

const expectBackdropClosesSheetWithUnrelatedLayer = async (context, title, selector, text) => {
    const { canvasElement, userEvent } = context;
    const { ownerDocument } = canvasElement;
    const body = getPortalCanvas(canvasElement);
    const sheet = await openLaunched(context, body, "Open sheet", title);

    await findPlacedLayer(canvasElement, selector, text);
    const backdrop = getHitAt(ownerDocument, BACKDROP_POINT);
    await expect(backdrop).toBe(getOverlay(sheet));
    await userEvent.click(backdrop);

    await waitForClosed(sheet);
    await expect(queryLayer(canvasElement, selector, text)).toBeInstanceOf(HTMLElement);
};

export const BottomSheetWithUnrelatedControlledTooltip = () => {
    return (
        <>
            <Tooltip open content="Unrelated tooltip content">
                <Button>Unrelated tooltip target</Button>
            </Tooltip>
            <LaunchedBottomSheet title="Sheet with an unrelated tooltip">Sheet body</LaunchedBottomSheet>
        </>
    );
};

BottomSheetWithUnrelatedControlledTooltip.play = async (context) => {
    await expectBackdropClosesSheetWithUnrelatedLayer(
        context,
        "Sheet with an unrelated tooltip",
        TOOLTIP_SELECTOR,
        "Unrelated tooltip content",
    );
};

export const BottomSheetWithUnrelatedControlledPopover = () => {
    return (
        <>
            <Popover open openOn="click">
                <Button>Unrelated popover target</Button>
                <Popover.Content className="p-4">Unrelated popover content</Popover.Content>
            </Popover>
            <LaunchedBottomSheet title="Sheet with an unrelated popover">Sheet body</LaunchedBottomSheet>
        </>
    );
};

BottomSheetWithUnrelatedControlledPopover.play = async (context) => {
    await expectBackdropClosesSheetWithUnrelatedLayer(
        context,
        "Sheet with an unrelated popover",
        POPOVER_SELECTOR,
        "Unrelated popover content",
    );
};

const COMBO_OPTIONS = [
    { value: 1, label: "Inline option" },
    { value: 2, label: "Portaled option" },
];

const PORTALED_MENU_CLASS_NAMES = { menuPortal: () => "!z-30" };

/**
 * react-select draws its menu inline by default. A `menuPortalTarget` of `document.body` at z-30 ties with the Drawer,
 * so DOM order alone keeps that menu on top.
 */
export const DrawerWithComboBox = () => {
    const content = (
        <div className="flex flex-col gap-4">
            <ComboBox aria-label="Inline combo box" options={COMBO_OPTIONS} />
            <ComboBox
                aria-label="Portaled combo box"
                options={COMBO_OPTIONS}
                menuPortalTarget={document.body}
                classNames={PORTALED_MENU_CLASS_NAMES}
            />
        </div>
    );

    return <LaunchedDrawer title="Drawer with combo boxes" content={content} />;
};

const openMenu = async ({ canvasElement, userEvent }, name) => {
    const { ownerDocument } = canvasElement;
    await userEvent.click(getPortalCanvas(canvasElement).getByRole("combobox", { name }));

    return waitFor(() => {
        const menu = ownerDocument.querySelector(".ui-combo-box__menu");
        expect(menu).toBeInstanceOf(HTMLElement);

        return menu;
    });
};

const expectMenuOnTop = async ({ canvasElement, userEvent }, menu, drawer) => {
    const { ownerDocument } = canvasElement;
    const center = getCenter(menu.getBoundingClientRect());
    await expect(menu).toContainElement(getPaintedAt(ownerDocument, center));
    await expect(menu).toContainElement(getHitAt(ownerDocument, center));

    // react-select closes its menu on Escape, and the containing drawer must leave that key to the expanded combobox
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(menu).not.toBeInTheDocument());
    await expectStaysOpen(drawer);
};

DrawerWithComboBox.play = async (context) => {
    const { canvasElement } = context;
    const { ownerDocument } = canvasElement;
    const body = getPortalCanvas(canvasElement);
    const drawer = await openLaunched(context, body, "Open drawer", "Drawer with combo boxes");
    await expect(getComputedStyle(drawer).zIndex).toBe("30");

    const inlineMenu = await openMenu(context, "Inline combo box");
    await expect(drawer).toContainElement(inlineMenu);
    await expectMenuOnTop(context, inlineMenu, drawer);

    const portaledMenu = await openMenu(context, "Portaled combo box");
    const menuPortal = portaledMenu.closest(".ui-combo-box__menu-portal");
    await expect(menuPortal.parentElement).toBe(ownerDocument.body);
    await expect(getComputedStyle(menuPortal).zIndex).toBe("30");
    await expectMenuOnTop(context, portaledMenu, drawer);
};

const SidebarWithDrawers = () => {
    const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);
    const handleDrawerStateChange = () => setIsAnnouncementsOpen(!isAnnouncementsOpen);
    const notifications = {
        announcements: { count: 1, title: "Announcements", content: <div>Announcement content</div> },
    };

    return (
        <div className="h-screen">
            <Sidebar
                notifications={notifications}
                isLeftDrawerOpen={isAnnouncementsOpen}
                handleDrawerStateChange={handleDrawerStateChange}
            >
                <Sidebar.Link>Sellers</Sidebar.Link>
                <Sidebar.Link>Favorites</Sidebar.Link>
            </Sidebar>
            <div className="flex justify-end p-8">
                <LaunchedDrawer title="Drawer beside a sidebar" content={<Input placeholder="Drawer field" />} />
            </div>
        </div>
    );
};

/**
 * What is painted over the sidebar rail with a drawer open. Modal dialogs make the rail inert or pointer-disabled, so
 * a raw hit test passes through it, and only the painted probe tells whether the drawer's backdrop dims it.
 */
const getPaintedOverRail = (ownerDocument) => {
    const rail = ownerDocument.querySelector(".ui-sidebar");
    const { left, top, width } = rail.getBoundingClientRect();

    return { rail, painted: getPaintedAt(ownerDocument, { x: left + width / 2, y: top + 200 }) };
};

export const SidebarNotificationsDrawer = () => <SidebarWithDrawers />;

SidebarNotificationsDrawer.play = async ({ canvasElement, userEvent }) => {
    const { ownerDocument } = canvasElement;
    const body = getPortalCanvas(canvasElement);

    await userEvent.click(body.getByText("1"));
    const drawer = await findDialog(body, "Announcements");

    // Sidebar.Notifications keeps its drawers under the z-20 rail they slide out beside, so the rail stays undimmed
    const { rail, painted } = getPaintedOverRail(ownerDocument);
    await expect(rail).toContainElement(painted);
    await expect(getComputedStyle(drawer).zIndex).toBe("10");
};

export const SidebarWithDrawer = () => <SidebarWithDrawers />;

SidebarWithDrawer.play = async (context) => {
    const { canvasElement } = context;
    const { ownerDocument } = canvasElement;
    const body = getPortalCanvas(canvasElement);
    const drawer = await openLaunched(context, body, "Open drawer", "Drawer beside a sidebar");

    const { painted } = getPaintedOverRail(ownerDocument);
    await expect(painted).toBe(getOverlay(drawer));
    await expect(getComputedStyle(drawer).zIndex).toBe("30");
};

export default OverlayCombinationsStories;
