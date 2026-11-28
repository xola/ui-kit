import { useMemoizedFn } from "ahooks";
import { useReducer } from "react";
import { errorOverlayReducer } from "./errorOverlayState";

const initialState = { errors: [], activeIndex: 0 };

/**
 * Overlay state for the app to drive. `isOpen` is `errors.length > 0`, derived by the caller.
 * @returns {{ errors: Array, activeIndex: number, push: Function, dismiss: Function, clear: Function, setActiveIndex: Function }}
 */
export const useErrorOverlay = () => {
    const [{ errors, activeIndex }, dispatch] = useReducer(errorOverlayReducer, initialState);

    const push = useMemoizedFn((error, extras) => dispatch({ type: "push", error, extras }));
    const dismiss = useMemoizedFn((index) => dispatch({ type: "dismiss", index }));
    const clear = useMemoizedFn(() => dispatch({ type: "clear" }));
    const setActiveIndex = useMemoizedFn((index) => dispatch({ type: "setActive", index }));

    return { errors, activeIndex, push, dismiss, clear, setActiveIndex };
};
