import React, { createContext, useCallback, useMemo, useRef } from "react";

// Fallback ID counter when not using `Provider`
let fallbackIdCounter = 1;

export interface ContextValue {
    generateId: () => number;
    localize: boolean;
    locale: string;
}

export const Context = createContext<ContextValue>({
    generateId: () => {
        console.warn(
            "Please wrap your app with `<Provider />` component from `@xola/ui-kit`. Otherwise your app will not work with SSR frameworks.",
        );

        return fallbackIdCounter++;
    },

    localize: true,

    locale: "en_US",
});

export interface ProviderProps {
    children: React.ReactNode;
    readonly localize?: boolean;
    readonly locale?: string;
}

/**
 * UI Kit's default provider.
 * Must be used from now on in order to generate correct component IDs.
 * Also a good place to implement any global state required for the UI Kit in the future.
 */
export const Provider = ({ children, localize = true, locale = "en_US" }: ProviderProps) => {
    const idCounterRef = useRef(1);

    const generateId = useCallback(() => {
        return idCounterRef.current++;
    }, [idCounterRef]);

    const value = useMemo(() => ({ generateId, localize, locale }), [generateId, localize, locale]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
};
