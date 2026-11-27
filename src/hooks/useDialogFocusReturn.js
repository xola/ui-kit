import { useMemoizedFn } from "ahooks";
import { useRef } from "react";

/**
 * Radix returns focus to Dialog.Trigger, but ui-kit dialogs have none. Record the focused element before Radix moves
 * focus into the dialog, then restore it after close when that element is still connected.
 */
export const useDialogFocusReturn = (isOpen) => {
    const returnFocusRef = useRef();

    const onOpenAutoFocus = useMemoizedFn(() => {
        const { activeElement } = document;
        returnFocusRef.current = activeElement instanceof HTMLElement ? activeElement : undefined;
    });

    const onCloseAutoFocus = useMemoizedFn((event) => {
        const element = returnFocusRef.current;
        returnFocusRef.current = undefined;

        if (!isOpen && element?.isConnected) {
            event.preventDefault();
            element.focus();
        }
    });

    return { onOpenAutoFocus, onCloseAutoFocus };
};
