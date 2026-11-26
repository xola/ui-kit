import { expect, waitFor, within } from "storybook/test";

/* ---------------------------------------------------------------------------
 * argTypes
 * ------------------------------------------------------------------------ */

export const PLACEMENTS = ["top", "bottom", "left", "right", "auto"];
export const LOCALES = ["en-IN", "en-US", "fr-FR", "ja-JP", "de-DE", "ar-AE"];
export const COLORS = ["primary", "secondary", "success", "warning", "caution", "danger"];

export const arg = (defaultValue, type, options, description, summary = null) => {
    return {
        type: { required: false },
        description,
        options,
        control: { type },
        table: { type: { summary }, defaultValue: { summary: defaultValue } },
    };
};

export const selectArg = (options, defaultValue) => arg(defaultValue, "select", options, undefined);

/* ---------------------------------------------------------------------------
 * Portal canvas & overlay layer queries
 * ------------------------------------------------------------------------ */

export const POPOVER_SELECTOR = ".ui-popover";
export const TOOLTIP_SELECTOR = ".ui-tooltip";

/** Overlays portal to document.body, so queries must run against it, not the story canvas. */
export const getPortalCanvas = (canvasElement) => within(canvasElement.ownerDocument.body);

export const queryLayer = (canvasElement, selector, text) => {
    const layers = canvasElement.ownerDocument.querySelectorAll(selector);

    return [...layers].find((layer) => layer.textContent.includes(text));
};

export const findLayer = (canvasElement, selector, text) => {
    return waitFor(() => {
        const layer = queryLayer(canvasElement, selector, text);
        expect(layer).toBeInstanceOf(HTMLElement);

        return layer;
    });
};

export const expectNoLayer = (canvasElement, selector, text, options) => {
    return waitFor(() => expect(queryLayer(canvasElement, selector, text)).toBeUndefined(), options);
};

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Radix/Tippy react within a timer tick; 400ms also clears the hover close grace and the 250ms fade-out. */
export const waitForChangeWindow = () => wait(400);

/** Overlay triggers wrap their Button in the positioned element. */
export const getTarget = (canvas, name) => canvas.getByRole("button", { name }).parentElement;

/** Opening focuses the first focusable element inside, not the dialog container itself. */
export const expectFocusInside = (dialog, ownerDocument) => {
    return waitFor(() => {
        expect(dialog).toContainElement(ownerDocument.activeElement);
        expect(ownerDocument.activeElement).not.toBe(dialog);
    });
};

/** The element is queried once, up front; this suits layers that detach on close, not ones that remount. */
export const waitForClosed = (dialog) => {
    return waitFor(() => expect(dialog).not.toBeInTheDocument(), { timeout: 2000 });
};

/* ---------------------------------------------------------------------------
 * Console-warn assertions
 * ------------------------------------------------------------------------ */

export const expectWarnings = (warnSpy, expected) => {
    const warnings = warnSpy.mock.calls.map(([text]) => text);

    expected.forEach((message) => {
        expect(warnings.filter((text) => text === message)).toHaveLength(1);
    });
};
