import { createContext } from "react";

/**
 * Value: `{ error, frames, errors, index, setIndex, onOpenInEditor }`. Shared by the root and every compound part.
 */
export const ErrorOverlayContext = createContext(undefined);
