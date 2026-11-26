import React from "react";

/** React ownership for portaled overlays; DOM ancestry cannot relate them to their dialog backdrop. */
export const BackdropOwnerContext = React.createContext(undefined);

/** JSON quoting escapes the owner ID for an attribute selector without relying on the browser's global CSS object. */
const getOwnedLayerSelector = (owner) => {
    const ownerAttribute = `[data-backdrop-owner=${JSON.stringify(owner)}]`;

    return `.ui-popover[data-state="open"]${ownerAttribute}, .ui-tooltip[data-state$="-open"]${ownerAttribute}`;
};

/** Per backdrop element: whether its current press started while a Popover or Tooltip was open. */
const isLayerPressByBackdrop = new WeakMap();

/**
 * Skips the dialog click ending a press that began with an owned Popover or Tooltip open. Radix closes the layer on
 * outside press but lets the click through. React's backdrop pointerdown runs before Radix's document listener,
 * so it records whether the layer was open.
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
