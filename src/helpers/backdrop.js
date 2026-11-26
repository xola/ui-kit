import { createContext } from "react";

/** React ownership for portaled overlays; DOM ancestry cannot relate them to their dialog backdrop. */
export const BackdropOwnerContext = createContext();

/**
 * Props a portaled layer spreads on its content so a dialog backdrop can find it while open: layers declare
 * themselves, so the backdrop selector stays free of component classes and Radix state vocabulary.
 */
export const getOpenLayerProps = (isOpen, owner) => ({
    "data-ui-kit-layer": isOpen ? "open" : undefined,
    "data-backdrop-owner": owner,
});

/** JSON quoting escapes the owner ID for an attribute selector without relying on the browser's global CSS object. */
const getOwnedLayerSelector = (owner) => {
    const ownerAttribute = `[data-backdrop-owner=${JSON.stringify(owner)}]`;

    return `[data-ui-kit-layer="open"]${ownerAttribute}`;
};

/** Per backdrop element: whether its current press started while an owned layer was open. */
const isLayerPressByBackdrop = new WeakMap();

/**
 * Skips the dialog click ending a press that began with an owned layer (Popover, Tooltip, Sidebar.Menu) open. Radix
 * closes the layer on outside press but lets the click through; React's backdrop pointerdown runs before Radix's
 * document listener, so it records whether the layer was open.
 *
 * @param {Function} onBackdropClick - Closes the dialog. Called with no arguments.
 * @returns {{ onPointerDown: Function, onClick: Function }} Props for the backdrop element
 */
export const getBackdropHandlers = (onBackdropClick) => {
    const handlePointerDown = ({ currentTarget }) => {
        const backdropOwner = currentTarget.dataset.backdropOwner;
        if (!backdropOwner) {
            isLayerPressByBackdrop.set(currentTarget, false);
            return;
        }

        const isLayerOpen = currentTarget.ownerDocument.querySelector(getOwnedLayerSelector(backdropOwner)) !== null;
        isLayerPressByBackdrop.set(currentTarget, isLayerOpen);
    };

    const handleClick = ({ currentTarget }) => {
        const isLayerPress = isLayerPressByBackdrop.get(currentTarget);
        isLayerPressByBackdrop.delete(currentTarget);
        if (isLayerPress) {
            return;
        }

        onBackdropClick();
    };

    return { onPointerDown: handlePointerDown, onClick: handleClick };
};
