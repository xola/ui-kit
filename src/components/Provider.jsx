import React, { createContext, useCallback, useMemo, useRef } from "react";

export const Context = createContext({
    generateId: () => {
        throw new Error("Please wrap your app with <Provider /> component from @xola/ui-kit");
    },
});

export const Provider = ({ children }) => {
    const idCounterRef = useRef(1);

    const generateId = useCallback(() => {
        return idCounterRef.current++;
    }, [idCounterRef]);

    const value = useMemo(() => ({ generateId }), [generateId]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
};
