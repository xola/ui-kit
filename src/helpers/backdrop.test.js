import { describe, expect, test, vi } from "vitest";
import { getBackdropHandlers } from "./backdrop";

/** A backdrop whose document reports an open Popover or Tooltip while `isLayerOpen` is true. */
const createBackdrop = () => {
    const backdrop = { isLayerOpen: false };
    const querySelector = () => (backdrop.isLayerOpen ? {} : null);
    backdrop.ownerDocument = { querySelector };

    return backdrop;
};

const press = (handlers, backdrop) => {
    handlers.onPointerDown({ currentTarget: backdrop });
    handlers.onClick({ currentTarget: backdrop });
};

const setup = () => {
    const onBackdropClick = vi.fn();

    return { onBackdropClick, handlers: getBackdropHandlers(onBackdropClick) };
};

describe("getBackdropHandlers", () => {
    test("closes on a click when no layer is open", () => {
        const { onBackdropClick, handlers } = setup();

        press(handlers, createBackdrop());

        expect(onBackdropClick).toHaveBeenCalledTimes(1);
        expect(onBackdropClick).toHaveBeenCalledWith();
    });

    test("leaves the click of a press that started over an open layer to the layer", () => {
        const { onBackdropClick, handlers } = setup();
        const backdrop = createBackdrop();

        backdrop.isLayerOpen = true;
        press(handlers, backdrop);
        expect(onBackdropClick).not.toHaveBeenCalled();

        backdrop.isLayerOpen = false;
        press(handlers, backdrop);
        expect(onBackdropClick).toHaveBeenCalledTimes(1);
    });

    test("decides at the press, not at the click", () => {
        const { onBackdropClick, handlers } = setup();
        const backdrop = createBackdrop();

        backdrop.isLayerOpen = true;
        handlers.onPointerDown({ currentTarget: backdrop });
        backdrop.isLayerOpen = false;
        handlers.onClick({ currentTarget: backdrop });

        expect(onBackdropClick).not.toHaveBeenCalled();
    });

    test("ignores only the one click that ends the press", () => {
        const { onBackdropClick, handlers } = setup();
        const backdrop = createBackdrop();

        backdrop.isLayerOpen = true;
        press(handlers, backdrop);
        handlers.onClick({ currentTarget: backdrop });

        expect(onBackdropClick).toHaveBeenCalledTimes(1);
    });

    test("closes on a click with no press before it", () => {
        const { onBackdropClick, handlers } = setup();

        handlers.onClick({ currentTarget: createBackdrop() });

        expect(onBackdropClick).toHaveBeenCalledTimes(1);
    });

    test("tracks each backdrop's press apart", () => {
        const onOuterClick = vi.fn();
        const onInnerClick = vi.fn();
        const outerHandlers = getBackdropHandlers(onOuterClick);
        const innerHandlers = getBackdropHandlers(onInnerClick);
        const outer = createBackdrop();
        const inner = createBackdrop();

        outer.isLayerOpen = true;
        outerHandlers.onPointerDown({ currentTarget: outer });
        press(innerHandlers, inner);
        outerHandlers.onClick({ currentTarget: outer });

        expect(onInnerClick).toHaveBeenCalledTimes(1);
        expect(onOuterClick).not.toHaveBeenCalled();
    });
});
