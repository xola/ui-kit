import { afterEach, describe, expect, test, vi } from "vitest";
import { getBackdropHandlers, registerOpenLayer } from "./backdrop";

const createBackdrop = (owner = "backdrop-owner") => ({ dataset: { backdropOwner: owner } });

const cleanups = [];

/** Registers a fake layer content element and remembers its cleanup so tests cannot leak into each other. */
const registerLayer = (owner = "backdrop-owner", onDismiss = vi.fn()) => {
    const element = {};
    const cleanup = registerOpenLayer(element, owner, onDismiss);
    cleanups.push(cleanup);

    return { element, onDismiss, cleanup };
};

afterEach(() => {
    cleanups.splice(0).forEach((cleanup) => cleanup());
});

const createEvent = (backdrop) => ({ currentTarget: backdrop, stopPropagation: vi.fn(), preventDefault: vi.fn() });

const press = (handlers, backdrop) => {
    const pointerDown = createEvent(backdrop);
    const click = createEvent(backdrop);
    handlers.onPointerDown(pointerDown);
    handlers.onClick(click);

    return { pointerDown, click };
};

const setup = () => {
    const onBackdropClick = vi.fn();

    return { onBackdropClick, handlers: getBackdropHandlers(onBackdropClick) };
};

describe("registerOpenLayer", () => {
    test("dismisses only the newest owned layer on a press", () => {
        const { onBackdropClick, handlers } = setup();
        const lower = registerLayer();
        const top = registerLayer();

        press(handlers, createBackdrop());

        expect(top.onDismiss).toHaveBeenCalledTimes(1);
        expect(top.onDismiss).toHaveBeenCalledWith();
        expect(lower.onDismiss).not.toHaveBeenCalled();
        expect(onBackdropClick).not.toHaveBeenCalled();
    });

    test("dismisses the newest matching owner, not the newest overall", () => {
        const { onBackdropClick, handlers } = setup();
        const owned = registerLayer();
        const other = registerLayer("another-backdrop");

        press(handlers, createBackdrop());

        expect(owned.onDismiss).toHaveBeenCalledTimes(1);
        expect(other.onDismiss).not.toHaveBeenCalled();
        expect(onBackdropClick).not.toHaveBeenCalled();
    });

    test("a second press after the top layer closes dismisses the next layer, then the dialog", () => {
        const { onBackdropClick, handlers } = setup();
        const backdrop = createBackdrop();
        const lower = registerLayer();
        const top = registerLayer();

        press(handlers, backdrop);
        top.cleanup();
        press(handlers, backdrop);
        expect(lower.onDismiss).toHaveBeenCalledTimes(1);
        expect(onBackdropClick).not.toHaveBeenCalled();

        lower.cleanup();
        press(handlers, backdrop);
        expect(onBackdropClick).toHaveBeenCalledTimes(1);
    });

    test("cleanup on close or unmount removes the layer from the stack", () => {
        const { handlers } = setup();
        const lower = registerLayer();
        const top = registerLayer();

        top.cleanup();
        press(handlers, createBackdrop());

        expect(top.onDismiss).not.toHaveBeenCalled();
        expect(lower.onDismiss).toHaveBeenCalledTimes(1);
    });

    test("reopening after a close registers the layer newest again", () => {
        const { handlers } = setup();
        const backdrop = createBackdrop();
        const lower = registerLayer();
        const top = registerLayer();

        lower.cleanup();
        const reopened = registerLayer("backdrop-owner", lower.onDismiss);
        press(handlers, backdrop);

        expect(reopened.onDismiss).toHaveBeenCalledTimes(1);
        expect(top.onDismiss).not.toHaveBeenCalled();
    });

    test("re-registering an element replaces its stale callback without moving it in the stack", () => {
        const { handlers } = setup();
        const backdrop = createBackdrop();
        const lower = registerLayer();
        const top = registerLayer();
        const onDismiss = vi.fn();
        cleanups.push(registerOpenLayer(lower.element, "backdrop-owner", onDismiss));

        press(handlers, backdrop);
        expect(top.onDismiss).toHaveBeenCalledTimes(1);
        expect(onDismiss).not.toHaveBeenCalled();

        top.cleanup();
        press(handlers, backdrop);
        expect(onDismiss).toHaveBeenCalledTimes(1);
        expect(lower.onDismiss).not.toHaveBeenCalled();
    });
});

describe("getBackdropHandlers", () => {
    test("closes on a click when no layer is open, leaving the press to Radix", () => {
        const { onBackdropClick, handlers } = setup();

        const { pointerDown, click } = press(handlers, createBackdrop());

        expect(onBackdropClick).toHaveBeenCalledTimes(1);
        expect(onBackdropClick).toHaveBeenCalledWith();
        expect(pointerDown.stopPropagation).not.toHaveBeenCalled();
        expect(pointerDown.preventDefault).not.toHaveBeenCalled();
        expect(click.stopPropagation).not.toHaveBeenCalled();
        expect(click.preventDefault).not.toHaveBeenCalled();
    });

    test("prevents and stops a press over an open owned layer, leaving its click only stopped", () => {
        const { onBackdropClick, handlers } = setup();
        const lower = registerLayer();
        const top = registerLayer();

        const { pointerDown, click } = press(handlers, createBackdrop());

        expect(pointerDown.stopPropagation).toHaveBeenCalledTimes(1);
        expect(pointerDown.preventDefault).toHaveBeenCalledTimes(1);
        expect(click.stopPropagation).toHaveBeenCalledTimes(1);
        expect(click.preventDefault).not.toHaveBeenCalled();
        expect(top.onDismiss).toHaveBeenCalledTimes(1);
        expect(lower.onDismiss).not.toHaveBeenCalled();
        expect(onBackdropClick).not.toHaveBeenCalled();
    });

    test("leaves the click of a press that started over an open layer to the layer", () => {
        const { onBackdropClick, handlers } = setup();
        const backdrop = createBackdrop();
        const layer = registerLayer();

        press(handlers, backdrop);
        expect(onBackdropClick).not.toHaveBeenCalled();

        layer.cleanup();
        press(handlers, backdrop);
        expect(onBackdropClick).toHaveBeenCalledTimes(1);
    });

    test("closes when the only open layer is unowned", () => {
        const { onBackdropClick, handlers } = setup();
        const onDismiss = vi.fn();
        cleanups.push(registerOpenLayer({}, undefined, onDismiss));

        const { pointerDown } = press(handlers, createBackdrop());

        expect(onBackdropClick).toHaveBeenCalledTimes(1);
        expect(onDismiss).not.toHaveBeenCalled();
        expect(pointerDown.stopPropagation).not.toHaveBeenCalled();
        expect(pointerDown.preventDefault).not.toHaveBeenCalled();
    });

    test("closes when the only open layer belongs to another backdrop", () => {
        const { onBackdropClick, handlers } = setup();
        const layer = registerLayer("another-backdrop");

        press(handlers, createBackdrop());

        expect(onBackdropClick).toHaveBeenCalledTimes(1);
        expect(layer.onDismiss).not.toHaveBeenCalled();
    });

    test("closes when the backdrop has no owner, whatever is open", () => {
        const { onBackdropClick, handlers } = setup();
        const layer = registerLayer();
        const backdrop = createBackdrop();
        delete backdrop.dataset.backdropOwner;

        press(handlers, backdrop);

        expect(onBackdropClick).toHaveBeenCalledTimes(1);
        expect(layer.onDismiss).not.toHaveBeenCalled();
    });

    test("leaves the click to an owned layer when unrelated layers are also open", () => {
        const { onBackdropClick, handlers } = setup();
        const owned = registerLayer();
        const other = registerLayer("another-backdrop");

        press(handlers, createBackdrop());

        expect(onBackdropClick).not.toHaveBeenCalled();
        expect(owned.onDismiss).toHaveBeenCalledTimes(1);
        expect(other.onDismiss).not.toHaveBeenCalled();
    });

    test("scopes simultaneous open layers to each backdrop's owner", () => {
        const onOuterClick = vi.fn();
        const onInnerClick = vi.fn();
        const outerHandlers = getBackdropHandlers(onOuterClick);
        const innerHandlers = getBackdropHandlers(onInnerClick);
        const innerLayer = registerLayer("inner");

        press(outerHandlers, createBackdrop("outer"));
        press(innerHandlers, createBackdrop("inner"));

        expect(onOuterClick).toHaveBeenCalledTimes(1);
        expect(onInnerClick).not.toHaveBeenCalled();
        expect(innerLayer.onDismiss).toHaveBeenCalledTimes(1);
    });

    test("decides at the press, not at the click", () => {
        const { onBackdropClick, handlers } = setup();
        const backdrop = createBackdrop();
        const layer = registerLayer();

        handlers.onPointerDown(createEvent(backdrop));
        layer.cleanup();
        handlers.onClick(createEvent(backdrop));

        expect(onBackdropClick).not.toHaveBeenCalled();
    });

    test("ignores only the one click that ends the press", () => {
        const { onBackdropClick, handlers } = setup();
        const backdrop = createBackdrop();
        registerLayer();

        press(handlers, backdrop);
        handlers.onClick(createEvent(backdrop));

        expect(onBackdropClick).toHaveBeenCalledTimes(1);
    });

    test("closes on a click with no press before it", () => {
        const { onBackdropClick, handlers } = setup();

        handlers.onClick(createEvent(createBackdrop()));

        expect(onBackdropClick).toHaveBeenCalledTimes(1);
    });

    test("tracks each backdrop's press apart", () => {
        const onOuterClick = vi.fn();
        const onInnerClick = vi.fn();
        const outerHandlers = getBackdropHandlers(onOuterClick);
        const innerHandlers = getBackdropHandlers(onInnerClick);
        const outer = createBackdrop("outer");
        const inner = createBackdrop("inner");
        const outerLayer = registerLayer("outer");

        outerHandlers.onPointerDown(createEvent(outer));
        press(innerHandlers, inner);
        outerHandlers.onClick(createEvent(outer));

        expect(onInnerClick).toHaveBeenCalledTimes(1);
        expect(onOuterClick).not.toHaveBeenCalled();
        expect(outerLayer.onDismiss).toHaveBeenCalledTimes(1);
    });
});
