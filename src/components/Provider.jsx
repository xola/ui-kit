import { TooltipProvider } from "@radix-ui/react-tooltip";
import React, { createContext, useCallback, useMemo, useRef } from "react";

// Fallback ID counter when not using `Provider`
let fallbackIdCounter = 1;

export const Context = createContext({
    generateId: () => {
        console.warn(
            "Please wrap your app with `<Provider />` component from `@xola/ui-kit`. Otherwise your app will not work with SSR frameworks.",
        );

        return fallbackIdCounter++;
    },

    localize: true,

    locale: "en_US",
});

/**
 * UI Kit's default provider.
 * Must be used from now on in order to generate correct component IDs.
 * Also a good place to implement any global state required for the UI Kit in the future.
 * Holds the one Radix `TooltipProvider` all tooltips share; `hasTooltipProvider` tells `Tooltip` not to add its own.
 */
export const Provider = ({ children, localize = true, locale = "en_US" }) => {
    const idCounterRef = useRef(1);

    const generateId = useCallback(() => {
        return idCounterRef.current++;
    }, [idCounterRef]);

    const value = useMemo(
        () => ({ generateId, localize, locale, hasTooltipProvider: true }),
        [generateId, localize, locale],
    );

    return (
        <Context.Provider value={value}>
            <TooltipProvider>{children}</TooltipProvider>
        </Context.Provider>
    );
};
