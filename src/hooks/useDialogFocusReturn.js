import { useMemoizedFn, useUnmount } from "ahooks";
import { useRef } from "react";

/**
 * Radix returns focus to Dialog.Trigger, but ui-kit dialogs have none. Record the focused element before Radix moves
 * focus into the dialog, then restore it after close or unmount when that element is still connected.
 */
export const useDialogFocusReturn = () => {
    const returnFocusRef = useRef();

    const onOpenAutoFocus = useMemoizedFn(() => {
        const { activeElement } = document;
        returnFocusRef.current = activeElement instanceof HTMLElement ? activeElement : undefined;
    });

    const restoreFocus = useMemoizedFn(() => {
        const element = returnFocusRef.current;
        returnFocusRef.current = undefined;

        if (!element?.isConnected) {
            return false;
        }

        element.focus();
        return true;
    });

    const onCloseAutoFocus = useMemoizedFn((event) => {
        if (returnFocusRef.current?.isConnected) {
            event.preventDefault();
        }

        restoreFocus();
    });

    useUnmount(restoreFocus);

    return { onOpenAutoFocus, onCloseAutoFocus };
};
