import React, { createContext, useCallback, useMemo, useRef } from "react";

export const Context = createContext({
    generateId: () => {
        throw new Error("Please wrap your app with <Provider /> component from @xola/ui-kit");
    },
});

/**
 * UI Kit's default provider.
 * Must be used from now on in order to generate correct component IDs.
 * Also a good place to implement any global state required for the UI Kit in the future.
 */
export const Provider = ({ children }) => {
    const idCounterRef = useRef(1);

    const generateId = useCallback(() => {
        return idCounterRef.current++;
    }, [idCounterRef]);

    const value = useMemo(() => ({ generateId }), [generateId]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
};
