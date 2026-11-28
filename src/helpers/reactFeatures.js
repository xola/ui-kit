import * as ReactDOM from "react-dom";

/**
 * React 19-only APIs live here, detected by feature (never React.version) once at module load so
 * hook call order stays fixed. Namespace import on purpose: a named import of a missing export
 * makes consumer bundlers warn on React 18.
 */
export const hasFormStatus = typeof ReactDOM.useFormStatus === "function";

const useNoFormStatus = () => ({ pending: false });

export const useFormStatusSafe = hasFormStatus ? ReactDOM.useFormStatus : useNoFormStatus;
