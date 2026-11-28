import { useLatest } from "ahooks";
import { createContext, useEffect, useState } from "react";

/** React ownership for portaled overlays; DOM ancestry cannot relate them to their dialog backdrop. */
export const BackdropOwnerContext = createContext();

/** Open layers keyed by content element, in registration order: the last registered sits highest in the stack. */
const openLayers = new Map();

/**
 * Registers an open layer so a backdrop press dismisses only the newest layer of its owner. Radix would instead
 * dismiss every layer above the dialog on one press. Re-registering an element replaces its owner and dismiss
 * callback without moving it in the stack.
 *
 * @returns {Function} Cleanup removing the layer, for close and unmount.
 */
export const registerOpenLayer = (element, owner, onDismiss) => {
    openLayers.set(element, { owner, onDismiss });

    return () => openLayers.delete(element);
};

/**
 * Props a portaled layer spreads on its content: a ref capturing the content element plus markers declaring the
 * layer and its owner. Registers while open, newest last, and keeps the latest dismiss callback without reordering
 * the stack on rerender. The element is state, not a bare ref: Radix Presence mounts the content a commit after
 * the layer opens, and only a state change reruns the registration effect for that late node.
 */
export const useOpenLayerProps = (isOpen, owner, onDismiss) => {
    const [element, setElement] = useState();
    const dismissRef = useLatest(onDismiss);

    useEffect(() => {
        if (!isOpen || !element) {
            return undefined;
        }

        return registerOpenLayer(element, owner, () => dismissRef.current?.());
    }, [isOpen, owner, element, dismissRef]);

    return {
        ref: setElement,
        "data-ui-kit-layer": isOpen ? "open" : undefined,
        "data-backdrop-owner": owner,
    };
};

const findNewestOwnedLayer = (owner) => {
    if (!owner) {
        return undefined;
    }

    let newest;
    openLayers.forEach((layer) => {
        if (layer.owner === owner) {
            newest = layer;
        }
    });

    return newest;
};

/** Per backdrop element: whether its current press started while an owned layer was open. */
const isLayerPressByBackdrop = new WeakMap();

/**
 * Dismisses one layer per backdrop press, newest owned layer first, then the dialog once none are left. The
 * pointerdown stops before Radix's document listeners so lower layers and the dialog keep their press; React's
 * backdrop handler runs before those listeners because the portal container is `body`.
 *
 * @param {Function} onBackdropClick - Closes the dialog. Called with no arguments.
 * @returns {{ onPointerDown: Function, onClick: Function }} Props for the backdrop element
 */
export const getBackdropHandlers = (onBackdropClick) => {
    const handlePointerDown = (event) => {
        const { currentTarget } = event;
        const layer = findNewestOwnedLayer(currentTarget.dataset.backdropOwner);
        isLayerPressByBackdrop.set(currentTarget, Boolean(layer));
        if (!layer) {
            return;
        }

        event.stopPropagation();
        // Stopping the press also removes Radix's deferred-press suppression of focus-outside dismissal, and
        // Firefox fires focusin when focus falls to body. Cancel the default focus change so a surviving lower
        // layer cannot read the press's blur as an outside interaction.
        event.preventDefault();
        layer.onDismiss();
    };

    const handleClick = (event) => {
        const { currentTarget } = event;
        const isLayerPress = isLayerPressByBackdrop.get(currentTarget);
        isLayerPressByBackdrop.delete(currentTarget);
        if (isLayerPress) {
            // A lower layer's deferred Radix dismissal may already be waiting on this click.
            event.stopPropagation();
            return;
        }

        onBackdropClick();
    };

    return { onPointerDown: handlePointerDown, onClick: handleClick };
};
