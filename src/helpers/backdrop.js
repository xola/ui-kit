/** Radix marks open Popover and HoverCard content `open`, and a shown Tooltip `delayed-open` or `instant-open`. */
const OPEN_LAYER_SELECTOR = '.ui-popover[data-state="open"], .ui-tooltip[data-state$="-open"]';

/** Per backdrop element: whether its current press started while a Popover or Tooltip was open. */
const isLayerPressByBackdrop = new WeakMap();

/**
 * Backdrop handlers that skip the click ending a press that began while a ui-kit Popover or Tooltip was open. Radix
 * closes that layer on the outside press but lets the click through, which would close the dialog too. The press is
 * checked on the backdrop's pointerdown because React runs it before Radix's document listener closes the layer.
 *
 * @param {Function} onBackdropClick - Closes the dialog. Called with no arguments.
 * @returns {{ onPointerDown: Function, onClick: Function }} Props for the backdrop element
 */
export const getBackdropHandlers = (onBackdropClick) => {
    const handlePointerDown = ({ currentTarget }) => {
        const isLayerOpen = currentTarget.ownerDocument.querySelector(OPEN_LAYER_SELECTOR) !== null;

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
