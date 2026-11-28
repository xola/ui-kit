import { useMemoizedFn } from "ahooks";
import { useReducer } from "react";
import type { UseErrorOverlayResult } from "../../dev";
import { errorOverlayReducer, type ErrorOverlayState } from "./errorOverlayState";

const initialState: ErrorOverlayState = { errors: [], activeIndex: 0 };

/** Overlay state for the app to drive. `isOpen` is `errors.length > 0`, derived by the caller. */
export const useErrorOverlay = (): UseErrorOverlayResult => {
    const [{ errors, activeIndex }, dispatch] = useReducer(errorOverlayReducer, initialState);

    const clear = useMemoizedFn(() => dispatch({ type: "clear" }));
    const dismiss = useMemoizedFn((index: number) => dispatch({ type: "dismiss", index }));
    const setActiveIndex = useMemoizedFn((index: number) => dispatch({ type: "setActive", index }));
    const push: UseErrorOverlayResult["push"] = useMemoizedFn((error, extras) => {
        dispatch({ type: "push", error, extras });
    });

    return { errors, activeIndex, push, dismiss, clear, setActiveIndex };
};
