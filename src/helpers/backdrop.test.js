import { describe, expect, test, vi } from "vitest";
import { getBackdropHandlers } from "./backdrop";

const createBackdrop = (owner = "backdrop-owner") => {
    const backdrop = { isLayerOpen: false, dataset: { backdropOwner: owner }, layers: [] };
    const querySelector = (selector) => {
        if (!backdrop.isLayerOpen) {
            return null;
        }

        const owner = selector.match(/\[data-backdrop-owner=([^\]]+)\]/)?.[1];

        return backdrop.layers.find((layer) => JSON.stringify(layer.dataset.backdropOwner) === owner) ?? null;
    };
    backdrop.ownerDocument = { querySelector };
    backdrop.addLayer = (layerOwner = owner) => {
        const layer = { dataset: { backdropOwner: layerOwner } };
        backdrop.layers.push(layer);

        return layer;
    };
    backdrop.addLayer();

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

    test("closes when the only open layer is unowned", () => {
        const { onBackdropClick, handlers } = setup();
        const backdrop = createBackdrop();
        delete backdrop.layers[0].dataset.backdropOwner;
        backdrop.isLayerOpen = true;

        press(handlers, backdrop);

        expect(onBackdropClick).toHaveBeenCalledTimes(1);
    });

    test("closes when the only open layer belongs to another backdrop", () => {
        const { onBackdropClick, handlers } = setup();
        const backdrop = createBackdrop();
        backdrop.layers[0].dataset.backdropOwner = "another-backdrop";
        backdrop.isLayerOpen = true;

        press(handlers, backdrop);

        expect(onBackdropClick).toHaveBeenCalledTimes(1);
    });

    test("leaves the click to an owned layer when unrelated layers are also open", () => {
        const { onBackdropClick, handlers } = setup();
        const backdrop = createBackdrop();
        backdrop.addLayer("another-backdrop");
        backdrop.isLayerOpen = true;

        press(handlers, backdrop);

        expect(onBackdropClick).not.toHaveBeenCalled();
    });

    test("scopes simultaneous open layers to each backdrop's owner", () => {
        const onOuterClick = vi.fn();
        const onInnerClick = vi.fn();
        const outerHandlers = getBackdropHandlers(onOuterClick);
        const innerHandlers = getBackdropHandlers(onInnerClick);
        const outer = createBackdrop("outer");
        const inner = createBackdrop("inner");
        outer.layers[0].dataset.backdropOwner = "inner";
        outer.isLayerOpen = true;
        inner.isLayerOpen = true;

        press(outerHandlers, outer);
        press(innerHandlers, inner);

        expect(onOuterClick).toHaveBeenCalledTimes(1);
        expect(onInnerClick).not.toHaveBeenCalled();
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
